DN=`dirname $1`
FN=`basename $1`
OFN=$DN/`echo $FN | sed 's/^__//' | sed 's/md$/html/'`
CSS=`echo $DN | sed -E 's/^.\/?//' | sed -E 's/[^/]+/../g' | sed -E 's/(.+$)/\1\//'`styles/github.css
if `grep "^#TOC" $1 > /dev/null`
then
    pandoc $1 --toc --toc-depth 4 -s -c $CSS -A tools/footer.html -o $OFN
else
    pandoc $1 -s -c $CSS -A tools/footer.html -o $OFN
fi


