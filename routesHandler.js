const url = require("url");
const { StringDecoder } = require("string_decoder");
const db = require("./db");
const { toUnicode } = require("punycode");
const collection = "todo";

module.exports = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname.replace(/^\/+|\/+$/, "");
  //const query = parsedUrl.query;
  const method = req.method.toLowerCase();
  console.log(pathname);

  if (pathname == "api/todo" && method == "get") {
    // db.getDB()
    //   .collection(collection)
    //   .find({})
    //   .toArray((err, documents) => {
    //     if (err) console.log(err);
    //     else {
    //       res.writeHead(200, { "Content-Type": "application/json" });
    //       res.write(JSON.stringify(documents));
    //       res.end();
    //     }
    //   });

    try {
      const data = await db.getDB().collection(collection).find({});
      res.writeHead(200, "ok", { "Content-Type": "application/json" });
      while (await data.hasNext()) {
        let doc = await data.next();
        res.write(JSON.stringify(doc));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(500, "error");
      res.write("somthing went wrong!");
    }
    res.end();
  } else if (pathname == "api/todo" && method == "post") {
    res.end("post res");
  } else if (pathname.match(/api\/todo\/([0-9]+)/) && method == "patch") {
    const id = +pathname.split("/")[2];
    console.log(typeof id);
    res.end("patch res");
  } else if (pathname.match(/api\/todo\/([0-9]+)/) && method == "delete") {
    const id = +pathname.split("/")[2];
    console.log(typeof id);
    res.end("delete res");
  } else {
    res.writeHead(404, "error");
    res.write("can not find this route on this server");
    res.end();
  }
};
