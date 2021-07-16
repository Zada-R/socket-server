var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// io.of("/my-namespace").on("connection", (client) => {
//   let timer;
//   client.on("subscribeToTimer", (interval) => {
//     let num = 1;
//     timer = setInterval(() => {
//       client.emit("timer", num++);
//       console.log(client.connected);
//     }, interval);
//     console.log("client is subscribing to timer with interval ", interval);
//   });

//   client.on("disconnect", (reason) => {
//     console.log(111111, reason);
//     if (timer) clearInterval(timer);
//   });
// });

io.path("/my-namespace").on("connection", (client) => {
  let timer;
  client.on("subscribeToTimer", (interval) => {
    let num = 1;
    timer = setInterval(() => {
      client.emit("timer", num++);
      console.log(client.connected);
    }, interval);
    console.log("client is subscribing to timer with interval ", interval);
  });

  client.on("disconnect", (reason) => {
    console.log(111111, reason);
    if (timer) clearInterval(timer);
  });
});

const port = 8000;
io.listen(port);
