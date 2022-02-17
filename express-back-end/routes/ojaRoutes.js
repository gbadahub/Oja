module.exports = function(router, database) {


  // get all products 
  router.get('/homepage', (req, res) => {
    database.getAllProductsForHomepage(20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get all clothing 
  router.get('/clothing', (req, res) => {
    database.getAllProductsFromClothing(20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get all shoes
    router.get('/shoes', (req, res) => {
    database.getAllProductsFromShoes(20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get all accessories 
    router.get('/accessories', (req, res) => {
    database.getAllProductsFromAccessories(20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });
  // get all bags
    router.get('/bags', (req, res) => {
    database.getAllProductsFromBags(20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get checkoutpage/ summary page logged in only 
  router.get('/orderSummary', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getCheckoutPage(userId)
    .then(orders => res.send({orders}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  // get items in cart logged in only
  // AM I GETTING THE RIGHT CART INFORMATION uing orderID?????
  router.get('/cart', (req, res) => {
    const userId = req.session.userId;
    const userId = req.session.orderId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getCartInfoForUser(userId, orderId)
    .then(orders => res.send({orders}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });


  // post items to order_items logged in only

  // AM I DOING THE POSTING CORRECTLY? THE FUNCTION REQUIRES ORDERS INTO
  // WILL REQ>BODY GIVE ME THAT?
  router.post('/cart', (req, res) => {
    const userId = req.session.userId;
    database.appendOrdersTableWithUserId({...req.body, owner_id: userId})
      .then(orders => {
        res.send(orders);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // post items to orders logged in only
  router.post('/cart', (req, res) => {
    const userId = req.session.userId;
    database.appendOrdersItemsTableWithCurrentOrder({...req.body, owner_id: userId})
      .then(orders => {
        res.send(orders);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  }); 

  // do I need to make a seperate route for search bar results?

  router.get('/search', (req, res) => {
    database.getAllProductsUsingSearchBar(req.query, 20)
    .then(products => res.send({products}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  // get orders page
  // get orders page - only wanna show once logged in 

  router.get('/orders', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getOrdersFromUser(userId)
    .then(orders => res.send({orders}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  // create an item to sell 
  router.post('/sell', (req, res) => {
    const userId = req.session.userId;
    database.addItemForSale({...req.body, owner_id: userId})
      .then(products => {
        res.send(products);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}