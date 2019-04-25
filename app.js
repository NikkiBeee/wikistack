const express = require("express")
const morgan = require("morgan")
const html = require("html-template-tag")
const index = require('./views/index.js')
const layout = require('./views/layout.js')
const { db } = require('./models');

const app = express()

const PORT = 3000

app.use(morgan("dev"));
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.urlencoded({ extended: false }));


// app.use('/', index)

app.get("/", (req, res) => {
  res.send(layout(''))
})

app.listen(PORT, () => {
   console.log('App listening in port')
 })

db.authenticate().
then(() => {
  console.log('connected to the database');
})
