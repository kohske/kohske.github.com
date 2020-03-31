<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:output method="xml" doctype-public="-//W3C//DTD XHTML 1.1//EN" doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"/>

  <!--  <xsl:template match="text()"><xsl:value-of select="."/></xsl:template>-->
  <xsl:template match="text()|@*|dl|dt|dd|a|img|p|div|span|br|i|b|u|h1|h2|h3|strike|ol|ul|li|object|embed|param"><xsl:copy><xsl:apply-templates select="@*|node()"/></xsl:copy></xsl:template>
  <xsl:template match="iframe"><xsl:copy-of select="." disable-output-escaping="yes" /></xsl:template>

  <xsl:template name="reverse">
    <xsl:if test="position()=last()">
      <xsl:if test="($lang='j' and contains(@lang, 'j')) or ($lang='e' and contains(@lang, 'e'))"><xsl:apply-templates select="."/></xsl:if>
      <xsl:for-each select="preceding-sibling::*"><xsl:call-template name="reverse"/></xsl:for-each>
    </xsl:if>
  </xsl:template>

  <xsl:template match="col2table">
    <table class="col2table">
      <xsl:for-each select="tr">
	<tr><td class="td1"><xsl:copy-of select="td1/node()"/></td><td class="td2"><xsl:copy-of select="td2/node()"/></td></tr>
      </xsl:for-each>
    </table>
  </xsl:template>
  <!-- @news -->
  <xsl:template match="news/event"><xsl:apply-templates/></xsl:template>
  <xsl:template match="news/event/item">
    <div class="item news-i">
      <div class="news-d"><xsl:copy-of select="d/node()"/></div>
      <div class="news-c"><xsl:copy-of select="c/node()"/></div>
    </div>
  </xsl:template>
  <xsl:template match="news">
    <div id="news"><xsl:apply-templates/></div>
  </xsl:template>
  
  <!-- @publication -->
  <xsl:template match="publication">
    <div id="publication"><xsl:apply-templates/></div>
  </xsl:template>
  <xsl:template match="publication/publist">
    <xsl:if test="$lang='j'"><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="pli[contains(@lang, 'j')]"/></ol></xsl:if>
    <xsl:if test="$lang='e'"><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="pli[contains(@lang, 'e')]"/></ol></xsl:if>
  </xsl:template>

  <!-- @enter -->
  <xsl:template match="enter">
    <xsl:apply-templates/>
  </xsl:template>
  
  <!-- @about -->
  <xsl:template match="about/item">
    <h1 id="{@n}"><xsl:copy-of select="name/node()"/></h1>
    <div class="about-item"><xsl:copy-of select="desc/node()"/></div>
  </xsl:template>
  <xsl:template match="about"><div id="about"><xsl:apply-templates/></div></xsl:template>
  <xsl:template match="file/about">
    <xsl:apply-templates select="p"/>
    <xsl:if test="$lang='j'">
      <div style="background-color:#DDD">
	<xsl:for-each select="item">
	  <a href="#{@n}" style="text-decoration:underline"><xsl:value-of select="name"/></a>　
	</xsl:for-each>
      </div>
      <xsl:apply-templates select="item"/>
    </xsl:if>
  </xsl:template>
  
  <!-- @schedule -->
  <xsl:template match="schedule">
    <xsl:choose>
      <xsl:when test="$lang='j'">
	<h1>今後の発表予定</h1>
	<div class="itemlist schedulelist"><ul><xsl:apply-templates select="future/pli[contains(@lang, 'j')]"/></ul></div>
	<h1>これまでの発表</h1>
	<xsl:for-each select="past">
	  <h2><xsl:value-of select="@y"/>年</h2>
	  <div class="itemlist schedulelist">
	    <ul>
	      <xsl:apply-templates select="./pli[contains(@lang, 'j')]"/>
	    </ul>
	  </div>
	</xsl:for-each>
      </xsl:when>
      <xsl:when test="$lang='e'">
	<h1>Future Presentations</h1>
	<div class="itemlist schedulelist"><ul><xsl:apply-templates select="future/pli[contains(@lang, 'e')]"/></ul></div>
	<h1>Previous Presentations</h1>
	<xsl:for-each select="past">
	  <h2><xsl:value-of select="@y"/></h2>
	  <div class="itemlist schedulelist">
	    <ul>
	      <xsl:apply-templates select="./pli[contains(@lang, 'e')]"/>	      
	    </ul>
	  </div>
	</xsl:for-each>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
  <!-- @members -->
  <xsl:template match="members/itemlist/mlist/item">
    <div>
      <xsl:if test="position() mod 2=1"><xsl:attribute name="class">member-people list-odd</xsl:attribute></xsl:if>
      <xsl:if test="position() mod 2=0"><xsl:attribute name="class">member-people list-even</xsl:attribute></xsl:if>
      <xsl:choose>
	<xsl:when test="url!=''"><a href="{url}">
	    <div class="member-name"><xsl:copy-of select="name/node()"/></div>
	    <xsl:if test="$lang='j'"><div class="member-ruby">(<xsl:copy-of select="ruby/node()"/>)</div></xsl:if>
	    <div class="member-spec"><xsl:copy-of select="intro/node()"/></div>
	</a></xsl:when>
	<xsl:otherwise>
	  <div class="member-name"><xsl:copy-of select="name/node()"/></div>
	  <xsl:if test="$lang='j'"><div class="member-ruby">(<xsl:copy-of select="ruby/node()"/>)</div></xsl:if>
	  <div class="member-spec"><xsl:copy-of select="intro/node()"/></div>
	</xsl:otherwise>
      </xsl:choose>
    </div>
  </xsl:template>

  <xsl:template match="members/itemlist/mlist/persons">
    <div class="member-persons"><xsl:value-of select="."/></div>
  </xsl:template>
  
  <xsl:template match="members">
    <div id="members">
      <h1><xsl:if test="$lang='j'">メンバー</xsl:if><xsl:if test="$lang='e'">Members</xsl:if></h1>
      <div class="member-list">
	<xsl:for-each select="itemlist[@name='current']/mlist">
	  <h2><xsl:value-of select="@n"/></h2>
	  <xsl:apply-templates select="item"/>
	  <xsl:apply-templates select="persons"/>	  
	</xsl:for-each>
      </div>
      <h1><xsl:if test="$lang='j'">旧メンバー</xsl:if><xsl:if test="$lang='e'">Alumni</xsl:if></h1>
      <div class="member-list">
	<xsl:for-each select="itemlist[@name='old']/mlist">
	  <h2><xsl:value-of select="@n"/></h2>
	  <xsl:apply-templates select="item"/>
	  <xsl:apply-templates select="persons"/>	  
	</xsl:for-each>
      </div>
      <!--
	  <h1><xsl:if test="$lang='j'">旧メンバー</xsl:if><xsl:if test="$lang='e'">Alumni</xsl:if></h1>
	  <div class="member-list"><xsl:apply-templates select="itemlist[@name='old']/mlist/item"/></div>
      -->
    </div>
  </xsl:template>

  <!-- profiles -->
  <xsl:template match="/root/file[@type='p']/profile">
    <xsl:if test="$lang='j'">
      <div id="profile">
	<h1 id="prof-head">
	  <div id="prof-post"><xsl:value-of select="profj/post"/></div>
	  <div><xsl:value-of select="profj/name"/></div>
	  <div id="prof-ruby">(<xsl:value-of select="profj/ruby"/>)</div>
	</h1>
	<div id="prof-face"><img src="img/face_{../@n}.png"/></div>
