library(rgl)

pie3d <- function(x, depth = 0.2, webgl = TRUE) {
  x  = cumsum(x)/sum(x)
  ps = embed(c(0, 2*pi*x), 2)
  
  for (i in 1:nrow(ps)) {
    p = seq(ps[i, 2], ps[i, 1], by = 2*pi/360) 
    
    rgl.triangles(rep(c(t(cbind(embed(sin(p), 2), 0))), 2),
                  rep(c(t(cbind(embed(cos(p), 2), 0))), 2),
                  rep(c(-depth, depth), each = (length(p)-1)*3),
                  col = i)
    
    rgl.quads(sin(c(t(cbind(embed(p, 2), embed(p, 2))[, c(1, 2, 4, 3)]))),
              cos(c(t(cbind(embed(p, 2), embed(p, 2))[, c(1, 2, 4, 3)]))),
              rep(c(-depth, depth), each = 2, length = (length(p)-1)*4),
              col = i)            
  }
  
  if(webgl) {
    browseURL(writeWebGL("."))
  }
}

pie3d(1:5)