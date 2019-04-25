const express = require('express')
const wikiRouter = express.Router()
const addPage = require('../views/addPage')
const { Page } = require("../models");

wikiRouter.get('/add', function(req, res, next) {
  res.send(addPage())
});

wikiRouter.post('/', async (req, res, next) => {

  const entry = req.body
  const page = new Page({
    title: entry.title,
    content: entry.content
  });
  console.log('This is a view of the page:', page)
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

wikiRouter.get('/', function(req, res, next) {
  res.redirect('/')
});

module.exports = wikiRouter

