#!/bin/bash
#
# Copyright (c) 2021. Christian Grach <christian.grach@cmgapps.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -e

usage() {
    echo "Usage: $0 [-c] <OLD_VERSION> <NEW_VERSION> " 1>&2
}

commit=false

while getopts ":c" flag; do
case "$flag" in
    c) commit=true;;
    *)
      echo "Unknown flag: -${flag}"
      usage
      exit 1
      ;;
esac
done

if [ $(( $#-OPTIND )) -lt 1 ]; then
    usage
    exit 1
fi

old_version=${*:$OPTIND:1}
new_version=${*:$OPTIND+1:1}

update_version() {
    echo "Updating version from '$old_version' to '$new_version' in $1"
    sed -i.bak s/"$old_version"/"$new_version"/g "$1"
    rm "$1".bak
}

files=("package.json" ".github/workflows/create-release.yml" "README.md")

for file in "${files[@]}"; do
  update_version "$file"
done

git add "${files[@]}"
if [ $commit = true ]; then
  git commit -m "bump version number"
fi
