const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRoutes = require('./routes/wiki')
const userRoutes = require('./routes/user')
const morgan = require('morgan');
const { Page } = require('./models');
const { main } = require('./views')

models.db.authenticate().then(() =>{
  console.log('Connented Wow Doge!');
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/wiki', wikiRoutes)
app.use('/users', userRoutes)

app.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll()
    res.send(main(allPages))
  } catch(err) { next(err) }
})



const init = async () => {
  await models.db.sync()
  app.listen(3000)
}

init();
