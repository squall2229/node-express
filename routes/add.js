const {Router} = require('express')
const Course = require('../models/course')
const routes = Router()

routes.get('/', (req, res) => {
  res.render('add', {
    title: "Добавить курс",
    isAdd: true
  })
})

routes.post('/', async (req, res) => {
  const course = new Course(req.body.title, req.body.price, req.body.img)

  await course.save()

  res.redirect('/courses')
})

module.exports = routes