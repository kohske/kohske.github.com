<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:output method="text"/>

  <xsl:template match="/">
    <xsl:for-each select="/root/file">
      <xsl:if test="(($type!='p') and ($type=@type or @type='b')) or ($type=@type)">
          <xsl:value-of select="@n"/><xsl:text> </xsl:text>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
