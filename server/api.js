
export default app => {
  app.all('*', (req, res, next) => {
    next()
  })
  app.get('/api/user/login', (req, res) => {
    res.json({
      code: 200,
      msg: 'success'
    })
  })
  app.get('*', (req, res) => {
    res.end('404')
  })
}
