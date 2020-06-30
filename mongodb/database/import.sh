#!/bin/bash
HOST=$1
PROJECT_DIRECTORY=$2
FILES=$(ls ${PROJECT_DIRECTORY}/database/*.json | sort -n -t _ -k 2)

while : ; do
    CHECK=$(mongo --host ${HOST} --username productListUser --password productListPassword --authenticationDatabase admin promotions --eval 'db.version() 2> /dev/null')
    if [[ $CHECK == *"MongoDB server version"* ]]
    then
        break
    fi
    echo "[$(date)] Checking connection to database... 😴"
    sleep 1
done

echo "[$(date)] Connected! 🤙"

for AFILE in ${FILES[@]}
do
    echo -e "[$(date)] Processing \t$AFILE"
    COLLECTION=`echo $AFILE | sed -n 's/.*\-\(.*\).json/\1/p'`
    mongoimport --host ${HOST} --username productListUser --password productListPassword --authenticationDatabase admin --db promotions --collection ${COLLECTION} --mode upsert --file ${AFILE}
    echo -e "[$(date)] Done \t\t$AFILE"
done

echo "[$(date)] No more files to process 🍻"
