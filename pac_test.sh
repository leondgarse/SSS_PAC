#!/bin/bash

PAC_FILE="blacklist.pac"
REFINE_PAC_FILE=""
RESULT_CSV=""
TIME_OUT=2
PROXYCHAINS_VERIFY=false

function usage {
    printf "
Usage: $0 [-h] [-s PAC_FILE] [-d REFINE_PAC_FILE] [-r RESULT_CSV] [-t TIME_OUT]

    -h, Print this help.
    -s PAC_FILE, Source pac file name, default: $PAC_FILE.
    -d REFINE_PAC_FILE, Refined pac file name, default: refine_\${PAC_FILE}.
    -r RESULT_CSV, Result csv file name, default: \${PAC_FILE}.csv.
    -t TIME_OUT, Time out value for testing, default: $TIME_OUT.
    -X, Verify domain name using proxychains, default: $PROXYCHAINS_VERIFY.
"
    exit 0
}

while getopts s:d:r:t:Xh option; do
    case "$option" in
        s)
            PAC_FILE=$OPTARG;;
        d)
            REFINE_PAC_FILE=$OPTARG;;
        r)
            RESULT_CSV=$OPTARG;;
        t)
            TIME_OUT=$OPTARG;;
		X)
			PROXYCHAINS_VERIFY=true;;
        h)
            usage;;
    esac
done

if [[ -z $REFINE_PAC_FILE ]]; then
	REFINE_PAC_FILE="refine_${PAC_FILE}"
fi
if [[ -z $RESULT_CSV ]]; then
	RESULT_CSV="${PAC_FILE}.csv"
fi
DOMAIN_TEMP="${PAC_FILE}.temp"
echo "REFINE_PAC_FILE=$REFINE_PAC_FILE, RESULT_CSV=$RESULT_CSV, DOMAIN_TEMP=$DOMAIN_TEMP"

DOMAIN_HEAD=$(( $(grep -nm 1 'var domains = {' $PAC_FILE | cut -d':' -f1) + 1 ))
DOMAIN_END=$(( $(sed -n "$(($DOMAIN_HEAD)),\$p" $PAC_FILE | grep -nm1 "};" | cut -d':' -f1) + $DOMAIN_HEAD - 2 ))
echo "DOMAIN_HEAD=$DOMAIN_HEAD, DOMAIN_END=$DOMAIN_END"
sed -n "${DOMAIN_HEAD},${DOMAIN_END}p" $PAC_FILE | sort > $DOMAIN_TEMP
# sed -n "${DOMAIN_HEAD},${DOMAIN_END}p" $PAC_FILE | head > $DOMAIN_TEMP

echo "domain_name, normal_result, proxy_result"> $RESULT_CSV
head -n $(( $DOMAIN_HEAD - 1 )) $PAC_FILE > $REFINE_PAC_FILE

while read line; do
	DOMAIN_1=$(echo $line | cut -d':' -f1)
	DOMAIN=${DOMAIN_1:1:-1}
	echo ">>>> Testing: $DOMAIN"
	nc -w $TIME_OUT -vz $DOMAIN 80
	NORMAL_RESULT=$?

	if [[ $NORMAL_RESULT -ne 0 && $PROXYCHAINS_VERIFY = true ]]; then
		proxychains nc -w $TIME_OUT -vz $DOMAIN 80
		PROXY_RESULT=$?
	else
		PROXY_RESULT=0
	fi

	echo "$DOMAIN, $NORMAL_RESULT, $PROXY_RESULT" >> $RESULT_CSV
	if [[ $NORMAL_RESULT -ne 0 && $PROXY_RESULT -eq 0 ]]; then
		echo "  \"$DOMAIN\": 1," >> $REFINE_PAC_FILE
	fi
done < $DOMAIN_TEMP

sed -n "$(( $DOMAIN_END + 1 )),\$p" $PAC_FILE >> $REFINE_PAC_FILE
rm $DOMAIN_TEMP
