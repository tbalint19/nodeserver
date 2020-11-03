const express = require('express')
const router = express.Router()
const fs = require('fs')
const get = require('lodash.get')

const cache = () => memcachedContent = require('../../public/dist/content.json')

let memcachedContent = {}
setInterval(cache, 10*1000)
cache()

const getFilteredLocales = (lang, path) => {
  const { locales } = memcachedContent
  return Object.entries(locales[lang])
    .filter((entry) => entry[0].startsWith(path))
    .reduce((acc, cv) => {
      acc[cv[0]] = cv[1]
      return acc
    }, {})
}

const getLocales = (path) => ({
  en: getFilteredLocales('en', path),
  hu: getFilteredLocales('hu', path),
})

router.get('/', async (req, res) => {
  const path = 'content.pages.aol'

  const filteredContent = get(memcachedContent, path)
  const filteredLocales = getLocales(path)

  return res.json({ content: filteredContent, locales: filteredLocales })
})

module.exports = router
