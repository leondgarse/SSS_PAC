#!/bin/bash

INPUT_FILE=$(dirname $0)"/SSS.tsv"
UPDATE_PROXY_FILE=false
SHADOW_PROXY_SERVER="https://free-ss.site"
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
    $(dirname $0)/get_shadow_sockets.py -u $SHADOW_PROXY_SERVER > $INPUT_FILE
fi

echo ">>>> Start test..."
sudo pkill -KILL -f sslocal
PID_FILE=/$HOME/shadowsocks.pid
LOG_FILE=/$HOME/shadowsocks.log

IFS_BAK="$IFS"
IFS=$'\n'
if [[ $(awk -F '\t' 'NR==1 {print $4}' $INPUT_FILE) = "Password" ]]; then
    echo "password first."
    lines=( $(awk -F '\t' 'NR > 1 {if (NF>4 && $1 ~/^[0-9]/) print $2"\n"$3"\n"$4"\n"$5}' $INPUT_FILE) )
else
    echo "method first."
    lines=( $(awk -F '\t' 'NR > 1 {if (NF>4 && $1 ~/^[0-9]/) print $2"\n"$3"\n"$5"\n"$4}' $INPUT_FILE) )
fi
IFS="$IFS_BAK"

for (( i=0 ; $i<${#lines[@]} ; i=$i+4 )); do
    address=${lines[$i+0]}
    port=${lines[$i+1]}
    password=${lines[$i+2]}
    method=${lines[$i+3]}

    echo "address=$address; port=$port; password=$password; method=$method; local_port=$LOCAL_PORT"
    sslocal -d start --pid-file $PID_FILE --log-file $LOG_FILE -s $address -p $port -m $method -k "$password" -l $LOCAL_PORT -b $BIND_ADDR -t 600

    if [[ $? = 0 ]]; then
        sleep 1
        # proxychains curl --connect-timeout 1 "www.google.com"
        # echo -e "GET http://google.com HTTP/1.0\n\n" | proxychains nc -w 2 -vz google.com 80
        proxychains nc -w 2 -vz google.com 80
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
        # pkill -KILL -f sslocal
    fi
    sleep 1
    echo '>>>>'
    echo ""
done

rm $PID_FILE $LOG_FILE

if [ $RESULT -ne 0 ]; then
    echo "None works, refresh $INPUT_FILE from $SHADOW_PROXY_SERVER by $0 -u"
fi
