#!/bin/sh

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

scour_it header.inkscape.svg header.svg
