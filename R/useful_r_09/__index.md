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

また質問などは takahashi.kohske@gmail.com またはTwitter [\@kohske](http://twitter.com/kohske) までお気軽にどうぞ(回答の保証はできませんが・・・)。
有益そうな質問については、ご了承頂ければFAQに掲載させてもらう予定です。

# 関連ツール更新情報

## knitr

2014年5月25日にknitr 1.6がCRAN上でリリースされました。Windows上で日本語が使いやすくなっています。
本書では公式1.5ではなくリリース前の1.6開発版をターゲットにしていたので、多くの機能については本書中で解説しています。
ここではその他の新機能を挙げておきます。

### 新しいチャンクオプション

付録Bのリストに加えて以下のチャンクオプションが新たに追加されています。

- `collapse`: `TRUE`ならチャンクコードと評価結果を一つのブロックで出力します。([サンプルRmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.Rmd) / [サンプルmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.md))

- `fig.retina`: Retinaディスプレイ用に図の大きさを調整します。例えば`fig.retina = 2`で`fig.width = 5`、`dpi = 72`なら、実際の画像の幅は`5*72*2`で720ピクセルになります。

- `strip.white`: `TRUE` (既定値)ならチャンク前後の空白行を取り除きます。

- `render`: レンダリング関数を指定します([解説ページ](http://rpubs.com/kohske/18343))。既定値は`print`(S4オブジェクトの場合は`show`)です。

- `cache.comments`: `FALSE`ならチャンク内のコメントの更新は無視されます。

- `R.options`: チャンク内だけで有効なRのグローバルオプション(`options`)を設定します。

- `out.width.px`, `out.height.px`: 図のサイズをピクセル単位で取得します。読み取り専用です。

### その他の変更点

- S3メソッドディスパッチによるレンダリング関数のカスタマイズが可能です([解説ページ](http://rpubs.com/kohske/18343))。

## Rstudio

- 2014/5/31 [プレビュー版](http://www.rstudio.com/ide/download/preview)ではレポート作成機能が大幅に向上しています。解説ページを作成する予定です。
    - ドキュメント変換に`rmarkdown`パッケージを採用
    - レポート生成バックエンドにPandoc採用
    - YAMLによるメタデータ指定
	- MS Word DOCX形式への変換

## rmarkdown

- Rstudioのプレビューバージョンでドキュメント変換のバックエンドに採用されています。`rmarkdown`パッケージについては解説ページを作成する予定です。

## shiny

## rCharts

## slidify

# FAQ

随時追加予定です。質問等は takahashi.kohske@gmail.com またはTwitter [\@kohske](http://twitter.com/kohske) までお気軽に。

# 関連リンク

- rChartsの利用例（5章）
    - [Polychart](http://rpubs.com/kohske/12331)
    - [morris.js](http://rpubs.com/kohske/12406)
    - [NVD3](http://rpubs.com/kohske/12408)
    - [Highcharts](http://rpubs.com/kohske/12409)
	
- [Pandocの利用例（4章）](http://kohske.github.io/R/pandoc/)
    - `rmarkdown`パッケージを使うと、より簡単にPandocを利用できます。解説ページを作成する予定です。

- [著者のRpubs集](http://rpubs.com/kohske)

- stackoverflow
    - [knitrタグ](http://stackoverflow.com/questions/tagged/knitr)
    - [rstudioタグ](http://stackoverflow.com/questions/tagged/rstudio)
    - [shinyタグ](http://stackoverflow.com/questions/tagged/shiny)
    - [rchartsタグ](http://stackoverflow.com/questions/tagged/rcharts)
    - [slidifyタグ](http://stackoverflow.com/questions/tagged/slidify)

# 正誤表

随時追加予定です。

# サンプルプログラム

[sample.zip (@x MB)]()

書籍中のRマークアップファイルなどが含まれています。
