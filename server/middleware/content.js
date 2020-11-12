const express = require('express')
const router = express.Router()
const connect = require('../repository')

router.get('/content*', async (req, res) => {
  const resolve = await connect(`${__dirname}/../../public/dist/content.json`)
  const result = resolve(req.params, req.query)
  return res.json(result)
})

module.exports = router
