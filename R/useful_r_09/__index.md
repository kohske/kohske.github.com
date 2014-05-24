---
title: "「ドキュメント・プレゼンテーション生成」サポートページ"
#TOC
---

---

[シリーズ Useful R](http://www.kyoritsu-pub.co.jp/series/185/) /
[共立出版サイト](http://www.kyoritsu-pub.co.jp/bookdetail/9784320123724) /
[Amazon](http://www.amazon.co.jp/dp/4320123727)

Rによるレポート生成を取り巻く環境は日々進化しています。
サポートサイトでは本書ではカバーしきれなかった点、大幅な変更点など随時お知らせします。

また質問などは takahashi.kohske@gmail.com またはTwitter [\@kohske](http://twitter.com/kohske) までお気軽にどうぞ(回答の保証はできませんが・・・)。
有益そうな質問については、ご了承頂ければFAQに掲載させてもらう予定です。

# 関連ツール更新情報

## knitr

### 新しいチャンクオプション

付録Bのリストに加えて以下のチャンクオプションが新たに追加されています。

- `collapse`: `TRUE`ならチャンクコードと評価結果を一つのブロックで出力します。([サンプルRmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.Rmd) / [サンプルmd](http://github.com/yihui/knitr-examples/blob/master/039-merge.md))

- `fig.retina`: Retinaディスプレイ用に図の大きさを調整します。例えば`fig.retina = 2`で`fig.width = 5`、`dpi = 72`なら、実際の画像の幅は`5*72*2`で720ピクセルになります。

- `strip.white`: `TRUE` (既定値)ならチャンク前後の空白行を取り除きます。

- `render`: レンダリング関数を指定します。既定値は`print`(S4オブジェクトの場合は`show`)です。

- `cache.comments`: `FALSE`ならチャンク内のコメントの更新は無視されます。

- `R.options`: チャンク内だけで有効なRのグローバルオプション(`options`)を設定します。

- `out.width.px`, `out.height.px`: 図のサイズをピクセル単位で取得します。読み取り専用です。

### その他の変更点

- 2014/5/31 開発版ではS3メソッドディスパッチによるレンダリング関数のカスタマイズが可能です。解説ページを作成する予定です。

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
