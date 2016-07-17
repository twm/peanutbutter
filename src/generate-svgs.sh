#!/bin/bash

scour_it() {
    scour --no-line-breaks \
        --remove-metadata \
       --set-precision=5 \
       --strip-xml-prolog \
       --create-groups \
       --enable-id-stripping \
       --shorten-ids \
        -i "$1" \
        -o "$2"
}

set -ex

for f in *.inkscape.svg
do
    target="${f/\.inkscape/}"
    if [[ $f -nt $target ]]
    then
        scour_it "$f" "$target"
    fi
done
