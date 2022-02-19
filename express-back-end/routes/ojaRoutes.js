const { getAllProductsForHomepage, getAllProductsFromClothing,
   getAllProductsFromShoes, getAllProductsFromAccessories, 
   getAllProductsFromBags, getCartInfoForUser, 
   getCheckoutPage, appendOrdersTableWithUserId, 
   getAllProductsUsingSearchBar, getOrdersFromUser, 
   addItemForSale} = require('../database');


module.exports = function(router, database) {


  // get all products 
  router.get('/homepage', (req, res) => {
    getAllProductsForHomepage()
    .then(products => res.json({products}))
    .catch(e => {
      console.error(e);
      res.json(e)
    }); 
  });

  // get all clothing 
  router.get('/clothing', (req, res) => {
    getAllProductsFromClothing(20)
    .then(products => res.json({products}))
    .catch(e => {
      console.error(e);
      res.json(e)
    }); 
  });

  // get all shoes
    router.get('/shoes', (req, res) => {
    getAllProductsFromShoes(20)
    .then(products => res.json({products}))
    .catch(e => {
      console.error(e);
      res.json(e)
    }); 
  });

  // get all accessories 
    router.get('/accessories', (req, res) => {
    getAllProductsFromAccessories(20)
    .then(products => res.json({products}))
    .catch(e => {
      console.error(e);
      res.json(e)
    }); 
  });

  // get all bags
    router.get('/bags', (req, res) => {
    getAllProductsFromBags(20)
    .then(products => res.json({products}))
    .catch(e => {
      console.error(e);
      res.json(e)
    }); 
  });

  // get checkoutpage/ summary page logged in only 
  router.get('/orderSummary', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.json({err: "💩"});
      return;
    }
    getCheckoutPage(userId)
    .then(orders => res.json({orders}))
    .catch(e => {
      console.error(e);
      res.json(e)
    });
  });

  // get items in cart logged in only
  // AM I GETTING THE RIGHT CART INFORMATION uing orderID?????
  router.get('/cart', (req, res) => {
    const userId = req.session.userId;
    const orderId = req.session.orderId;
    if (!userId) {
      res.error("💩");
      return;
    }
    getCartInfoForUser(userId, orderId)
    .then(orders => res.json({orders}))
    .catch(e => {
      console.error(e);
      res.json(e)
    });
  });


  // post items to order_items logged in only

  // AM I DOING THE POSTING CORRECTLY? THE FUNCTION REQUIRES ORDERS INTO
  // WILL REQ>BODY GIVE ME THAT?
  router.post('/cart', (req, res) => {
    const userId = req.session.userId;
    appendOrdersTableWithUserId({...req.body, owner_id: userId})
      .then(orders => {
        res.json(orders)
        const params = JSON.stringify({owner_id: userId})
        res.redirect('/cart_two/?', params);

      })
      .catch(e => {
        console.error(e);
        res.json(e)
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
  router.post('/cart_two/:id', (req, res) => {
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

  router.get('/search', (req, res) => {
    getAllProductsUsingSearchBar(req.query, 20)
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
    getOrdersFromUser(userId)
    .then(orders => res.send({orders}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  // create an item to sell // help with backend working 
  router.post('/rent', (req, res) => {
    const userId = req.session.formDetails.userId;
    addItemForSale({...req.body, owner_id: userId})
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