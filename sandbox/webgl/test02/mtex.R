library(grid)

dev.off()
col1 <- c("black", "white")
col2 <- c("aquamarine4", "gold2")
x <- col2rgb(col2[1])/255; ca1 <- rgb(x[1], x[2], x[3], 0.3)
x <- col2rgb(col2[2])/255; ca2 <- rgb(x[1], x[2], x[3], 0.3)

col2a <- c(ca1, ca2)


grid.newpage()

grid.rect(width = 0.5, gp = gpar(fill = "black", col = "black"))

pushViewport(viewport(x=1/8, y = 0.5, width = 1/4, height = 1))
grid.rect(gp = gpar(fill = col2a[1], col = col2a[1]))
popViewport()

pushViewport(viewport(x=0.25, y = 0.5, width = 2/5, height = 1))
grid.polygon(sin(r)/2+0.5, cos(r)/2+0.5, gp = gpar(fill = col2[1], col = col2[1]))
popViewport()

pushViewport(viewport(x=7/8, y = 0.5, width = 1/4, height = 1))
grid.rect(gp = gpar(fill = col2a[2], col = col2a[2]))
popViewport()

pushViewport(viewport(x=0.75, y = 0.5, width = 2/5, height = 1))
grid.polygon(sin(r)/2+0.5, cos(r)/2+0.5, gp = gpar(fill = col2[2], col = col2[2]))
popViewport()

dev.copy(png, "rs.png", width = 512, height = 512, bg = "transparent")
dev.off()