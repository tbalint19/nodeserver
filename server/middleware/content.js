const express = require('express')
const router = express.Router()
const fs = require('fs')
const get = require('lodash.get')

const memcachedContent = require('../../public/dist/content.json')

const getFilteredLocales = (lang, path, toExclude) => {
  const { locales } = memcachedContent
  let entries = Object.entries(locales[lang])
    .filter((entry) => entry[0].startsWith(path))
  toExclude.forEach(key => {
    entries = entries.filter(e => !e[0].startsWith(`${path}.${key}`))
  })
  const result = entries
    .reduce((acc, cv) => {
      acc[cv[0]] = cv[1]
      return acc
    }, {})
  return result
}

const getLocales = (path, toExclude) => ({
  en: getFilteredLocales('en', path, toExclude),
  hu: getFilteredLocales('hu', path, toExclude),
})

const resolvePath = (params) => {
  const path = params[0]
  const dotPath = path.split("/").join(".")
  const dotPathWithTrailingDot = dotPath.startsWith(".") ? dotPath : `.${dotPath}`
  const r1 = `content${dotPathWithTrailingDot}`
  const withoutEndDot = r1.endsWith(".") ? r1.slice(0, -1) : r1
  const localePath = withoutEndDot.split('content')[1]
  const withoutEndDotL = localePath.startsWith(".") ? localePath.substring(1) : localePath
  return { path: withoutEndDot, localePath: withoutEndDotL }
}

const resolveToExclude = (query) => {
  if (!query.exclude) return []
  if (Array.isArray(query.exclude)) return query.exclude
  return [ query.exclude ]
}

router.get('/content*', async (req, res) => {
  const toExclude = resolveToExclude(req.query)
  const { path, localePath } = resolvePath(req.params)

  const filteredContent = { ...get(memcachedContent, path) }
  const filteredLocales = getLocales(localePath, toExclude)

  if (Array.isArray(filteredContent)) {
    for (let elem of filteredContent) {
      for (let key of toExclude) {
        if (elem[key])
          delete elem[key]
      }
    }
  } else {
    for (let key of toExclude) {
      delete filteredContent[key]
    }
  }

  return res.json({ content: filteredContent || {}, locales: filteredLocales })
})

module.exports = router
