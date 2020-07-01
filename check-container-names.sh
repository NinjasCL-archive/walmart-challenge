#!/bin/bash
# This script ensures that containers are not already running

# https://www.freebsd.org/cgi/man.cgi?query=sysexits&apropos=0&sektion=0&manpath=FreeBSD+4.3-RELEASE&format=html
# EX_CANTCREAT (73) A (user specified) output file cannot be created.
EX_CANTCREAT=73
EXIT_ON_CONTAINER_EXISTS=0

# From https://stackoverflow.com/questions/38576337/how-to-execute-a-bash-command-only-if-a-docker-container-with-a-given-name-does

MONGO=$(docker ps -a --format '{{.Names}}' | grep mongodb-local | wc -l | xargs)
if (($MONGO > 0)); then
    echo 'WARNING: mongodb-local container exists.'
fi

TESTER=$(docker ps -a --format '{{.Names}}' | grep walmart-tester-local | wc -l | xargs)

if (($TESTER > 0)); then
    echo 'WARNING: walmart-tester-local container exists.'
fi

FRONTEND=$(docker ps -a --format '{{.Names}}' | grep walmart-frontend-local | wc -l | xargs)

if (($FRONTEND > 0)); then
    echo 'WARNING: walmart-frontend-local container exists.'
fi

BACKEND=$(docker ps -a --format '{{.Names}}' | grep walmart-backend-local | wc -l | xargs)

if (($BACKEND > 0)); then
    echo 'WARNING: walmart-backend-local container exists.'
fi

CHECK=($MONGO + $TESTER + $FRONTEND + $BACKEND)

if (($CHECK > 0)); then
    echo 'WARNING: Is recommended to stop containers and prune them before building.'
    echo 'WARNING: $ docker kill <container id>'
    echo 'WARNING: $ docker container prune'

    if (($EXIT_ON_CONTAINER_EXISTS > 0)); then
        exit $EX_CANTCREAT
    fi
fi