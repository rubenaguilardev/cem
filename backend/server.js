const express = require('express')
const MongoClient = require('mongodb').MongoClient


const app = express()
const PORT = 3001
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

const connectionString = `mongodb+srv://yoda:andorbeast@cluster0.uvc26cg.mongodb.net/`

MongoClient.connect(connectionString)
  .then(client => {
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.get('/', (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
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

    app.put('/quotes', (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          {
            name: 'Yoda',
          },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote
            }
          },
          {
            upsert: true
          }
        )
        .then(result => {
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted Darth Vader's quote`)
        })
        .catch(error => console.error(error))
    })

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  })
  .catch(error => console.error(error))


