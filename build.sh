#!/bin/sh

mkdir -p out
rm -rf out/*
mkdir -p out/res
cp -r src/res/* out/res/
cp -r res/* out/res/
find src \( -name '.git' -o -name 'out' -o -name 'res' -o -name 'dot' \) -prune -o -type d -exec mkdir -p out/{} \;

build="pandoc -f markdown -t html -s --mathjax=https://cdn.alexneville.co.uk/mathjax/tex-svg.js --data-dir=\"./\" --template=templates/blog-post --lua-filter=md-to-html-links.lua --filter=pandoc-crossref --metadata-file=./metadata.yaml --no-highlight -o"
buildiframe="pandoc -f markdown -t html -s --data-dir=\"./\" --template=templates/contents-iframe --lua-filter=md-to-html-links.lua --filter=pandoc-crossref --metadata-file=./metadata.yaml --no-highlight -o"
buildindexsection="pandoc -f markdown -t html -s --data-dir=\"./\" --template=templates/index-section --lua-filter=md-to-html-links.lua --filter=pandoc-crossref --metadata-file=./metadata.yaml --no-highlight"
buildindex="pandoc -f html -t html -s --data-dir=\"./\" --template=templates/index-page --lua-filter=md-to-html-links.lua --filter=pandoc-crossref --metadata-file=./metadata.yaml --no-highlight -o"

find src -mindepth 2 -type f -name '*.md' -exec $build out/{} {} \;
find src -mindepth 2 -type f -name '_contents.md' -exec $buildiframe out/{} {} \;
for f in $(find out -iname '*.md' -type f -print); do mv "$f" ${f%.md}.html; done

find out -mindepth 2 -type f -name 'index.html' -print | xargs -n 1 cp ./redirect.html
echo "<div id=\"pages\">" > out/_index.html
find src -type f -name '_contents.md' | xargs -n1 $buildindexsection >> out/_index.html
echo "</div>" >> out/_index.html
$buildindex out/index.html out/_index.html

mv out/src/* out/
sass res/:out/res
rm -rf out/src
