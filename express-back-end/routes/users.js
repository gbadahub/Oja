const client = require("../db");

module.exports = function (router, Queries) {
  router.get("/", (req, res) => {
    const abc = {
      name: "abc",
    };
    res.json(abc);
  });
  // router.post("/register", (req, res) => {
  //   const {firstname, lastname, email, password, phoneNumber, country, province,
  //   city,
  //   street,
  //   postal} = req.body.formDetails
  //   // console.log("reqbody:", req.body.formDetails)
  //   return client.query(`INSERT INTO users (first_name,last_name,email, password, phone_number, country, province, city, street, postal)
  // VALUES
  // ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [firstname, lastname, email, password, phoneNumber, country, province, city, street, postal])
  //     .then((resp) => {
  //       return res.json({resp})
  //     });
  //   // return client.query("select * from users;").then((resp) => {
  //   //   return res.json({resp})
  //   // });
  //   // console.log("paylo", req.body);
  //   // const abc = {
  //   //   name: "xyz",
  //   // };
  //   // res.json(abc);
  // });
  return router;
};
