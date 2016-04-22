#!/bin/sh

outdir=".."
xslfn="template.xsl"
datafn="data.xml"

if [ $# -gt 0 ] 
then
    outfiles=$@
else
    outfiles=`xsltproc --xinclude --stringparam type j page.xsl data.xml`
    profiles=`xsltproc --xinclude --stringparam type p page.xsl data.xml`
fi

for f in ${outfiles}
do
    echo ${f}j.html
    xsltproc --xinclude --stringparam file ${f} --stringparam lang j ${xslfn} ${datafn} | sed 's/<?xml.*>//' | tidy -utf8 -q -i -xml > ${outdir}/${f}j.html 
    echo ${f}e.html
    xsltproc --xinclude --stringparam file ${f} --stringparam lang e ${xslfn} ${datafn} | sed 's/<?xml.*>//' | tidy -utf8 -q -i -xml > ${outdir}/${f}e.html
done
cp ${outdir}/indexj.html ${outdir}/index.html

for f in ${profiles}
do
    echo profilej_${f}.html
    xsltproc --xinclude --stringparam file ${f} --stringparam lang j ${xslfn} ${datafn} | sed 's/<?xml.*>//' | tidy -utf8 -q -i -xml > ${outdir}/profilej_${f}.html
    echo profilee_${f}.html
    xsltproc --xinclude --stringparam file ${f} --stringparam lang e ${xslfn} ${datafn} | sed 's/<?xml.*>//' | tidy -utf8 -q -i -xml > ${outdir}/profilee_${f}.html
done

#echo rss
#xsltproc rss.xsl ${datafn} | tidy -utf8 -q -i -xml | sed "s/<description>/<description><![CDATA[/" | sed "s/<\/description>/]]><\/description>/" > ${outdir}/schedule-rss.xml

