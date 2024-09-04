




app.use("/api", routes)

if (process.env.NODE_ENV === 'production') {
    // all static files (css, images, etc)
    app.use(express.static(path.join(__dirname, "..", 'client/build')));
  
    // all page requests
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve( __dirname, "..", 'client/build/index.html'))
    })
}