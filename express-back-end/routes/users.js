const client = require("../db");

module.exports = function (router, Queries) {
  router.get("/", (req, res) => {
    const abc = {
      name: "abc",
    };
    res.json(abc);
  });
  router.post("/register", (req, res) => {
    return client.query("select * from users;").then((res) => {
      return res.rows;
    });
    console.log("paylo", req.body);
    const abc = {
      name: "xyz",
    };
    res.json(abc);
  });
  return router;
};
