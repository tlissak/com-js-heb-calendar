<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
       <xsl:for-each select="root/zone">
      	<h3><xsl:value-of select="location"/></h3>
      
      	<xsl:for-each select="mikve" >
            Nom : <xsl:value-of select="name"/><br />
            Adresse : <xsl:value-of select="address"/><br />
            Ville : <xsl:value-of select="ville"/><br />
            Code Postal : <xsl:value-of select="zip"/><br />
            <xsl:if test="tel!=''">Tel : <xsl:value-of select="tel"/><br /></xsl:if> 
            <xsl:if test="res!=''">Responsable : <xsl:value-of select="res"/><br /></xsl:if> 
            <xsl:if test="tel_2!=''">Tel 2 : <xsl:value-of select="tel_2"/><br /></xsl:if>
            <xsl:if test="tel_3!=''">Tel 3 : <xsl:value-of select="tel_3"/><br /></xsl:if>
            <xsl:if test="time!=''">Horaires : <xsl:value-of select="time"/><br /></xsl:if>
            <xsl:if test="m_type!=''">Type : <xsl:value-of select="m_type"/><br /></xsl:if>
            <xsl:if test="sv!=''">Surveilience : <xsl:value-of select="sv"/><br /></xsl:if>      
            <xsl:if test="org!=''">Org : <xsl:value-of select="org"/><br /></xsl:if> 
            <xsl:if test="info!=''">Info: <xsl:value-of select="info"/><br /></xsl:if> 
            <xsl:if test="contact!=''">Contact : <xsl:value-of select="contact"/><br /></xsl:if> 
            <xsl:if test="email!=''">E-mail: <xsl:value-of select="email"/><br /></xsl:if>
            -----------<br />
       </xsl:for-each>
      </xsl:for-each>    
</xsl:template>
</xsl:stylesheet>