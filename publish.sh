#!/usr/bin/env bash
# https://github.com/vuejs/vue/blob/dev/build/release.sh
set -e
echo "Enter commit message: "
read msg

read -p "Are you sure to commit (y/n)" -n 1 -r


if [[ $REPLY =~ ^[Yy]$ ]] 
then
  # commit master
  git add -A
  git commit -m "$msg"
  git push
  echo "master sync succeeded..."
else
  echo
  echo "Operation is abandoned"

fi