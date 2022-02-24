const {
  getAllProductsForHomepage,
  getAllProductsFromClothing,
  getAllProductsFromShoes,
  getAllProductsFromAccessories,
  getAllProductsFromBags,
  getCartInfoForUser,
  getCheckoutPage,
  UpdateOrdersTableWithTotalPrice, 
  UpdateOrdersItemsTableWithProductTotal,
  getAllProductsUsingSearchBar,
  getOrdersFromUser,
  addItemForSale,
  getRelatedProductsFromUser,
  removeItemForSale,
  getProductbyId,
  getProductsFromSpecificSeller,
  createOrdersTableWithUserId,
  appendOrdersItemsTableWithCurrentOrder,
  getMostRecentOrderFromUser,
  searchProduct
} = require("../database");

module.exports = function (router, database) {

  // get all the product for the homepage to display the editor's pick etc. 
  router.get("/homepage", (req, res) => {
    getAllProductsForHomepage()
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get all clothing from the db
  router.get("/clothing", (req, res) => {
    getAllProductsFromClothing(30)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get a specific clothing item 
  router.get("/clothing/:product_id", (req, res) => {
    const productId = req.params.product_id
    getProductbyId(productId)
      .then((product) => {
        if (!product) {
          return res.json({ product: {} })
        }

        getProductsFromSpecificSeller(product.user_id)
          .then(otherProducts => {
            res.json({ product, otherProducts })
          })

      })
      .catch((err) => {
        res.json(err)
      })
  });

  // get all shoes from the db
  router.get("/shoes", (req, res) => {
    getAllProductsFromShoes(30)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get the specific shoe item
  router.get("/shoes/:product_id", (req, res) => {
    const productId = req.params.product_id

    getProductbyId(productId)
      .then((product) => {
        if (!product) {
          return res.json({ product: {} })
        }

        getProductsFromSpecificSeller(product.user_id)
          .then(otherProducts => {
            res.json({ product, otherProducts })
          })

      })
      .catch((err) => {
        res.json(err)
      })
  });


  // get all accessories
  router.get("/accessories", (req, res) => {
    getAllProductsFromAccessories(30)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get specific item for accessories 
  router.get("/accessories/:product_id", (req, res) => {
    const productId = req.params.product_id

    getProductbyId(productId)
      .then((product) => {
        if (!product) {
          return res.json({ product: {} })
        }

        getProductsFromSpecificSeller(product.user_id)
          .then(otherProducts => {

            res.json({ product, otherProducts })
          })

      })
      .catch((err) => {
        res.json(err)
      })
  });

  // firtly verify the user annd have user id 
  // then i will create an order with it 
  // then I will append the othersItems table with product id, newly generate order id and product total 

  router.post("/accessories/:product_id", (req, res) => {
    const productId = req.params.product_id
    const userid = req.body.userId
    const productPrice = req.body.productPrice
    // get the order_id

    // const orderId = res.data.orderId;

    if (!userid) {
      res.send("💩");
      return;
    }
    // only creates a new order when an order doesn't exist 
    getMostRecentOrderFromUser()
      .then((res) => {
        // console.log('res175:', res);
        const orderIdFromRecentOrder = res[0].id;

        if (orderIdFromRecentOrder) {
          // console.log('CorrectIdPerhapsss:', orderIdFromRecentOrder);
          appendOrdersItemsTableWithCurrentOrder(productId, orderIdFromRecentOrder, productPrice)
            .then(res => console.log(res))
            .catch((err) => {
              res.json(err)
            })
        }
        else {
          createOrdersTableWithUserId(userid)
            .then((res) => {
              console.log(userid);
              // console.log('resdata:', res);
              const orderId = res.id;
              // console.log("productId:", productId);
              // console.log("orderId:", orderId);
              // console.log("productTotal:", productPrice);
              appendOrdersItemsTableWithCurrentOrder(productId, orderId, productPrice)
                .then(res => console.log(res))
                .catch((err) => {
                  res.json(err)
                })
              console.log(res);
            })
            .catch((err) => {
              res.json(err)
            })
        }
        console.log(res)
      })
      .catch((err) => {
        res.json(err)
      })
  });



  // get all bags
  router.get("/bags", (req, res) => {
    getAllProductsFromBags(30)
      .then((products) => {
        // console.log('regsession:', JSON.stringify(req.session, null, 2))  

        res.json({ products });
      })

      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get each specific bag 
  router.get("/bags/:product_id", (req, res) => {
    const productId = req.params.product_id

    getProductbyId(productId)
      .then((product) => {
        if (!product) {
          return res.json({ product: {} })
        }

        getProductsFromSpecificSeller(product.user_id)
          .then(otherProducts => {
            res.json({ product, otherProducts })
          })
      })
      .catch((err) => {
        res.json(err)
      })
  });


  // get checkoutpage/ summary page logged in only
  router.get("/orderSummary", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.json({ err: "💩" });
      return;
    }
    getCheckoutPage(userId)
      .then((orders) => res.json({ orders }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });


  router.get("/cart", async (req, res) => {
    // console.log("test", req.session)
    console.log('req.params.userId:', req.query['userId']);

    const userid = req.query['userId'];
    // const orderId = req.session.orderId;
    // const orderId = res.id;

    if (!userid) {
      res.send("💩");
      return;
    }
    // needs to get the most recent order created by the user when they click add to cart
    const mostRecentOrderId = (await getMostRecentOrderFromUser())[0].id
    const orders = await getCartInfoForUser(mostRecentOrderId)
    res.send({orders})
  });


  router.post("/cart", (req, res) => {
    const userid = req.headers.userid;
    const orderId = res.id;
    // needs to take in total_price

    // 1 - needs to update totalprice when clicking submit 
    UpdateOrdersTableWithTotalPrice({ orderId })
      .then((orders) => {
        res.json(orders);
        // const params = JSON.stringify({ owner_id: userid });
        // res.redirect("/cart_two/?", params);
      })
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });


  router.get("/search", (req, res) => {
    // const productI = req.params.productId;
    getAllProductsUsingSearchBar(req.query, 20)
      .then((products) => res.send({ products }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // get orders page
  // get orders page - only wanna show once logged in

  router.get("/orders", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    getOrdersFromUser(userId)
      .then((orders) => res.send({ orders }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // create an item to sell // help with backend working
  router.post("/rent", (req, res) => {
    // console.log('Req Headers:', req.headers);
    const userid = req.headers.userid;
    // console.log("rent", userid)
    addItemForSale({ ...req.body, owner_id: userid })
      .then((products) => {
        res.send(products);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // get other listing from user
  router.get("/rent", (req, res) => {
    // console.log('Req Headers:', req.headers);
    const userid = req.headers.userid;
    getRelatedProductsFromUser(userid)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/rent/:productId", (req, res) => {
    // console.log('Req Headers:', req.headers);
    const productId = req.params.productId;
    removeItemForSale(productId)
      .then((products) => {
        res.send(products);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });


  router.post("/abc", (req,res)=>{
    const searchInput = req.body.search
    searchProduct(searchInput)
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
  })


  return router;
};