const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views')
const { Page, User } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers))
  } catch(err) { next(err) }
})

router.get('/:userid', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid)
    const pages = await Page.findAll({
      where: {
        authorId: user.id
      }
    })
    console.log(user.id);
    res.send(userPages(user, pages))
  } catch(err) { next(err) }
})





























module.exports = router;
