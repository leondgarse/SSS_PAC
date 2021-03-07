#!/bin/bash

INPUT_FILE=$(dirname $0)"/SSS.tsv"
UPDATE_PROXY_FILE=false
# "https://free-ss.site / https://free-ss.best / https://lightyearvpn.com/free-vpn"
SHADOW_PROXY_SERVER="https://lightyearvpn.com/free-vpn"
BIND_ADDR="0.0.0.0"
LOCAL_PORT=8080

function usage {
    printf "
Usage: $0 [-h] [-b BIND_ADDR] [-p PORT] [-s input_file] [-S url] [-u]

    -h, Print this help.
    -b BIND_ADDR, Local bind server address, default: $BIND_ADDR.
    -p PORT, Local bind port, default: $LOCAL_PORT.
    -s INPUT_FILE, Local file used for detecying, default: $INPUT_FILE.
    -S URL, Shadow sockets server url, default: $SHADOW_PROXY_SERVER.
    -u, Update local saved file from server, default: $UPDATE_PROXY_FILE.
"
    exit 0
}

while getopts b:s:S:uh option; do
    case "$option" in
        b)
            BIND_ADDR=$OPTARG;;
        p)
            LOCAL_PORT=$OPTARG;;
        s)
            INPUT_FILE=$OPTARG;;
        S)
            SHADOW_PROXY_SERVER=$OPTARG;;
        u)
            UPDATE_PROXY_FILE=true;;
        h)
            usage;;
    esac
done

echo "BIND_ADDR = $BIND_ADDR, Server = $SHADOW_PROXY_SERVER, Input file = $INPUT_FILE, Update = $UPDATE_PROXY_FILE"

if [ ! -e $INPUT_FILE ]; then
    UPDATE_PROXY_FILE=true
fi

if [ $UPDATE_PROXY_FILE = true ]; then
    echo "Update proxy file From: $SHADOW_PROXY_SERVER, To: $INPUT_FILE"
    # $(dirname $0)/get_shadow_sockets.py -u $SHADOW_PROXY_SERVER > $INPUT_FILE
    $(dirname $0)/get_shadow_sockets.py -o $INPUT_FILE
    if [[ $? != 0 ]]; then exit $?; fi
fi

sudo pkill -KILL -f sslocal
PID_FILE=/$HOME/shadowsocks.pid
LOG_FILE=/$HOME/shadowsocks.log

echo ">>>> Header info:"
HEAD=( $(head -n 1 $INPUT_FILE) )
typeset -l LOWERCASE_HEAD
for (( i=0; $i<${#HEAD[@]}; i=$i+1 )); do
	LOWERCASE_HEAD=${HEAD[$i]}
	echo "$i, ${HEAD[$i]}, $LOWERCASE_HEAD"
	
	case "$LOWERCASE_HEAD" in
		"ip")
			IP_INDEX=$(( i + 1 ));;
		"address")
			IP_INDEX=$(( i + 1 ));;
		"port")
			PORT_INDEX=$(( i + 1 ));;
		"password")
			PASSWORD_INDEX=$(( i + 1 ));;
		"method")
			METHOD_INDEX=$(( i + 1 ));;
	esac
done
echo "IP_INDEX=$IP_INDEX, PORT_INDEX=$PORT_INDEX, PASSWORD_INDEX=$PASSWORD_INDEX, METHOD_INDEX=$METHOD_INDEX"
echo ""

echo ">>>> Start test..."
IFS_BAK="$IFS"
IFS=$'\n'
lines=( $(awk -F '\t' 'NR > 1 {if (NF>3 && $1 !~/^#/) print $'$IP_INDEX'"\n"$'$PORT_INDEX'"\n"$'$PASSWORD_INDEX'"\n"$'$METHOD_INDEX'}' $INPUT_FILE) )
IFS="$IFS_BAK"

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

		sed --follow-symlinks -i '1,/^[^#]/s/^[^#].*/# &/' $INPUT_FILE  # Add `#` to current tested line no matter of the result
		sed --follow-symlinks -i '1s/^# \(.*\)/\1/' $INPUT_FILE	# Remove the `#` added on the head line...

        if [ $RESULT == 0 ]; then
            echo ""
            ps aux | grep sslocal | grep -v grep
            echo ""
            echo "WORKING ONE!!!"
            break
        fi

        echo $RESULT
        sslocal -d stop --pid-file $PID_FILE -s $address

        # pkill -KILL -f sslocal
    fi
    sleep 1
    echo '>>>>'
    echo ""
done

if [[ $RESULT == 0 && -n "$(which privoxy)" ]]; then
	sudo service privoxy restart
fi

rm -f $PID_FILE $LOG_FILE

if [ $RESULT -ne 0 ]; then
    echo "None works, refresh $INPUT_FILE from $SHADOW_PROXY_SERVER by $0 -u"
fi
