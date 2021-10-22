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

testStatus cd $BASEDIR
testStatus cd components
for dir in *
do
  testStatus cd $dir
  testStatus npm ci
  testStatus npm run build
  testStatus npm run test
  testStatus cd ..
done

