---
title: "「ドキュメント・プレゼンテーション生成」サポートページ"
#TOC
---

# はじめに

シリーズ Useful R 9 「ドキュメント・プレゼンテーション生成」(共立出版）のサポートページです。

[シリーズ Useful R](http://www.kyoritsu-pub.co.jp/series/185/) /
[共立出版サイト](http://www.kyoritsu-pub.co.jp/bookdetail/9784320123724) /
[Amazon](http://www.amazon.co.jp/dp/4320123727)

>データの分析に携わる全ての人にとって、分析結果を他人に見せるためのレポート（ドキュメントやプレゼンテーション）の作成は悩みの種です。
>レポート作成時のコピペ作業に辟易としている人も多いでしょう。
>
> 本書はRにより「素早く、簡単に、間違いのない」レポートを作成するノウハウが満載の書籍です。
>
>現在Rではknitrを中心にドキュメントやプレゼンテーションを作成するツールが急速に整備されつつあります。
>knitrはRによる分析結果を使って自動的にレポートを生成するためツールです。
>本書によりknitrの基本的な使い方とカスタマイズ方法を習得し、Rを使って効率的にレポートを作成できるようになります。
>
>この他に、ウェブスライドやJavaScript可視化ライブラリなどをRから利用するためのウェブビジュアライゼーション技術（googleVis・rCharts・slidify）、インタラクティブなレポートを作成できるウェブアプリケーション（shiny）、各種プレゼンテーション手法（3次元グラフ、アニメーション、表）、Rstudioを使ったレポート生成など、Rによるレポートの作成に関わる周辺技術の解説もあわせて掲載しています。
>これらの周辺技術を学ぶことで、Rを使ってインパクトのあるレポートを作成することができるようになります。

Rによるレポート生成を取り巻く環境は日々進化しています。サポートサイトでは本書ではカバーしきれなかった点、大幅な変更点など随時お知らせします。

また質問などは [コメント欄](#コメント欄)、takahashi.kohske@gmail.com までメール、またはTwitter [\@kohske](http://twitter.com/kohske) までお気軽にどうぞ(回答の保証はできませんが・・・)。
有益そうな質問については、ご了承頂ければFAQに掲載させてもらう予定です。

# 重要なお知らせ

- 2014/9/5現在、windowsで`knit2html()`を使った時に、含まれる日本語文字によっては上手く動作しません(Thanks to @habari2011dunia 様)。この問題を回避するには、本書4.5節「Pandocによるレポートフォーマットの変換」で紹介している方法を用いるか、`rmarkdown`パッケージ([解説ページ](../rmarkdown/index.html))を用いて下さい。
- 2014/9/6 上記問題は解決されました。最新版の`markdown`パッケージをgithubからインストールして下さい。
```
install.packages("devtools") # 必要なら
devtools::install_github("rstudio/markdown")
```

# 更新履歴

- 2015/4/26 knitrの更新情報を追加しました。
- 2015/2/6 shinyの更新情報を追加しました。
- 2015/2/6 knitrの更新情報を追加しました。
- 2014/11/15 knitrの更新情報を追加しました。
- 2014/10/13 knitrの更新情報を追加しました。
- 2014/10/5 knitrの更新情報を追加しました。
- 2014/10/5 shinyの更新情報を追加しました。
- 2014/9/5 shinyの更新情報を追加しました。
- 2014/9/5 knitrの更新情報を追加しました。
- 2014/6/30 正誤表を更新しました。
- 2014/6/22 [コメント欄](#コメント欄)を追加しました。
- 2014/6/19 Rstudioの更新情報を追加しました。
- 2014/6/18 shinyの更新情報を追加しました。
- 2014/6/13 rChartsとslidifyの更新情報を追加しました。
- 2014/6/3 rmarkdownパッケージの解説を追加しました。
- 2014/5/28 サンプルサイトを作成しました。
- 2014/5/24 knitrバージョン1.6がリリースされました。

# 関連ツール更新情報

## knitr

### Ver. 1.10

2015年4月6日にknitr 1.10がCRAN上でリリースされました。主な変更点は次の通りです。

- チャンクオプション`cache.rebuild`が追加されました。`TRUE`にするとキャッシュを破棄してコードを再評価します。
- `stata`言語エンジン、`lein`言語エンジン（Clojure用)が追加されました。`sas`言語エンジンが改善されました。
- `kable`によるマークダウンテーブル生成でワイドキャラクタを上手く扱えるようになりました。[Hiroaki Yutaniさん](http://github.com/yutannihilation) ([\@yutannihilation](https://twitter.com/yutannihilation))によるバグ報告及びパッチのお陰です。ｸﾞｯｼﾞｮﾌﾞ!!
- 言語エンジンの指定が`` ```{python, option=value}``の形式を受け付けるようになりました。
- `all_labels()`関数に引数`...`が追加されました。チャンクオプションによってラベルをフィルタできます。例えば`all_labels(engine == 'Rcpp')`とすれば、`engine = 'Rcpp'`のチャンクラベルを返します。
- `knit_params()`関数が追加されました。YAMLメタデータの情報を取得できます。
- マークダウンの引用ブロックの中でコードチャンクを記述できるようになりました。
- パッケージオプション`options(knitr.duplicate.label = 'allow')`でチャンクラベルの重複がOKになります。ラベルが重複してる場合、`foo-2`みたいな感じでsuffixがつけられます。

### Ver. 1.9

2015年1月20日にknitr 1.9がCRAN上でリリースされました。主な変更点は次の通りです。

- `load_cache()`関数が追加されました。後ろの方のチャンクの内容を先頭の方（アブストラクトとか）で参照したい時などに使うことができます。
- `clean_cache()`関数が追加されました。
- Stan用の言語エンジン`stan`が追加されました。
- `tikz`エンジン用の`convert`関数のパスを指定するためのチャンクオプション`engine.opts`が追加されました。また`engine.opts`で`convert`用のオプションを渡せるようになりました。
- `dev = 'png'`の時はプロットの記録に`grDevices::png()`を使うようになりました。

### Ver. 1.8

2014年11月11日にknitr 1.8がCRAN上でリリースされました。主な変更点は次の通りです。

- `fig_chunk()`関数が追加されました。`fig_chunk(チャンクラベル, 拡張子, 番号)`とすることでチャンクで出力される図のファイル名を得ることができます。ドキュメント内で図を参照したい場合、`\includegraphics{\Sexpr{fig_chunk('foo', 'pdf')}}`などとします。
- `kable()`に`escape`引数が追加されました。TRUEとすると特殊な文字をエスケープします。
- `knit_filter()`関数が追加されました。`utils::aspel`と組み合わせることでスペルチェックを行うことができます。使用例は`?knit_filter`を参照して下さい。
- `spin_child()`関数が追加されました。ドキュメント内に別のRスクリプトの処理結果を埋め込むために使うことができます。
- `inline_expr()`関数が追加されました。ドキュメント内にインラインコード例を記述したい場合、``` `` `r knitr::inline_expr('1+1')` `` ```とすると、`` `r 1+1` ``と出力されます。面倒ですね。
- `kable()`に`table.envir`引数が追加されました。LaTeX出力でテーブルの環境を指定できます。
- `stitch()`用のスクリプトで`# ---- label, options ---- `という形式のチャンクヘッダがサポートされてます。
- [Groovy](http://groovy.codehaus.org/Japanese+Home)用の言語エンジン`groovy`が追加されました。



### Ver. 1.7

2014年10月13日にknitr 1.7がCRAN上でリリースされました。主な変更点は次の通りです。

- `kable()`に`col.names`オプションが追加されました。列の名前を指定できます。
- アウトプットフック`text`が追加されました。テキストチャンク（コードチャンク以外の部分）に対して適用されます。
- チャンクオプション `fig.showtext`: `TRUE`に設定すると`showtext`パッケージを使うことができます。
- パッケージオプション `global.par`: `opts_knit$set(global.par = TRUE)`とすると、`par()`によるオプション設定が次のチャンクでも有効になります。
- Node.js用の言語エンジン`node`が追加されました。
- `knit()`によりRの既定の`option(digits)`が7から4に変更されなくなりました。
- プロット画像ファイルの番号付けの方法が変更されました。チャンク名`foo`に対して、`foo-1`、`foo-2`、...というファイル名になります。
- `fig.show='animate'`でビデオ出力する場合の既定のフォーマットがOGGからWebMに変更されました。
- エラーと警告が発生した部分のコードが表示されるようになっているはずです。

### Ver. 1.6

2014年5月25日にknitr 1.6がCRAN上でリリースされました。Windows上で日本語が使いやすくなっています。
本書では公式1.5ではなくリリース前の1.6開発版をターゲットにしていたので、多くの機能については本書中で解説しています。
ここではその他の新機能を挙げておきます。

#### 新しいチャンクオプション

付録Bのリストに加えて以下のチャンクオプションが新たに追加されています。

- `collapse`: `TRUE`ならチャンクコードと評価結果を一つのブロックで出力します。([サンプルRmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.Rmd) / [サンプルmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.md))

- `fig.retina`: Retinaディスプレイ用に図の大きさを調整します。例えば`fig.retina = 2`で`fig.width = 5`、`dpi = 72`なら、実際の画像の幅は`5*72*2`で720ピクセルになります。

- `strip.white`: `TRUE` (既定値)ならチャンク前後の空白行を取り除きます。

- `render`: レンダリング関数を指定します([解説ページ](http://rpubs.com/kohske/18343))。既定値は`print`(S4オブジェクトの場合は`show`)です。

- `cache.comments`: `FALSE`ならチャンク内のコメントの更新は無視されます。

- `R.options`: チャンク内だけで有効なRのグローバルオプション(`options`)を設定します。

- `out.width.px`, `out.height.px`: 図のサイズをピクセル単位で取得します。読み取り専用です。

#### その他の変更点

- S3メソッドディスパッチによるレンダリング関数のカスタマイズが可能になっています([解説ページ](http://rpubs.com/kohske/18343))。

## Rstudio

2014年6月19日にRstudio 0.98.932が公式リリースされました。レポート作成機能が大幅に向上しています。詳細は[解説ページ](../rstudio/index.html)をご覧ください。

- ドキュメント変換に`rmarkdown`パッケージを採用
- レポート生成バックエンドにPandoc採用
- YAMLによるメタデータ指定
- MS Word DOCX形式への変換

## rmarkdown

- 最新のRstudioでドキュメント変換のバックエンドに採用されています。`rmarkdown`パッケージについては[解説ページ](../rmarkdown/index.html)を参考にして下さい。

## shiny

### Ver. 0.11

2015年1月17日にshiny 0.11がCRAN上でリリースされました。主要は変更点は次の通りです。

- スライダーが jquery-slider から ion.rangeSlider に変更になりました。キーボードでも操作できます。
- CSSフレームワークが Bootstrap 2 から Bootstrap 3 に変更になりました。Bootstrap 2 が必要な場合は`shinybootstrap2`パッケージを使って下さい。
- UIで`body`タグがサポートされました。
- `observeEvent`と`eventReactive`が追加されました。`actionButton`の扱いが簡単になっています。
- `shiny.observer.error`オプションで、reactive中のエラーの処理を指定できるようになりました。
- `renderDataTable()`関数に`escape`引数が追加されました。HTMLエンティティがエスケープされます。
- `passwordInput()`が追加されて、パスワード入力が可能になりました。

### Ver. 0.10.2

2014年10月1日にshiny 0.10.2がCRAN上でリリースされました。主要は変更点は次の通りです。

- 動作保証はR 3.0.0以上となりました。
- `server.R`、`ui.R`の中身を`app.R`というひとつのファイルにまとめられるようになりました。
- `DataTables`のバージョンが1.10.2に上がっているので、既存のオプション設定が正しく動作しないかもしれません。
- ファイルアップロードのための`fileInput()`がIE8およびIE9で動作するようになりました。複数ファイルのアップロードは一部ブラウザでは利用できません。
- プログレスバーを表示するための`Progress`と`withProgress`が追加されました。[サンプル](http://shiny.rstudio.com/gallery/progress-example.html)

### Ver. 0.10.1

2014年7月26日にshiny 0.10.1がCRAN上でリリースされました。主要は変更点は次の通りです。

- WindowsでUNICODEがサポートされました。これにより、Windows上で日本語でshinyを使えるようになります。Congratulation!! 利用の際は、`server.R`、`ui.R`ともUTF-8で保存します。
- `textOutput()`, `imageOutput()`, `plotOutput()`, `htmlOutput()`に引数`inline`が追加されました。`TRUE`にすると、これらの要素がインライン要素(`<span></span>`)として出力されます。http://shiny.rstudio.com/gallery/inline-output.html にサンプルがあります。
- 入力ポイント`select`と`selectize`で選択肢のグループ化が可能になりました。利用するには`choices`にリストのリストを渡します。http://shiny.rstudio.com/gallery/option-groups-for-selectize-input.html にサンプルがあります。

### Ver. 0.10.0

2014年6月14日にshiny 0.10.0がCRAN上でリリースされました。主要は変更点は次の通りです。

- R markdown V2で作成するドキュメントにshinyアプリケーションを埋め込めるようになりました。最新のRstudioを使うと簡単に試すことができます。詳細は[rmarkdownのウェブサイト](http://rmarkdown.rstudio.com/authoring_shiny.html)、及び[解説ページ](../rstudio/index.html)を参考にして下さい。
- `shinyApp()`関数によりshinyAppオブジェクトを作成できます。`shinyApp()`にはUIとサーバ関数を渡します。shinyAppオブジェクトを評価するとアプリケーションが起動します。詳細は`?shinyApp`でオンラインヘルプの例を見てください。
- UI用のレイアウト関数が追加されています。
    - `flowLayout`: 子要素を左から右、上から下に配置します。
    - `splitLayout`: 子要素を等間隔に水平に配置します。`cellWidths`引数で列幅を指定することもできます。
    - `inputPanel`: `flowLayout`と同じですが、領域全体の背景がグレイになります。
- サーバ側での絞り込み検索を行う`updateSelectizeInput()`関数が追加されました。詳細は[shinyのサイト](http://shiny.rstudio.com/articles/selectize.html)を参考にして下さい。
- `actionLink`という新しい入力ポイントが追加されました。`actionButton`と同じ動作ですが、通常のリンク付きテキストとして表示されます。

## rCharts

- exampleが公式のデモとして追加されました。
```
demo(package="rCharts")
```
とすると利用できるデモ一覧が表示されます。
デモを表示するには、
```
demo(highcharts)
```
などとします。  
(2014/6/13)

## slidify

- 試験的に`encoding`オプションがサポートされました。Windows環境で日本語を利用できるようになります。`fix-encode`ブランチで実装されているので、以下のようにして試してみてください。
```
devtools::install_github("ramnathv/slidify@fix-encode")
library(slidify)
# 例
slidify('index-CP932.Rmd', encoding='CP932') # SJISエンコードの場合
slidify('index-UTF8.Rmd', encoding='UTF8') # UTF8の場合
```
(2014/6/13)

# FAQ

随時追加予定です。質問等は takahashi.kohske@gmail.com またはTwitter [\@kohske](http://twitter.com/kohske) までお気軽に。

# 関連リンク

## Pandocの利用例（4章）

- `knitr`とPandocを利用したドキュメント作成例です([サンプルサイト](http://kohske.github.io/R/pandoc/))。
- `rmarkdown`パッケージを使うと、より簡単にPandocを利用できます。`rmarkdown`パッケージについては[解説ページ](../rmarkdown/index.html)を参考にして下さい。

## rChartsの解説と利用例（5章）

rChartsの解説と利用例をRpubsに掲載しています。

- [Polychart](http://rpubs.com/kohske/12331)
- [morris.js](http://rpubs.com/kohske/12406)
- [NVD3](http://rpubs.com/kohske/12408)
- [Highcharts](http://rpubs.com/kohske/12409)
	
## stackoverflow

stackoverflowは技術系QアンドAサイトです。英語ですが有益な情報が豊富です。

- [knitrタグ](http://stackoverflow.com/questions/tagged/knitr)
- [rstudioタグ](http://stackoverflow.com/questions/tagged/rstudio)
- [shinyタグ](http://stackoverflow.com/questions/tagged/shiny)
- [rchartsタグ](http://stackoverflow.com/questions/tagged/rcharts)
- [slidifyタグ](http://stackoverflow.com/questions/tagged/slidify)

## [著者のRpubs集](http://rpubs.com/kohske)

玉石混淆

# 正誤表

随時追加予定です。

## 第6章
- [2014/6/30] p.120のコード例(`norm-dist.Rmd`)内、scianimatorライブラリへのリンクが無効になっています。以下のリンクに書き換えて試して下さい (Thanks to 石田様)。
```
options(markdown.HTML.header=
  '<link rel="stylesheet" href="https://rawgithub.com/brentertz/scianimator/master/assets/css/scianimator.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script src="https://rawgithub.com/brentertz/scianimator/master/assets/js/jquery.scianimator.min.js"></script>'
)
```

# サンプルプログラム

本書で扱ったRマークダウンファイルやRスクリプトなどです。

[githubリポジトリ](http://github.com/kohske/Useful_R_09_sample) / [zipファイルダウンロード](https://github.com/kohske/Useful_R_09_sample/archive/master.zip)

# さいごに

Enjoy!!

# コメント欄

質問など、ご自由にどうぞ。

<div id="disqus_thread"></div>
<script type="text/javascript">
    var disqus_shortname = 'kohske-useful-r-09-support'; // Required - Replace <example> with your forum shortname
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>