<!--	<div id="prof-face"><img src="img/face_noimage.jpg"/></div>-->
	<div id="prof-header">
	  <div class="prof-item"><div class="prof-item-title">居室</div><div class="prof-item-desc"><xsl:apply-templates select="profj/room"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">TEL</div><div class="prof-item-desc"><xsl:apply-templates select="profj/tel"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">FAX</div><div class="prof-item-desc"><xsl:apply-templates select="profj/fax"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">E-Mail</div><div class="prof-item-desc"><img src="img/email_{../@n}.png"/></div></div>
	</div>
	<div id="prof-spec"><div id="prof-spec-title">専門分野</div><div id="prof-spec-desc"><xsl:apply-templates select="profj/spec"/></div></div>
	<h1>経歴</h1>
	<h2>学歴</h2><ul class="prof-bio"><xsl:apply-templates select="bioj/education/item"/></ul>
	<xsl:if test="count(bioj/iCareer/item)=0"><h2>職歴</h2><ul class="prof-bio"><xsl:apply-templates select="bioj/career/item"/></ul></xsl:if>
	<xsl:if test="count(bioj/iCareer/item)!=0"><h2>職歴</h2><h3>常勤</h3><ul class="prof-bio"><xsl:apply-templates select="bioj/career/item"/></ul><h3>非常勤</h3><ul class="prof-bio"><xsl:apply-templates select="bioj/iCareer/item"/></ul></xsl:if>
	<xsl:if test="count(publist/pli)!=0">
	  <h1>研究業績</h1>
	  <!--	  <xsl:if test="count(publist[@type='j']/pli)!=0"><h2 id="prof-publist-head-j">学術論文</h2><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="publist[@type='j']/pli[contains(@lang, 'j')]"/></ol></xsl:if>-->
	  <xsl:if test="count(publist[@type='j']/pli)!=0">
	    <h2 id="prof-publist-head-j">学術論文</h2>
	    <xsl:if test="count(publist[@type='j']/pli[contains(@lang, 'e')])!=0">
	      <!--<h3>英語論文</h3><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="publist[@type='j']/pli[contains(@lang, 'e')]"/></ol>-->
	      <h3>英文</h3><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="publist[@type='j']/pli[@lang='ej']"/></ol>
	    </xsl:if>
	    <xsl:if test="count(publist[@type='j']/pli[@lang='j'])!=0">
	      <h3>和文</h3><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="publist[@type='j']/pli[@lang='j']"/></ol>
	    </xsl:if>
	  </xsl:if>
	  <xsl:if test="count(publist[@type='b']/pli)!=0"><h2 id="prof-publist-head-b">著書・総説</h2><ol class="prof-publist" id="prof-publist-b"><xsl:apply-templates select="publist[@type='b']/pli[contains(@lang, 'j')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='l']/pli)!=0"><h2 id="prof-publist-head-l">招待講演・特別講演</h2><ol class="prof-publist" id="prof-publist-l"><xsl:apply-templates select="publist[@type='l']/pli[contains(@lang, 'j')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='i']/pli)!=0"><h2 id="prof-publist-head-i">国際会議</h2><ol class="prof-publist" id="prof-publist-i"><xsl:apply-templates select="publist[@type='i']/pli[contains(@lang, 'j')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='d']/pli)!=0"><h2 id="prof-publist-head-d">国内会議</h2><ol class="prof-publist" id="prof-publist-d"><xsl:apply-templates select="publist[@type='d']/pli[contains(@lang, 'j')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='o' or @type='a' or @type='x' or @type='g']/pli)!=0">
	    <h2 id="prof-publist-head-o">その他</h2>
	    <xsl:if test="count(publist[@type='o']/pli)!=0"><h3>紀要・抄録・技報等</h3><ol class="prof-publist" id="prof-publist-o"><xsl:apply-templates select="publist[@type='o']/pli[contains(@lang, 'j')]"/></ol></xsl:if>
	    <xsl:if test="count(publist[@type='a']/pli)!=0"><h3>受賞</h3><ul class="prof-publist" id="prof-publist-a"><xsl:apply-templates select="publist[@type='a']/pli[contains(@lang, 'j')]"/></ul></xsl:if>
	    <xsl:if test="count(publist[@type='g']/pli)!=0"><h3>研究助成</h3><ul class="prof-publist" id="prof-publist-g"><xsl:apply-templates select="publist[@type='g']/pli[contains(@lang, 'j')]"/></ul></xsl:if>
	    <xsl:for-each select="publist[@type='x']"><h3><xsl:value-of select="@jname"/></h3><ul class="prof-publist" id="prof-publist-sp"><xsl:apply-templates select="pli[contains(@lang, 'j')]"/></ul></xsl:for-each>
	  </xsl:if>
	</xsl:if>
	<xsl:if test="count(linkj/li)!=0"><h1>リンク</h1><ul class="prof-link" id="prof-publist-a"><xsl:copy-of select="linkj/*"/></ul></xsl:if>
      </div>
    </xsl:if>
    <xsl:if test="$lang='e'">
      <div id="profile">
	<h1 id="prof-head">
	  <div id="prof-post"><xsl:value-of select="prof/post"/></div>
	  <div><xsl:value-of select="prof/name"/></div>
	</h1>
	<div id="prof-face"><img src="img/face_{../@n}.png"/></div>
	<div id="prof-header">
	  <div class="prof-item"><div class="prof-item-title">Room</div><div class="prof-item-desc"><xsl:apply-templates select="prof/room"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">TEL</div><div class="prof-item-desc"><xsl:apply-templates select="prof/tel"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">FAX</div><div class="prof-item-desc"><xsl:apply-templates select="prof/fax"/></div></div>
	  <div class="prof-item"><div class="prof-item-title">E-Mail</div><div class="prof-item-desc"><img src="img/email_{../@n}.png"/></div></div>
	</div>
	<div id="prof-spec"><div id="prof-spec-title">Key Words</div><div id="prof-spec-desc"><xsl:apply-templates select="prof/spec"/></div></div>
	<h1>Curriculum Vitae</h1>
	<h2>Education</h2><ul class="prof-bio"><xsl:apply-templates select="bio/education/item"/></ul>
	<h2>Professional Experience</h2><ul class="prof-bio"><xsl:apply-templates select="bio/career/item"/></ul>
	<xsl:if test="count(publist/pli[contains(@lang, 'e')])!=0">
	  <h1>Publications</h1>
	  <xsl:if test="count(publist[@type='j']/pli[contains(@lang, 'e')])!=0"><h2 id="prof-publist-head-j">Journal Articles</h2><ol class="prof-publist" id="prof-publist-j"><xsl:apply-templates select="publist[@type='j']/pli[contains(@lang, 'e')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='b']/pli[contains(@lang, 'e')])!=0"><h2 id="prof-publist-head-b">Books and Book Chapters</h2><ol class="prof-publist" id="prof-publist-b"><xsl:apply-templates select="publist[@type='b']/pli[contains(@lang, 'e')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='l']/pli[contains(@lang, 'e')])!=0"><h2 id="prof-publist-head-l">Invited Talks</h2><ol class="prof-publist" id="prof-publist-l"><xsl:apply-templates select="publist[@type='l']/pli[contains(@lang, 'e')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='i']/pli[contains(@lang, 'e')])!=0"><h2 id="prof-publist-head-i">International Conferences</h2><ol class="prof-publist" id="prof-publist-i"><xsl:apply-templates select="publist[@type='i']/pli[contains(@lang, 'e')]"/></ol></xsl:if>
	  <xsl:if test="count(publist[@type='o' or @type='a' or @type='x' or @type='g']/pli[contains(@lang, 'e')])!=0">
	    <h2 id="prof-publist-head-o">Others</h2>
	    <xsl:if test="count(publist[@type='o']/pli[contains(@lang, 'e')])!=0"><h3>Proceedings and other presentations</h3><ol class="prof-publist" id="prof-publist-o"><xsl:apply-templates select="publist[@type='o']/pli[contains(@lang, 'e')]"/></ol></xsl:if>
	    <xsl:if test="count(publist[@type='a']/pli[contains(@lang, 'e')])!=0"><h3>Awards</h3><ul class="prof-publist" id="prof-publist-a"><xsl:apply-templates select="publist[@type='a']/pli[contains(@lang, 'e')]"/></ul></xsl:if>
	    <xsl:if test="count(publist[@type='g']/pli[contains(@lang, 'e')])!=0"><h3>Grants</h3><ul class="prof-publist" id="prof-publist-a"><xsl:apply-templates select="publist[@type='g']/pli[contains(@lang, 'e')]"/></ul></xsl:if>
	    <xsl:for-each select="publist[@type='x']">
	      <xsl:if test="count(pli[contains(@lang, 'e')])!=0"><h3><xsl:value-of select="@ename"/></h3><ul class="prof-publist" id="prof-publist-m"><xsl:apply-templates select="pli[contains(@lang, 'e')]"/></ul></xsl:if>
	    </xsl:for-each>
	  </xsl:if>
	  <xsl:if test="count(link/li)!=0">
	    <h1>Links</h1><ul class="prof-link" id="prof-publist-a"><xsl:copy-of select="link/*"/></ul>
	  </xsl:if>
	</xsl:if>
      </div>
    </xsl:if>
  </xsl:template>
  
  <!-- book chapter -->
  <xsl:template match="pli[@type='b']">
    <li class="pli pli-b">
      <span class="pli-AU"><xsl:apply-templates select="AU"/></span><xsl:text> </xsl:text><span class="pli-YE">(<xsl:apply-templates select="YE"/>)</span><xsl:text> </xsl:text>
      <span class="pli-TI"><xsl:apply-templates select="TI"/></span><xsl:text> </xsl:text><span class="pli-BT"><xsl:apply-templates select="BT"/></span>
      <xsl:if test="PP!=''"><xsl:text>, </xsl:text><span class="pli-PP"><xsl:apply-templates select="PP"/></span></xsl:if>
      <xsl:if test="ED!=''"><xsl:text>, </xsl:text><span class="pli-ED"><xsl:apply-templates select="ED"/></span></xsl:if>
      <xsl:if test="PU!=''"><xsl:text>, </xsl:text><span class="pli-PU"><xsl:apply-templates select="PU"/></span></xsl:if>
      <xsl:text>.</xsl:text><xsl:if test="NO!=''"><xsl:text> </xsl:text><span class="pli-NO"><xsl:apply-templates select="NO"/></span><xsl:text>.</xsl:text></xsl:if>
      <xsl:if test="url!=''"><xsl:text>&#160;</xsl:text><span class="pli-URL"><a href="{url}" target="_blank">&#160;LINK&#160;</a></span></xsl:if>
      <xsl:if test="doi!=''">
	<xsl:if test="not(url) or url=''"><xsl:text>&#160;</xsl:text><span class="pli-URL"><a href="http://dx.doi.org/{doi}" target="_blank">&#160;LINK&#160;</a></span></xsl:if>
	<xsl:text>&#160;</xsl:text><span class="pli-DOI" onclick="$('{doi}').style.display='';$('{doi}_text').select();">&#160;DOI&#160;</span><div class="pli-DOI-text" id="{doi}" style="display:none;"><input id="{doi}_text" type="text" size="80" value="{doi}"/><span class="pli-DOI-X" onclick="$('{doi}').style.display='none';">&#160;X&#160;</span></div>
      </xsl:if>
    </li>
  </xsl:template>
  <!-- journal article -->
  <xsl:template match="pli[@type='j']">
    <li class="pli pli-j">
      <span class="pli-AU"><xsl:apply-templates select="AU"/></span><xsl:text> </xsl:text><span class="pli-YE">(<xsl:apply-templates select="YE"/>)</span><xsl:text> </xsl:text>
      <span class="pli-TI"><xsl:apply-templates select="TI"/></span><xsl:text> </xsl:text><span class="pli-JO"><xsl:apply-templates select="JO"/></span>
      <xsl:if test="VO!=''"><xsl:text>, </xsl:text><span class="pli-VO"><xsl:apply-templates select="VO"/></span><xsl:if test="IS!=''"><span class="pli-IS">(<xsl:apply-templates select="IS"/>)</span></xsl:if></xsl:if>
      <xsl:if test="PP!=''"><xsl:text>, </xsl:text><span class="pli-PP"><xsl:apply-templates select="PP"/></span></xsl:if>
      <xsl:text>.</xsl:text><xsl:if test="NO!=''"><xsl:text> </xsl:text><span class="pli-NO"><xsl:apply-templates select="NO"/></span><xsl:text>.</xsl:text></xsl:if>
      <xsl:if test="url!=''"><xsl:text>&#160;</xsl:text><span class="pli-URL"><a href="{url}" target="_blank">&#160;LINK&#160;</a></span></xsl:if>
      <xsl:if test="doi!=''">
	<xsl:if test="not(url) or url=''"><xsl:text>&#160;</xsl:text><span class="pli-URL"><a href="http://dx.doi.org/{doi}" target="_blank">&#160;LINK&#160;</a></span></xsl:if>
	<xsl:text>&#160;</xsl:text><span class="pli-DOI" onclick="$('{doi}').style.display='';$('{doi}_text').select();">&#160;DOI&#160;</span><div class="pli-DOI-text" id="{doi}" style="display:none;"><input id="{doi}_text" type="text" size="80" value="{doi}"/><span class="pli-DOI-X" onclick="$('{doi}').style.display='none';">&#160;X&#160;</span></div>
      </xsl:if>
    </li>
  </xsl:template>
  <!-- conference -->
  <xsl:template match="pli[@type='c']">
    <li class="pli pli-c">
      <span class="pli-AU"><xsl:apply-templates select="AU"/></span><xsl:text> </xsl:text><span class="pli-YE">(<xsl:apply-templates select="YE"/>)</span><xsl:text> </xsl:text>
      <span class="pli-TI"><xsl:apply-templates select="TI"/></span><xsl:text> </xsl:text>
      <xsl:if test="CO!=''"><span class="pli-CO"><xsl:apply-templates select="CO"/></span></xsl:if>
      <xsl:if test="PL!=''"><xsl:if test="CO!=''"><xsl:text>, </xsl:text></xsl:if><span class="pli-PL"><xsl:apply-templates select="PL"/></span></xsl:if>
      <xsl:text>.</xsl:text><xsl:if test="NO!=''"><xsl:text> </xsl:text><span class="pli-NO"><xsl:apply-templates select="NO"/></span><xsl:text>.</xsl:text></xsl:if>
    </li>
  </xsl:template>
  <!-- as is -->
  <xsl:template match="pli[@type='x']">
    <li class="pli pli-x"><xsl:apply-templates/></li>
  </xsl:template>

  <xsl:template match="schedule/*/pli">
    <li class="pli">
      <p>
	<span class="TI"><xsl:apply-templates select="TI/node()"/></span><br/>
	<span class="AU"><xsl:apply-templates select="AU/node()"/></span><br/> <!--&#160;-->
	<span class="YE"><xsl:apply-templates select="YE/node()"/></span><br/>
	<xsl:if test="url!=''">
	  <a href="{url/node()}">
	    <span class="CO"><xsl:apply-templates select="CO/node()"/> @</span>
	    <span class="PL"><xsl:apply-templates select="PL/node()"/></span>
	  </a>
	</xsl:if>
	<xsl:if test="url=''">
	  <span class="CO"><xsl:apply-templates select="CO/node()"/> @</span>
	  <span class="PL"><xsl:apply-templates select="PL/node()"/></span>
	</xsl:if>
      </p>
    </li>
  </xsl:template>

  <xsl:template match="/root/file[@type='p']/profile/bioj//item|/root/file[@type='p']/profile/bio//item">
    <li class="prof-bio-item">
      <div class="prof-bio-item-date"><xsl:apply-templates select="date"/></div>
      <div class="prof-bio-item-desc"><xsl:apply-templates select="desc"/></div>
    </li>
  </xsl:template>


  <!-- file top -->
  <xsl:template match="/root/file">
    <xsl:if test="$file=@n and (@type='p' or @type=$lang or @type='b')">
      <xsl:variable name="fnj"><xsl:if test="@type='p'">profilej_</xsl:if><xsl:value-of select="$file"/><xsl:if test="@type!='p'">j</xsl:if>.html</xsl:variable>
      <xsl:variable name="fne"><xsl:if test="@type='p'">profilee_</xsl:if><xsl:value-of select="$file"/><xsl:if test="@type!='p'">e</xsl:if>.html</xsl:variable>
      <html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	  <title>Takahashi Laboratory</title>
	  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	  <link rel="stylesheet" type="text/css" href="css/main.css"/>
	  <link rel="stylesheet" type="text/css" href="css/skin.css"/>
	  <xsl:if test="@n='schedule'">
	    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://www.fennel.rcast.u-tokyo.ac.jp/schedule-rss.xml"></link>
	  </xsl:if>
	  <xsl:if test="@n='schedule' or @n='publication' or @type='p'">
	    <script type="text/javascript" src="js/prototype.js">;</script>
	    <script type="text/javascript" src="js/filter.js">;</script>
	  </xsl:if>
	</head>
    	<body class="{$lang}">
	  <div id="main">
	    <!-- header area -->
	    <div id="header">
	      <xsl:choose>
		<xsl:when test="$lang='j'">
		  <a href="indexj.html">HOME</a> | <a href="{$fne}">English</a>
		</xsl:when>
		<xsl:when test="$lang='e'">
		  <a href="indexe.html">HOME</a> | <a href="{$fnj}">Japanese</a>
		</xsl:when>
	      </xsl:choose>
	    </div>
	    <!-- contents -->
	    <div id="contents">
	      <!-- column2 as sidebar -->
	      <div id="column2">
		<!-- title logo -->
		<div id="title"><xsl:copy-of select="/root/common[@name='title' and @lang=$lang]/node()"/></div>
		<!-- navigation -->
		<xsl:variable name="n"><xsl:value-of select="@n"/></xsl:variable>
		<div id="column2navi">
		  <xsl:for-each select="/root/common[@name='column2' and @lang=$lang]/item">
		    <div class="column2item">
		      <a href="{@url}">
			<xsl:if test="$n=@name"><xsl:attribute name="id">selected</xsl:attribute></xsl:if>
			<xsl:apply-templates select="node()"/>
		      </a>
		    </div>
		  </xsl:for-each>
		  <!-- Google 検索 -->
		  <!--
		  <div class="column2item">
		    <form action="http://www.google.com/cse" id="cse-search-box">
		      <input type="hidden" name="cx" value="005691409272146903868:thlhycquhsq" />
		      <input type="hidden" name="ie" value="UTF-8" />
		      <input type="text" name="q" size="8"/>
		      <input type="submit" name="sa" value="Google"  style="font-size:8pt"/>
		    </form>
		  </div>
		  -->
		  <xsl:if test="@n='schedule' or @n='publication'">
		    <div class="rc-border">&#160;</div>
		    <div id="search_filter" class="right">Filter: <input id="search_filter_txtbox" type="text" size="12"/></div>
		  </xsl:if>
		  <!-- -->
		  <xsl:if test="@type='p' and $lang='j' and count(profile/publist/pli)!=0">
		    <div class="rc-border">&#160;</div>
		    <div id="publist-index">
		      <xsl:if test="count(profile/publist[@type='j']/pli)!=0"><p><a href="#prof-publist-head-j">学術論文<!--  (<xsl:value-of select="count(profile/publist[@type='j']/pli)"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='b']/pli)!=0"><p><a href="#prof-publist-head-b">著書・総説<!--  (<xsl:value-of select="count(profile/publist[@type='b']/pli)"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='l']/pli)!=0"><p><a href="#prof-publist-head-l">招待講演・特別講演<!--  (<xsl:value-of select="count(profile/publist[@type='l']/pli)"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='i']/pli)!=0"><p><a href="#prof-publist-head-i">国際会議<!--  (<xsl:value-of select="count(profile/publist[@type='i']/pli)"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='d']/pli)!=0"><p><a href="#prof-publist-head-d">国内会議<!--  (<xsl:value-of select="count(profile/publist[@type='d']/pli)"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='o' or @type='a' or @type='x' or @type='g']/pli)!=0"><p><a href="#prof-publist-head-o">その他<!--  (<xsl:value-of select="count(profile/publist[@type='o' or @type='a' or @type='x' or @type='g']/pli)"/>) --></a></p></xsl:if>
		    </div>
		    <div class="rc-border">&#160;</div>
		    <div id="search_filter" class="right">Filter: <input id="search_filter_txtbox" type="text" size="12"/></div>
		  </xsl:if>
		  <xsl:if test="@type='p' and $lang='e' and count(profile/publist/pli[@lang='e'])!=0">
		    <div class="rc-border">&#160;</div>
		    <div id="publist-index">
		      <xsl:if test="count(profile/publist[@type='j']/pli[@lang='e'])!=0"><p><a href="#prof-publist-head-j">Journal Articles<!--  (<xsl:value-of select="count(profile/publist[@type='j']/pli[@lang='e'])"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='b']/pli[@lang='e'])!=0"><p><a href="#prof-publist-head-b">Books<!--  (<xsl:value-of select="count(profile/publist[@type='b']/pli[@lang='e'])"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='l']/pli[@lang='e'])!=0"><p><a href="#prof-publist-head-l">Invited Talks<!--  (<xsl:value-of select="count(profile/publist[@type='l']/pli[@lang='e'])"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='i']/pli[@lang='e'])!=0"><p><a href="#prof-publist-head-i">Conferences<!--  (<xsl:value-of select="count(profile/publist[@type='i']/pli[@lang='e'])"/>) --></a></p></xsl:if>
		      <xsl:if test="count(profile/publist[@type='o' or @type='a' or @type='x' or @type='g']/pli[@lang='e'])!=0"><p><a href="#prof-publist-head-i">Others<!--  (<xsl:value-of select="count(profile/publist[@type='o' or @type='a' or @type='x' or @type='g']/pli[@lang='e'])"/>) --></a></p></xsl:if>
		    </div>
		    <div class="rc-border">&#160;</div>
		    <div id="search_filter" class="right">Filter: <input id="search_filter_txtbox" type="text" size="12"/></div>
		  </xsl:if>
		</div>
	      </div>
	      <!-- column1 as main text -->
	      <div id="column1">
		<xsl:apply-templates select="@*|node()"/>
	      </div>
	    </div>
	    <!-- footer -->
	    <div id="footer">copyright &#169; 2017 Takahashi Laboratory, All Rights Reserved.</div>
	  </div>
	</body>
      </html>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/root"><xsl:apply-templates select="file"/></xsl:template>
</xsl:stylesheet>
