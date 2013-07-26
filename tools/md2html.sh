DN=`dirname $1`
FN=`basename $1`
OFN=$DN/`echo $FN | sed 's/^__//' | sed 's/md$/html/'`
CSS=`echo $DN | sed -E 's/^.\/?//' | sed -E 's/[^/]+/../g' | sed -E 's/(.+$)/\1\//'`styles/pandoc.css
pandoc $1 -s -c $CSS -A tools/footer.html -o $OFN
