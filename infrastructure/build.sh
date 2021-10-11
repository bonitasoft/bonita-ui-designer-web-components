#!/usr/bin/env bash

# Build and test all components
cd components
for dir in *
do
  cd $dir
  pwd
  npm run build
  npm run test
  cd ..
done
