#!/bin/sh

mkdir -p out
rm -rf out/*
mkdir -p out/res
cp -r src/res/* out/res/
cp -r res/* out/res/
find src \( -name '.git' -o -name 'out' -o -name 'res' -o -name 'dot' \) -prune -o -type d -exec mkdir -p out/{} \;
build="pandoc -f markdown -t html -s --mathjax=https://cdn.alexneville.co.uk/mathjax/tex-svg.js --data-dir="./" --template=pandoc-format --lua-filter=md-to-html-links.lua --filter=pandoc-crossref --metadata-file=./metadata.yaml --no-highlight -o"
find src -mindepth 2 -type f -name '*.md' -exec $build out/{} {} \;
for f in $(find out -iname '*.md' -type f -print); do mv "$f" ${f%.md}.html; done
mv out/src/* out/
rm -rf out/src
