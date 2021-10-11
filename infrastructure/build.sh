#!/usr/bin/env bash

# Build and test all components
SCRIPTDIR=$(cd $(dirname $0) && pwd)
BASEDIR=$SCRIPTDIR/..

cd $BASEDIR
cd components
for dir in *
do
  cd $dir
  pwd
  npm run build
  npm run test
  cd ..
done
