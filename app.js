const express = require("express")
const morgan = require("morgan")
const html = require("html-template-tag")
const index = require('./views/index.js')
const layout = require('./views/layout.js')
const models = require('./models');
const app = express()
const PORT = 3000
const init = async () => {
  await models.db.sync({force: true})
  app.listen(PORT, () => {
    console.log('App listening in port')
  })
}

app.use(morgan("dev"));
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send(layout(''))
})

init();


// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

// console.log("PAGEEEEEEE HEREEEEEEE", Page)
// console.log("USSSSSERRRRRR HEREEEEEEE", User)
