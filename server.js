const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/data/mock.json')
const middlewares = jsonServer.defaults()

const port = process.env.PORT || 3333;

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running in ${port}`)
}) 