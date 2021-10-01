- Connect with BD 
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, err => {
    if(err) throw err
    console.log('connected successfully!')
    })
- Ceate Error 
    app.use((err, req, res, next) => {
    if(
        err.name === 'MongoError' ||
        err.name === 'ValidationError' ||
        err.name === 'CastError'
    ){
        err.status = 422
    }
    req.status(err.status || 500).json({message: err.message || 'some error occurred!'})
    })
-----------------------------------------------------------------------------
- Prettier install 
    {
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true
    }
    "format": "prettier --write \"**/*.{js,jsx}\""
-----------------------------------------------------------------------------

