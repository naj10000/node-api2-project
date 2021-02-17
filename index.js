// require your server and launch it here
const server = require("./api/server.js")

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})