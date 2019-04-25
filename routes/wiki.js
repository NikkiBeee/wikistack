const express = require('express')
const wikiRouter = express.Router()
const addPage = require('../views/addPage')
const { Page } = require("../models");
const wikiPage = require('../views/wikipage.js')


wikiRouter.get('/add', function(req, res, next) {
  res.send(addPage())
});

wikiRouter.get('/:slug', async (req, res, next) => {
  try {
    const entry = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    console.log("this is the res.json ", res.json(entry), "this is the entry", entry)
    wikiPage(res.json(entry),"fake author")
  } catch (err) { next(err) }
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

wikiRouter.get('/', function(req, res, next) {
  res.redirect('/')
});

module.exports = wikiRouter

