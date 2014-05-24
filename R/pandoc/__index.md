# knitrとpandocでレポートの作成

- [入力元のRマークダウンファイル](https://raw.github.com/kohske/kohske.github.com/master/R/pandoc/pandoc-md.Rmd)
- [`knit()`して生成されたマークダウンファイル(pandoc-md.md)](https://raw.github.com/kohske/kohske.github.com/master/R/pandoc/pandoc-md.md)

## 出来上がったレポート

同じRマークダウンファイルから3種類のフォーマットのレポートを作成しています。
作成方法の説明もレポートの中にあります。

なお、デザインをスライド用に作ってないので、HTML5スライドとPDFスライドでは、はみ出てます。

- [HTMLファイル](pandoc-md.html)
    - [CSSファイル(github.css)](github.css)
- [PDFファイル(PDF注意)](pandoc-md.pdf)
    - [追加プリアンブル(preamble.tex)](preamble.tex)
- [docxファイル](docx.html)
- [HTML5 スライド (slidy)](pandoc-slidy.html)
- [PDFスライド (beamer) (PDF注意)](pandoc-beamer.pdf)




