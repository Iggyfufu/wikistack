const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRoutes = require('./routes/wiki')
const userRoutes = require('./routes/user')
const morgan = require('morgan');

models.db.authenticate().then(() =>{
  console.log('Connented Wow Doge!');
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static('./public'))
app.use('/wiki', wikiRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})



const init = async () => {
  await models.db.sync({ force: true })
  app.listen(3000)
}

init();
