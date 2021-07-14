var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.of("/my-namespace").on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    let num = 1;
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", num++);
    }, interval);
  });
});

const port = 8000;
io.listen(port);
