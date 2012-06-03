


# Slidify

超簡単スライド作成

@kohske

---
### マークダウンからスライドを作成しましょう

このスライドの元になってるRmdはこちら

https://gist.github.com/2855525

---
### 手軽に資料を作りましょう

- markdown!!
- knitr!!
- slidify

やばいレベル。

---
### インストール

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">devtools</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"slidify"</span><span class="keyword">,</span> <span class="string">"ramnathv"</span><span class="keyword">)</span>
</pre></div></div></div>


以下も必要かも。

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"knitr"</span><span class="keyword">,</span> <span class="string">"yihui"</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"whisker"</span><span class="keyword">,</span> <span class="string">"edwindj"</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"markdown"</span><span class="keyword">,</span> <span class="string">"rstudio"</span><span class="keyword">)</span>
</pre></div></div></div>


---
### コード評価ももちろんオーケー

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="prompt">&gt; </span><span class="symbol">ctl</span> <span class="assignement">&lt;-</span> <span class="functioncall">c</span><span class="keyword">(</span><span class="number">4.17</span><span class="keyword">,</span> <span class="number">5.58</span><span class="keyword">,</span> <span class="number">5.18</span><span class="keyword">,</span> <span class="number">6.11</span><span class="keyword">,</span> <span class="number">4.5</span><span class="keyword">,</span> <span class="number">4.61</span><span class="keyword">,</span> <span class="number">5.17</span><span class="keyword">,</span>
<span class="prompt">+ </span>    <span class="number">4.53</span><span class="keyword">,</span> <span class="number">5.33</span><span class="keyword">,</span> <span class="number">5.14</span><span class="keyword">)</span>
<span class="prompt">&gt; </span><span class="symbol">trt</span> <span class="assignement">&lt;-</span> <span class="functioncall">c</span><span class="keyword">(</span><span class="number">4.81</span><span class="keyword">,</span> <span class="number">4.17</span><span class="keyword">,</span> <span class="number">4.41</span><span class="keyword">,</span> <span class="number">3.59</span><span class="keyword">,</span> <span class="number">5.87</span><span class="keyword">,</span> <span class="number">3.83</span><span class="keyword">,</span> <span class="number">6.03</span><span class="keyword">,</span>
<span class="prompt">+ </span>    <span class="number">4.89</span><span class="keyword">,</span> <span class="number">4.32</span><span class="keyword">,</span> <span class="number">4.69</span><span class="keyword">)</span>
<span class="prompt">&gt; </span><span class="symbol">group</span> <span class="assignement">&lt;-</span> <span class="functioncall">gl</span><span class="keyword">(</span><span class="number">2</span><span class="keyword">,</span> <span class="number">10</span><span class="keyword">,</span> <span class="number">20</span><span class="keyword">,</span> <span class="argument">labels</span> <span class="argument">=</span> <span class="functioncall">c</span><span class="keyword">(</span><span class="string">"Ctl"</span><span class="keyword">,</span> <span class="string">"Trt"</span><span class="keyword">)</span><span class="keyword">)</span>
<span class="prompt">&gt; </span><span class="symbol">weight</span> <span class="assignement">&lt;-</span> <span class="functioncall">c</span><span class="keyword">(</span><span class="symbol">ctl</span><span class="keyword">,</span> <span class="symbol">trt</span><span class="keyword">)</span>
<span class="prompt">&gt; </span><span class="symbol">lm.D9</span> <span class="assignement">&lt;-</span> <span class="functioncall">lm</span><span class="keyword">(</span><span class="symbol">weight</span> <span class="keyword">~</span> <span class="symbol">group</span><span class="keyword">)</span>
<span class="prompt">&gt; </span>
<span class="prompt">&gt; </span><span class="functioncall">coef</span><span class="keyword">(</span><span class="symbol">lm.D9</span><span class="keyword">)</span>
</pre></div><div class="output"><pre class="knitr">(Intercept)    groupTrt 
      5.032      -0.371 
</pre></div></div></div>


---
### プロットもオーケー

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">par</span><span class="keyword">(</span><span class="argument">family</span> <span class="argument">=</span> <span class="string">"sans"</span><span class="keyword">)</span>
<span class="functioncall">curve</span><span class="keyword">(</span><span class="functioncall">sin</span><span class="keyword">(</span><span class="symbol">x</span><span class="keyword">)</span><span class="keyword">,</span> <span class="keyword">-</span><span class="number">10</span><span class="keyword">,</span> <span class="number">10</span><span class="keyword">,</span> <span class="argument">main</span> <span class="argument">=</span> <span class="string">"正弦波"</span><span class="keyword">)</span>
</pre></div></div><div class="rimage default"><img src="figure/f32.png" class="plot" /></div></div>


---
### ggplot2もオーケー

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">ggplot2</span><span class="keyword">)</span>
<span class="functioncall">ggplot</span><span class="keyword">(</span>NULL<span class="keyword">,</span> <span class="functioncall">aes</span><span class="keyword">(</span><span class="functioncall">c</span><span class="keyword">(</span><span class="keyword">-</span><span class="number">10</span><span class="keyword">,</span> <span class="number">10</span><span class="keyword">)</span><span class="keyword">)</span><span class="keyword">)</span> <span class="keyword">+</span> <span class="functioncall">stat_function</span><span class="keyword">(</span><span class="argument">fun</span> <span class="argument">=</span> <span class="symbol">sin</span><span class="keyword">)</span>
</pre></div></div><div class="rimage default"><img src="figure/f33.png" class="plot" /></div></div>


---
## これはいいね。おしまい。
