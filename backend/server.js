const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})











const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))