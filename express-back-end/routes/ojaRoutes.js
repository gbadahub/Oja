const {
  getAllProductsForHomepage,
  getAllProductsFromClothing,
  getAllProductsFromShoes,
  getAllProductsFromAccessories,
  getAllProductsFromBags,
  getCartInfoForUser,
  getCheckoutPage,
  appendOrdersTableWithUserId,
  getAllProductsUsingSearchBar,
  getOrdersFromUser,
  addItemForSale,
  getProductbyId,
  getProductsFromSpecificSeller
} = require("../database");

module.exports = function (router, database) {
  // get all products
  router.get("/homepage", (req, res) => {
    getAllProductsForHomepage()
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // get all clothing
  router.get("/clothing", (req, res) => {
    getAllProductsFromClothing(20)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // router.get("/clothing/products_by_id", (req, res) => {
  //   const itemId = req.query.itemId

  //   getAllProductsFromClothing()
  //  .then((products) => res.json({product: products.filter(product => product.id === Number(itemId)) }))
  //  .catch((err) => {
  //    res.json(err)
  //  })
  // });

  router.get("/clothing/:product_id", (req, res) => {
    const productId = req.params.product_id
    
    getProductbyId(productId)
   .then((product) => {
      if(!product){
        return res.json({ product: {}})
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

  // get all shoes
  router.get("/shoes", (req, res) => {
    getAllProductsFromShoes(20)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // router.get("/shoes/products_by_id", (req, res) => {
  //   const itemId = req.query.itemId

  //   getAllProductsFromShoes()
  //  .then((products) => res.json({ product: products.filter(product => product.id === Number(itemId)) }))
  //  .catch((err) => {
  //    res.json(err)
  //  })
  // });

  router.get("/shoes/:product_id", (req, res) => {
    const productId = req.params.product_id
    
    getProductbyId(productId)
   .then((product) => {
      if(!product){
        return res.json({ product: {}})
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
    getAllProductsFromAccessories(20)
      .then((products) => res.json({ products }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // router.get("/accessories/products_by_id", (req, res) => {
  //   const itemId = req.query.itemId

  //  getAllProductsFromAccessories()
  //  .then((products) => res.json({ product: products.filter(product => product.id === Number(itemId)) }))
  //  .catch((err) => {
  //    res.json(err)
  //  })
  // });

  router.get("/accessories/:product_id", (req, res) => {
    const productId = req.params.product_id
    
    getProductbyId(productId)
   .then((product) => {
      if(!product){
        return res.json({ product: {}})
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


  // get all bags
  router.get("/bags", (req, res) => {
    getAllProductsFromBags(20)
      .then((products) => {
        // console.log('regsession:', JSON.stringify(req.session, null, 2))  
        
        res.json({ products });
      })

      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // router.get("/bags/products_by_id", (req, res) => {
  //   const itemId = req.query.itemId

  //   getAllProductsFromBags()
  //  .then((products) => res.json({ product: products.filter(product => product.id === Number(itemId)) }))
  //  .catch((err) => {
  //    res.json(err)
  //  })
  // });

  router.get("/bags/:product_id", (req, res) => {
    const productId = req.params.product_id
    
    getProductbyId(productId)
   .then((product) => {
      if(!product){
        return res.json({ product: {}})
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

  // get items in cart logged in only
  // AM I GETTING THE RIGHT CART INFORMATION uing orderID?????
  router.get("/cart", (req, res) => {
    const userId = req.session.userId;
    const orderId = req.session.orderId;
    if (!userId) {
      res.error("💩");
      return;
    }
    getCartInfoForUser(userId, orderId)
      .then((orders) => res.json({ orders }))
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  // post items to order_items logged in only

  // AM I DOING THE POSTING CORRECTLY? THE FUNCTION REQUIRES ORDERS INTO
  // WILL REQ>BODY GIVE ME THAT?
  router.post("/cart", (req, res) => {
    const userId = req.session.userId;
    appendOrdersTableWithUserId({ ...req.body, owner_id: userId })
      .then((orders) => {
        res.json(orders);
        const params = JSON.stringify({ owner_id: userId });
        res.redirect("/cart_two/?", params);
      })
      .catch((e) => {
        console.error(e);
        res.json(e);
      });
  });

  //   app.get('/category', function(req, res) {
  //     const query = querystring.stringify({
  //         "a": 1,
  //         "b": 2,
  //         "valid":"your string here"
  //     });
  //     res.redirect('/?' + query);
  // });

  // post items to orders logged in only
  router.post("/cart_two/:id", (req, res) => {
    console.log(req.params);
    // const userId = req.session.userId;
    // appendOrdersItemsTableWithCurrentOrder({...req.body, owner_id: userId})
    //   .then(orders => {
    //     res.send(orders);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   });
  });

  // do I need to make a seperate route for search bar results?

  router.get("/search", (req, res) => {
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
    addItemForSale({ ...req.body, owner_id: userid })
      .then((products) => {
        res.send(products);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};