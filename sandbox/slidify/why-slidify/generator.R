library(knitr)
library(slidify)

# generate static html
knit2html("whyslidify.Rmd", output = "whyslidify_static.html")

# generate HTML5 slide
slidify("whyslidify.Rmd")