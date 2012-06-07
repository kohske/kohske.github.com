


# Markdown, Knitr, and Slidify

state-of-the-art report/presentation generation in R

## @kohske

---
### Easy, fun, and beautiful

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="symbol">txt</span> <span class="assignement">&lt;-</span> <span class="functioncall">rep</span><span class="keyword">(</span><span class="functioncall">c</span><span class="keyword">(</span><span class="string">"E"</span><span class="keyword">,</span> <span class="string">"a"</span><span class="keyword">,</span> <span class="string">"s"</span><span class="keyword">,</span> <span class="string">"y"</span><span class="keyword">)</span><span class="keyword">,</span> <span class="number">10</span><span class="keyword">)</span>
<span class="functioncall">grid.text</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">,</span> <span class="number">0.5</span> <span class="keyword">+</span> <span class="functioncall">sin</span><span class="keyword">(</span><span class="number">2</span> <span class="keyword">*</span> <span class="symbol">pi</span> <span class="keyword">*</span> <span class="functioncall">seq_along</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">)</span><span class="keyword">/</span><span class="functioncall">length</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">)</span><span class="keyword">)</span><span class="keyword">/</span><span class="number">2.2</span><span class="keyword">,</span>
    <span class="number">0.5</span> <span class="keyword">+</span> <span class="functioncall">cos</span><span class="keyword">(</span><span class="number">2</span> <span class="keyword">*</span> <span class="symbol">pi</span> <span class="keyword">*</span> <span class="functioncall">seq_along</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">)</span><span class="keyword">/</span><span class="functioncall">length</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">)</span><span class="keyword">)</span><span class="keyword">/</span><span class="number">2.2</span><span class="keyword">,</span> <span class="argument">gp</span> <span class="argument">=</span> <span class="functioncall">gpar</span><span class="keyword">(</span><span class="argument">fontsize</span> <span class="argument">=</span> <span class="number">30</span><span class="keyword">,</span>
        <span class="argument">col</span> <span class="argument">=</span> <span class="functioncall">rainbow</span><span class="keyword">(</span><span class="functioncall">length</span><span class="keyword">(</span><span class="symbol">txt</span><span class="keyword">)</span><span class="keyword">)</span><span class="keyword">)</span><span class="keyword">)</span>
</pre></div></div><div class="rimage right"><img src="figure/ch1.png" class="plot" /></div></div>


---
### Reproducible

#### Freedom from
- Hand working
- Copy and paste
- Tweaking graphics by hand

#### All you need is
- Data
- Code
- Text
- Picture

---
### Tools

All tools are available for free.

- [R][link_R]: environment for data analysis
- [knitr][link_knitr]: report generation tool for R
- [slidify][link_slidify]: HTML5 slide generator
[link_R]: http://www.r-project.org/
[link_knitr]: http://yihui.name/knitr/
[link_slidify]: http://ramnathv.github.com/slidify/

- [Rstudio][link_rstudio]: excellent support for knitr.
[link_rstudio]: http://rstudio.org/

![R logo](figure/r-logo.png)

---
### Step-by-step tutorial

1. Prepare data
2. Write a code for data analysis
3. Write a code for summary output
4. Write a code for visualization
5. Knit them
6. Publish

---
### 1. Prepare data

Ok, use `iris`.

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">head</span><span class="keyword">(</span><span class="symbol">iris</span><span class="keyword">)</span>
</pre></div><div class="output"><pre class="knitr">##   Sepal.Length Sepal.Width Petal.Length Petal.Width Species
## 1          5.1         3.5          1.4         0.2  setosa
## 2          4.9         3.0          1.4         0.2  setosa
## 3          4.7         3.2          1.3         0.2  setosa
## 4          4.6         3.1          1.5         0.2  setosa
## 5          5.0         3.6          1.4         0.2  setosa
## 6          5.4         3.9          1.7         0.4  setosa
</pre></div></div></div>


Of course, you may use data from your own experiment.

---
### 2. Write a code for data analysis

summary of `iris`
<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">summary</span><span class="keyword">(</span><span class="symbol">iris</span><span class="keyword">)</span>
</pre></div><div class="output"><pre class="knitr">##   Sepal.Length   Sepal.Width    Petal.Length   Petal.Width 
##  Min.   :4.30   Min.   :2.00   Min.   :1.00   Min.   :0.1  
##  1st Qu.:5.10   1st Qu.:2.80   1st Qu.:1.60   1st Qu.:0.3  
##  Median :5.80   Median :3.00   Median :4.35   Median :1.3  
##  Mean   :5.84   Mean   :3.06   Mean   :3.76   Mean   :1.2  
##  3rd Qu.:6.40   3rd Qu.:3.30   3rd Qu.:5.10   3rd Qu.:1.8  
##  Max.   :7.90   Max.   :4.40   Max.   :6.90   Max.   :2.5  
##        Species  
##  setosa    :50  
##  versicolor:50  
##  virginica :50  
##                 
##                 
##                 
</pre></div></div></div>


---
### 2. Write a code for data analysis

