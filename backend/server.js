const express = require('express')
const MongoClient = require('mongodb').MongoClient


const app = express()

const connectionString = `mongodb+srv://user:password@cluster0.uvc26cg.mongodb.net/`

MongoClient.connect(connectionString)
  .then(console.log('Connected to Database'))
  .catch(err => console.err(err))


app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
})










const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))