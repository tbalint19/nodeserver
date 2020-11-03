const express = require('express')
const router = express.Router()
const fs = require('fs')

const cache = () => memcachedContent = require('../../public/dist/content.json')

let memcachedContent = {}
setInterval(cache, 10*1000)
cache()

router.get('/', async (req, res) => {
  return res.json(memcachedContent)
})

module.exports = router
