
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

function slugGenerator(str){
  if (str === undefined){
      str = ''
     let characters = 'abcdefghijklmnopqrstuvwxyz123456789'
     for (let i = 0; i < 11; i++){
       str += characters.charAt(Math.floor(Math.random()*characters.length))
     }
  } else {
    str = str.replace(/\s+/g, '_').replace(/\W/g, '');
    }
  return str
}

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = slugGenerator(pageInstance.title)
})

module.exports = { db, Page, User };

