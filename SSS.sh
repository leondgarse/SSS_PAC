#!/bin/bash

INPUT_FILE=$(dirname $0)"/SSS.tsv"
UPDATE_PROXY_FILE=false
BIND_ADDR="0.0.0.0"
LOCAL_PORT=8080
# "https://free-ss.site / https://lightyearvpn.com/free-vpn / https://sspool.nl/clash/proxies"
SHADOW_PROXY_SERVER="sspool"

function usage {
	SUPPORTED_URL=$(echo `$(dirname $0)/get_shadow_sockets.py -h | grep "url" -A1` | awk -F 'server: ' '{print $2}' | awk -F ' \\(' '{print $1}')
	# SUPPORTED_URL_LIST=( ${SUPPORTED_URL//,/} )

    printf "
Usage: $0 [-h] [-b BIND_ADDR] [-p PORT] [-s input_file] [-S url] [-u]

    -h, Print this help.
    -b BIND_ADDR, Local bind server address, default: $BIND_ADDR.
    -p PORT, Local bind port, default: $LOCAL_PORT.
    -s INPUT_FILE, Local file used for detecying, default: $INPUT_FILE.
    -u URL, Shadow sockets server url, [$SUPPORTED_URL], default: $SHADOW_PROXY_SERVER.
    -U, Update local saved file from server, default: $UPDATE_PROXY_FILE.
"
    exit 0
}

function run_test {
	if [ ! -e $INPUT_FILE ]; then
		UPDATE_PROXY_FILE=true
	fi

	if [ $UPDATE_PROXY_FILE = true ]; then
		echo "Update proxy file From: $SHADOW_PROXY_SERVER, To: $INPUT_FILE"
		# $(dirname $0)/get_shadow_sockets.py -u $SHADOW_PROXY_SERVER > $INPUT_FILE
		# $(dirname $0)/get_shadow_sockets.py -o $INPUT_FILE -H 50 -u $SHADOW_PROXY_SERVER
		$(dirname $0)/get_shadow_sockets.py -o $INPUT_FILE -u $SHADOW_PROXY_SERVER
		if [[ $? != 0 ]]; then exit $?; fi
	fi

	# Check if sslocal is running
	ps aux | grep -v grep | grep sslocal > /dev/null
	if [ $? -eq 0 ]; then
		# Check if sslocal is running by current user, or use sudo to stop it
		ps -f -u $(whoami) | grep -v grep | grep sslocal > /dev/null
		if [ $? -eq 0 ]; then
			pkill -KILL -f sslocal
		else
			sudo pkill -KILL -f sslocal
		fi
	fi
	PID_FILE=/$HOME/shadowsocks.pid
	LOG_FILE=/$HOME/shadowsocks.log

	echo ">>>> Header info:"
	HEAD=( $(head -n 1 $INPUT_FILE) )
	# echo "${HEAD[@]}"
	typeset -l LOWERCASE_HEAD
	for (( i=0; $i<${#HEAD[@]}; i=$i+1 )); do
		LOWERCASE_HEAD=${HEAD[$i]}
		AWK_INDEX=$(( i + 1 ))
		echo "$AWK_INDEX: $LOWERCASE_HEAD"
		
		case "$LOWERCASE_HEAD" in
			"ip")
				IP_INDEX=$AWK_INDEX;;
			"address")
				IP_INDEX=$AWK_INDEX;;
			"server")
				IP_INDEX=$AWK_INDEX;;
			"port")
				PORT_INDEX=$AWK_INDEX;;
			"password")
				PASSWORD_INDEX=$AWK_INDEX;;
			"method")
				METHOD_INDEX=$AWK_INDEX;;
			"cipher")
				METHOD_INDEX=$AWK_INDEX;;
		esac
	done
	echo "IP_INDEX=$IP_INDEX, PORT_INDEX=$PORT_INDEX, PASSWORD_INDEX=$PASSWORD_INDEX, METHOD_INDEX=$METHOD_INDEX"
	echo ""

	echo ">>>> Start test..."
	IFS_BAK="$IFS"
	IFS=$'\n'
	lines=( $(awk -F '\t' 'NR > 1 {if (NF>3 && $1 !~/^#/) print $'$IP_INDEX'"\n"$'$PORT_INDEX'"\n"$'$PASSWORD_INDEX'"\n"$'$METHOD_INDEX'}' $INPUT_FILE) )
	IFS="$IFS_BAK"

	RESULT=1
	for (( i=0 ; $i<${#lines[@]} ; i=$i+4 )); do
		address=${lines[$i+0]}
		port=${lines[$i+1]}
		password=${lines[$i+2]}
		method=${lines[$i+3]}

		echo "$(( $i / 4 + 1 )): address=$address; port=$port; password=$password; method=$method; local_port=$LOCAL_PORT"
		sslocal -d start --pid-file $PID_FILE --log-file $LOG_FILE -s $address -p $port -m $method -k "$password" -l $LOCAL_PORT -b $BIND_ADDR -t 600

		if [[ $? = 0 ]]; then
			sleep 1
			# proxychains curl --connect-timeout 1 "www.google.com"
			# echo -e "GET http://google.com HTTP/1.0\n\n" | proxychains nc -w 2 -vz google.com 80
			timeout 2s bash -c "proxychains nc -vz google.com 80"
			RESULT=$?

			if [ $RESULT == 0 ]; then
				echo ""
				ps aux | grep sslocal | grep -v grep
				echo ""
				echo "WORKING ONE!!!"
				break
			fi

			echo $RESULT
			sslocal -d stop --pid-file $PID_FILE -s $address

			sed --follow-symlinks -i '1,/^[^#]/s/^[^#].*/# &/' $INPUT_FILE  # Add `#` to current tested line if failed
			sed --follow-symlinks -i '1s/^# \(.*\)/\1/' $INPUT_FILE	# Remove the `#` added on the head line...

			# pkill -KILL -f sslocal
		fi
		sleep 1
		echo '>>>>'
		echo ""
	done

	if [[ $RESULT == 0 && -n "$(which privoxy)" ]]; then
		service privoxy status > /dev/null
		if [ $? -ne 0 ]; then
			sudo service privoxy restart
		fi
	fi

	rm -f $PID_FILE $LOG_FILE
}

while getopts b:s:u:Uh option; do
    case "$option" in
        b)
            BIND_ADDR=$OPTARG;;
        p)
            LOCAL_PORT=$OPTARG;;
        s)
            INPUT_FILE=$OPTARG;;
        u)
            SHADOW_PROXY_SERVER=$OPTARG;;
        U)
            UPDATE_PROXY_FILE=true;;
        h)
            usage;;
    esac
done

echo "BIND_ADDR = $BIND_ADDR, Server = $SHADOW_PROXY_SERVER, Input file = $INPUT_FILE, Update = $UPDATE_PROXY_FILE"

run_test

if [ $RESULT -ne 0 ]; then
    echo "None works, refresh $INPUT_FILE from $SHADOW_PROXY_SERVER"
	UPDATE_PROXY_FILE=true
	run_test
fi
