const getStatus = (err) => {
  if (err.status) return err.status
  // ...
  else return 500
}

const getContent = (err) => {
  console.log(err.message)
  let data = {}
  if (process.env.NODE_ENV !== 'production') {
    data.message = err.message
    data.error = err
  }
  return data
}

const errorHandler = (err, req, res, next) => {
  res.status(getStatus(err))
  res.json(getContent(err))
}

module.exports = errorHandler
