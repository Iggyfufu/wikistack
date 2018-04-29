const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, wikiPage , editPage} = require('../views');

router.get('/', (req, res, next) => {
  res.send('test');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author
  const email = req.body.email

  try {
    const user = await User.findOrCreate({
      where: {
        name: author,
        email: email
      }
    });
    const page = await Page.create(req.body)
    page.setAuthor(user[0].id)
    console.log(user);
    await page.save();
    res.redirect(`/wiki/${page.slug}`)
  } catch (err) { next(err) }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();
    res.send(editPage(page, author))
  } catch (err) { next(err) }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author))
  } catch(err) { res.status(404).send(`<h1>Not Found</h1>`) }
})

router.post('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    await page.update(req.body);
    res.redirect(`/wiki/${page.slug}`)
  } catch (err) { next(err) }

})

module.exports = router;
