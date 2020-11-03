const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/liveness', async (req, res) => {
  console.log("Liveness probe - success")
  return res.sendStatus(200)
})

router.get('/readiness', async (req, res) => {
  try {
    await fs.promises.access(`${__dirname}/../../public/dist/index.html`)
    console.log("Readiness probe - success")
    return res.sendStatus(200)
  } catch (error) {
    console.log("Readiness probe - error")
    console.log(error)
    return res.sendStatus(500)
  }
})

module.exports = router
