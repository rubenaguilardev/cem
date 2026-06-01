const express = require('express')
const MongoClient = require('mongodb').MongoClient


const app = express()
const PORT = 3001
app.use(express.urlencoded({ extended: true }))

const connectionString = `mongodb+srv://@cluster0.uvc26cg.mongodb.net/`

MongoClient.connect(connectionString)
  .then(client => {
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.get('/', (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then(results => {
          console.log(results)
          res.sendFile(__dirname + '/index.html')
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  })
  .catch(error => console.error(error))


