#!/usr/bin/env bash

# Build and test all components
SCRIPTDIR=$(cd $(dirname $0) && pwd)
BASEDIR=$SCRIPTDIR/..

testStatus() {
    "$@"
    if (( $? != 0 )); then
        exit 1
    fi
    return $status
}

buildAndTest() {
    testStatus cd $1
    testStatus npm ci
    testStatus npm run build
    testStatus npm run test
    testStatus cd ..
}

testStatus cd $BASEDIR
testStatus cd components
buildAndTest "uid-common"
for dir in *
do
    if [ "$dir" != "uid-common" ]; then
        buildAndTest $dir
    fi
done

