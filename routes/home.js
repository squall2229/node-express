const {Router} = require('express')
const routes = Router()

routes.get('/', (req, res) => {
  res.render('index', {
    title: "Главная",
    isHome: true
  })
})

module.exports = routes