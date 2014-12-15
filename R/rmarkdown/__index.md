---
title: "rmarkdownパッケージで楽々ドキュメント生成"
#TOC
---

# はじめに

[シリーズ Useful R 9 「ドキュメント・プレゼンテーション生成」](https://kohske.github.io/R/useful_r_09/)では、
`knitr`パッケージを使ってRマークダウンファイルをマークダウンファイルやHTMLファイルに変換する方法を解説しています。

2014年以降、RStudio開発チームは[`rmarkdown`](https://rmarkdown.rstudio.com/)という新しいマークダウン処理用の[パッケージ開発](https://github.com/rstudio/rmarkdown)を進めています。かなりガチで進めています。
ここでは`rmarkdown`パッケージの特徴や使い方を解説します。

`rmarkdown`パッケージでは`render()`という関数でドキュメントを生成します。
ですが、大雑把に言うと`render()`は`knitr::knit()`でRマークダウンからマークダウンに変換して、Pandocを使ってマークダウンをHTMLやPDFなどに変換します。ですので、実際にできることは、ピュアknitrとそう変わりはありません。

なお`knitr`パッケージの`knit2html()`は`knitr::knit()`でRマークダウンからマークダウンに変換して、`markdown::markdownToHTML()`でHTMLに変換しています。マークダウンから他のフォーマットへの変換にはPandocを利用することもできます。詳細は[解説ページ](https://kohske.github.io/R/pandoc/)を参考にして下さい。

ついでに付け加えておくと、`rmarkdown::render()`は内部で`knitr::knit()`を呼び出しているので「ドキュメント・プレゼンテーション生成」の3章で解説した`knitr`パッケージのチャンクオプションやフックなどはそのまま利用することができます。ですので、knitrユーザは簡単にrmarkdownに移行することができます。

# サンプル

とりあえずサンプルです。

- [Rマークダウンファイル](https://raw.githubusercontent.com/kohske/kohske.github.com/master/R/rmarkdown/sample/rm-sample.Rmd)

このRマークダウンファイルに対して、`render()`します。
なお、PDFで必要な[プリアンブル](https://raw.githubusercontent.com/kohske/kohske.github.com/master/R/rmarkdown/sample/preamble.tex)です。

```r
library(rmarkdown)
render("rm-sample.Rmd", "html_document") # HTMLレポート
render("rm-sample.Rmd", "pdf_document") # PDFレポート
render("rm-sample.Rmd", "word_document") # MS Wordレポート
render("rm-sample.Rmd", "revealjs_presentation", "rm-sample-reveal.html") # revealjs ウェブスライド
render("rm-sample.Rmd", "ioslides_presentation", "rm-sample-io2012.html") # io2012 ウェブスライド
render("rm-sample.Rmd", "beamer_presentation", "rm-sample-beamer.pdf") # beamer スライド
```

出力結果を置いておきます。

- [HTMLレポート](https://kohske.github.io/R/rmarkdown/sample/rm-sample.html)
- [PDFレポート](https://kohske.github.io/R/rmarkdown/sample/rm-sample.pdf) (PDF注意)
- [MS Word レポート](https://kohske.github.io/R/rmarkdown/sample/rm-sample.docx) (DOCX注意)
- [revealjs ウェブスライド](https://kohske.github.io/R/rmarkdown/sample/rm-sample-reveal.html)
- [io2012 ウェブスライド](https://kohske.github.io/R/rmarkdown/sample/rm-sample-io2012.html)
- [Beamer スライド](https://kohske.github.io/R/rmarkdown/sample/rm-sample-beamer.pdf) (PDF注意)

ここでは一つの、そして唯一のRマークダウンファイルから全てのフォーマットを生成してるので、デザインとかはあまり気にしてません。
例えばセクションヘッダはレベル2(`## ...`)にしてますが(ウェブスライドのため)、PDFの場合はレベル1(`# ...`)の方が良いでしょう。
通常はいずれかのフォーマットを選択すると思いますので、そのフォーマットに合わせて下さい。

それと、BeamerとPDFレポートの両方に出力するため、YAMLフロントマターのdocumentclassの指定をややこしい方法で行っています。
PDFレポートだけならトップレベルに`documentclass: ltjarticle`で大丈夫です。

# rmarkdownパッケージのインストール

- [RStudio Preview Release](http://www.rstudio.com/ide/download/preview)をインストールするとついてきます。Pandocもついてきます。
- パッケージのみをインストールするには、
```r
install.packages("devtools")
devtools::install_github("rstudio/rmarkdown")
```
とします。[Pandocのインストール](https://github.com/rstudio/rmarkdown/blob/master/PANDOC.md)も必要です。


# rmarkdownの特徴

- マークダウンファイルを(Pandocの力で)様々なフォーマットに変換できます。
    - 現在のところ、公式にはHTML, PDF, MS Word, Beamer, ioslides, reveal.jsに変換できます。
- 表や文献情報をサポートする拡張マークダウン記法
- フックによるHTMLやPDF出力のカスタマイズ
    - CSSやヘッダ、フッタなどを指定できます。
- PDF出力用にマークダウンの中にLaTeXを入れちゃうことができます。
- RスクリプトからもHTML、PDF、MS Wordなどのフォーマットのドキュメントを生成できます(ﾒﾁｬｸﾁｬﾍﾞﾝﾘﾀﾞﾖｰ)。
- 拡張性があります。独自のテンプレートを利用したり、新しい出力フォーマットを定義したりできちゃいます。
- Rマークダウンの中に[Shiny](http://rmarkdown.rstudio.com/authoring_shiny.html)を入れちゃうことができます。

などなどです。

# rmarkdownの使い方

Rマークダウンファイル(.Rmd)またはRスクリプトファイル(.R)を用意して、

```r
library(rmarkdown)
render("path-to.Rmd")
```

以上。

RStudioの場合、エディタパネルの上に[Knit HTML]というボタンがあるので、これをクリックします。以上。

# YAMLによるメタデータ指定

rmarkdownの特徴として、Rマークダウンファイルの中で[YAML(ヤムル)](http://ja.wikipedia.org/wiki/YAML)によりドキュメント生成のためのメタデータを仕込めることが挙げられます。以下の様な感じです。

```
---
title: "Sample Document"
output:
  html_document:
    toc: true
    theme: united
  pdf_document:
    toc: true
    highlight: zenburn	
---
```

YAMLでは、インデントが超重要です。そう、パイソンみたいにね。

上の例では、タイトルと出力フォーマットを指定しています。

出力フォーマットは`html_document`と`pdf_document`の2種類指定していて、それぞれのフォーマット用に更にオプションが指定されています。
例えば`toc: true`は目次を自動的に生成する、ということです。

タイトルや著者(`author`)などは、出力フォーマットによって使われたり使われなかったりします。
例えばPDF出力の時の\\maketitleに使われたりします。ココらへんは、まあ適当に試してみてください。

# render()の解説

`render()`の定義を見てみます。

```r
render(input, output_format = NULL, output_file = NULL, output_dir = NULL, output_options = NULL,
  intermediates_dir = NULL,    runtime = c("auto", "static", "shiny"), clean = TRUE, envir = parent.frame(),
  quiet = FALSE, encoding = getOption("encoding"))
```

とりあえず重要なのは、`input`と`output_format`です。

## 入力フォーマット

`input`には処理するマークダウンファイル(.md)、Rマークダウンファイル(.Rmd)またはRスクリプト(.R)のファイル名を与えます。

- マークダウンが与えられた場合には`knit()`による処理は行われず、単純にPandocにより出力フォーマットに変換されます。
    - .md - (Pandoc) - HTML/PDF/etc.
- Rマークダウンが与えられた場合には、`knit()`によりRコードチャンクが評価されて、マークダウンに変換されて、Pandocにより出力フォーマットに変換されます。
    - .Rmd - (knitr::knit()) - .md - (Pandoc) - HTML/PDF/etc.
- Rスクリプトの場合には、最初に`spin()`でRからRmdへ変換されます。その後に`knit()`による処理とPandocによる変換が行われます。
    - .R - (knitr::spin()) - .Rmd - (knitr::knit()) - .md - (Pandoc) - HTML/PDF/etc.

入力ファイルのフォーマット問わず、とりあえず`render()`すれば上手くやってくれるということです。

## 出力フォーマット

`output_format`では出力フォーマットを指定します。

- `"all"`を指定すると、入力ファイルのYAMLで定義されたフォーマット(`output:`の中の項目)が全て出力されます。
- フォーマット名を文字列(例えば`"html_document"`など。ベクトル指定可)で指定すると、入力ファイルのYAML中の該当するフォーマット(`output:`の中の項目)が出力されます。
- フォーマットオブジェクト(例えば`html_document()`)で指定すると、そのフォーマットが出力されます。
- `NULL`の場合は、入力ファイルのYAML中の最初のフォーマットが出力されます。入力ファイルの中で指定がなければHTMLが出力されます。

### rmarkdownの組み込み出力フォーマット

rmarkdownパッケージでは出力フォーマットを独自に作成することもできてしまうんですが、ここでは既定の組み込みフォーマットを紹介します。通常はこれで事足りるでしょう。

|フォーマット|説明|
|------------|---|
|html_document|みんな大好きHTML出力です。|
|pdf_document|LaTeXer大好きPDF出力です。|
|beamer_presentation|LaTeXer大好き[Beamer](http://ja.wikipedia.org/wiki/Beamer)です。|
|revealjs_presentation|[revealjs](http://lab.hakim.se/reveal-js/)というウェブスライドに出力します。|
|ioslides_presentation|Googleの[I/O 2014スライド](http://code.google.com/p/io-2012-slides/)というウェブスライドに出力します。|
|md_document|色々な種類の拡張マークダウンへの出力を行います。|
|word_document|なんと!!MS Word出力です(.docx)。|

例えば`html_document(toc = TRUE, theme = "journal")`などとしてフォーマットオブジェクトを作成して`render()`関数に渡します。

```r
render("path-to.Rmd", html_document(toc = TRUE, theme = "journal"))

```

という感じです。有効なオプションはそれぞれ`?html_document`、`?pdf_document`などとして確認して下さい。

なお、以下のようにRマークダウンのYAMLフロントマターで出力フォーマットやそのオプションを指定することもできます。

```
---
output:
  html_document:
    toc: true
    theme: journal
---
```

## render()の引数

`render()`の引数のリストです。

|引数名|意味|
|------|---------|
|input|入力ファイル名(説明済み)|
|output_format|出力フォーマット(説明済み)|
|output_options|出力オプションをリストで指定します。YAMLメタデータのオプションを上書きします。この引数ではYAMLでの指定を上書きしますが、`output_format`引数で渡された出力フォーマットオブジェクトのオプションは変更しません。|
|output_file|出力ファイル名。`NULL`なら入力ファイル名ベースで自動的につけられます。|
|output_dir|出力フォルダ。`NULL`なら入力ファイルのフォルダに出力ファイルが作成されます。|
|intermediates_dir|中間ファイルのフォルダ。|
|runtime|出力ファイルの再生環境。`static`は通常の状況。`shiny`はShiny用にレンダリングを行います。既定値(`auto`)ならYAMLで指定された再生環境になります。指定がなければ`static`です。|
|clean|`TRUE`なら中間ファイルを削除します。|
|envir|`knit()`でコードを評価する環境。|
|quiet|`TRUE`ならPandocコマンドを表示しません。|
|encoding|入力ファイルのエンコード。|

# rmarkdown用のRマークダウンの書き方

YAMLフロントマターの件以外は、従来のknitrの場合と同じです。「ドキュメント・プレゼンテーション生成」を参考にして下さい(#ｽﾃﾏ)。

# rmarkdown用のRスクリプトの書き方

rmarkdownパッケージではRスクリプト(.R)からドキュメントを生成できます。
rmarkdown的には「ノートブック」と呼んでいますが、これがメチャクチャ便利なんですよ。特に軽量の分析レポートには最適です。

従来のknitrでは`spin()`で同じ処理が可能でした(「ドキュメント・プレゼンテーション生成」2章)。
rmarkdownでも内部的には`spin()`でRスクリプトからRマークダウンに変換する前処理を入れているだけなので、やってることは一緒です。

Rスクリプトの書き方は以下を参考にして下さい。
`#' `で始まる行はRマークダウンファイルでのテキスト行に読み替えられます。
`#+ `で始まる行はRマークダウンファイルでのチャンクヘッダに読み替えられます。

```
#' ---
#' title: "Sample Document"
#' documentclass: ltjarticle
#' output:
#'   html_document:
#'     toc: true
#'     theme: united
#'   pdf_document:
#'     toc: true
#'     highlight: zenburn
#'     latex_engine: lualatex
#' ---

#' # carsのプロット
#'
#' carsをプロットします。

#+ echo = FALSE
# 通常のコメントはコメントとして解釈されます。
plot(cars)

#' # インラインコードの書き方です。
#' carsのサイズは
{{dim(cars)}}
#' です。
```

これを`render()`に食わせます。

```r
render("path-to.R", "all")
```

これで、HTMLレポートとPDFレポートが作成されます。
なお日本語混じりのレポートのためYAMLフロントマターで`documentclass: ltjarticle`と`latex_engine: lualatex`を指定しています。

RStuidoではRスクリプト編集中に[Compile Notebook]というアイコンをクリックするとHTML形式のノートブックが作成されます。

# Windowsで日本語

これから試します。試した人は情報下さい。

# 更新履歴

- 2014/6/4 サンプルを追加。
- 2014/6/4 `word_document()`を忘れていたので追加。
- 2014/6/3 作成しました。

# さいごに

Enjoy!!
