const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/", express.static(path.join(__dirname, "public")));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // server.get("/", (req, res) => {
  //   return app.render(req, res, "/");
  // });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("listening to 3000");
  });
});
