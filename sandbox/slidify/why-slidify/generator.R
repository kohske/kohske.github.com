library(knitr)
library(slidify)

# generate static html
options(markdown.HTML.options=c(markdownHTMLOptions(default=TRUE), "highlight_code"))
knit2html("whyslidify.Rmd", output = "whyslidify_static.html")

# generate HTML5 slide
opts <- slidifyOptions()
opts$copy_libraries <- TRUE
slidify("whyslidify.Rmd", options = opts)