Old-fashioned statistical test.

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">reshape2</span><span class="keyword">)</span>
<span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">plyr</span><span class="keyword">)</span>
<span class="symbol">iris2</span> <span class="assignement">&lt;-</span> <span class="functioncall">melt</span><span class="keyword">(</span><span class="symbol">iris</span><span class="keyword">)</span>
</pre></div><div class="message"><pre class="knitr">## Using Species as id variables
</pre></div><div class="source"><pre class="knitr"><span class="functioncall">dlply</span><span class="keyword">(</span><span class="symbol">iris2</span><span class="keyword">,</span> <span class="functioncall">.</span><span class="keyword">(</span><span class="symbol">variable</span><span class="keyword">)</span><span class="keyword">,</span> <span class="keyword">function</span><span class="keyword">(</span><span class="formalargs">x</span><span class="keyword">)</span> <span class="functioncall">pairwise.t.test</span><span class="keyword">(</span><span class="symbol">x</span><span class="keyword">$</span><span class="symbol">value</span><span class="keyword">,</span>
    <span class="symbol">x</span><span class="keyword">$</span><span class="symbol">Species</span><span class="keyword">)</span><span class="keyword">)</span>
</pre></div><div class="output"><pre class="knitr">## $Sepal.Length
## 
## 	Pairwise comparisons using t tests with pooled SD 
## 
## data:  x$value and x$Species 
## 
##            setosa  versicolor
## versicolor 1.8e-15 -         
## virginica  < 2e-16 2.8e-09   
## 
## P value adjustment method: holm 
## 
## $Sepal.Width
## 
## 	Pairwise comparisons using t tests with pooled SD 
## 
## data:  x$value and x$Species 
## 
##            setosa  versicolor
## versicolor < 2e-16 -         
## virginica  9.1e-10 0.0031    
## 
## P value adjustment method: holm 
## 
## $Petal.Length
## 
## 	Pairwise comparisons using t tests with pooled SD 
## 
## data:  x$value and x$Species 
## 
##            setosa versicolor
## versicolor <2e-16 -         
## virginica  <2e-16 <2e-16    
## 
## P value adjustment method: holm 
## 
## $Petal.Width
## 
## 	Pairwise comparisons using t tests with pooled SD 
## 
## data:  x$value and x$Species 
## 
##            setosa versicolor
## versicolor <2e-16 -         
## virginica  <2e-16 <2e-16    
## 
## P value adjustment method: holm 
## 
## attr(,"split_type")
## [1] "data.frame"
## attr(,"split_labels")
##       variable
## 1 Sepal.Length
## 2  Sepal.Width
## 3 Petal.Length
## 4  Petal.Width
</pre></div></div></div>


---
### 3. Write a code for summary output.

- For presentation, figures are better
- For report, [static html][link_static] version with detailed information may be better
[link_static]: http://kohske.github.com/sandbox/slidify/why-slidify/whyslidify_static.html

---
### 4. Visualization

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">ggplot2</span><span class="keyword">)</span>
<span class="functioncall">ggplot</span><span class="keyword">(</span><span class="symbol">iris2</span><span class="keyword">,</span> <span class="functioncall">aes</span><span class="keyword">(</span><span class="symbol">variable</span><span class="keyword">,</span> <span class="symbol">value</span><span class="keyword">,</span> <span class="argument">colour</span> <span class="argument">=</span> <span class="symbol">Species</span><span class="keyword">)</span><span class="keyword">)</span> <span class="keyword">+</span>
    <span class="functioncall">geom_boxplot</span><span class="keyword">(</span><span class="keyword">)</span> <span class="keyword">+</span> <span class="functioncall">theme_grey</span><span class="keyword">(</span><span class="argument">base_size</span> <span class="argument">=</span> <span class="number">24</span><span class="keyword">)</span>
</pre></div></div><div class="rimage default"><img src="figure/ch6.png" class="plot" /></div></div>


---
### 5. Markdown

You can knit text, codes, and pictures in a [markdown][mdofficial] file.
[mdofficial]: http://daringfireball.net/projects/markdown/


Here is the [markdown file][link_md] that [generates][link_generator] this slide.
[link_md]: http://kohske.github.com/sandbox/slidify/why-slidify/whyslidify.Rmd
[link_generator]: http://kohske.github.com/sandbox/slidify/why-slidify/generator.R

Then, all you need is:
- generate html

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">knit2html</span><span class="keyword">(</span><span class="string">"whyslidify.Rmd"</span><span class="keyword">)</span>
</pre></div></div></div>


- generate HTML5 slide

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">slidify</span><span class="keyword">(</span><span class="string">"whyslidify.Rmd"</span><span class="keyword">)</span>
</pre></div></div></div>


---
### 6. Publish

- Upload the html and relevant files.
- Let your boss or your client know the url.


---
### How to install

<div class="chunk"><div class="rcode"><div class="source"><pre class="knitr"><span class="functioncall">install.packages</span><span class="keyword">(</span><span class="string">"devtools"</span><span class="keyword">)</span>
<span class="functioncall">library</span><span class="keyword">(</span><span class="symbol">devtools</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"slidify"</span><span class="keyword">,</span> <span class="string">"ramnathv"</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"knitr"</span><span class="keyword">,</span> <span class="string">"yihui"</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"whisker"</span><span class="keyword">,</span> <span class="string">"edwindj"</span><span class="keyword">)</span>
<span class="functioncall">install_github</span><span class="keyword">(</span><span class="string">"markdown"</span><span class="keyword">,</span> <span class="string">"rstudio"</span><span class="keyword">)</span>
</pre></div></div></div>


- [Rstudio][link_rstudio] supports knitr.
- It also provides a space for publication of knitted report, [Rpubs][link_rpubs].
[link_rpubs]: http://www.rpubs.com/
[link_rstudio]: http://rstudio.org/
