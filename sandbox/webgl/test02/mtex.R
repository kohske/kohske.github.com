dev.off()
col1 <- c("black", "white")
col2 <- c("aquamarine4", "gold2")
r <- seq(0, 2*pi, length.out = 1000)[-1]


grid.newpage()

grid.rect(width = 0.5, gp = gpar(fill = "black", col = "black"))

pushViewport(viewport(x=0.25, y = 0.5, width = 2/5, height = 1))
grid.polygon(sin(r)/2+0.5, cos(r)/2+0.5, gp = gpar(fill = col2[1], col = col2[1]))
popViewport()

pushViewport(viewport(x=0.75, y = 0.5, width = 2/5, height = 1))
grid.polygon(sin(r)/2+0.5, cos(r)/2+0.5, gp = gpar(fill = col2[2], col = col2[2]))
popViewport()

dev.copy(png, "rs.png", width = 256, height = 256, bg = "transparent")
dev.off()