const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuid()
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  toJSON() {
    return {
      title: this.title,
      price:this.price,
      img:this.img,
      id: this.id
    }
  }

  static async update(course) {
    const courses = await Course.getAll()
    const index = courses.findIndex(c => c.id === course.id)

    courses[index] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async getById(id) {
    const courses = await Course.getAll()

    return courses.find(course => course.id === id)
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
      path.join(__dirname, '..', 'data', 'courses.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      }
    )
    })
  }
}

module.exports = Course