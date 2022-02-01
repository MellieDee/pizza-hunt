const { Pizza } = require('../models');


//Create all of these functions as methods of the pizzaController object. 
// These methods will be used as the callback functions for the Express.js routes Each will take two parameters: req and res.


const pizzaController = {

  //  Get ALL Pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },


  // Get ONE Pizza - destructured params cuz just need ID
  getPizzaByID({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No Pizza found with this ID' })
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err)
          ;
        res.status(400).json(err);
      });
  },


  // CREATE Pizza aka NEW Pizza  --destructuredcuz just need the body data
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  //UPDATE a Pizza aka Edit
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      //set to true returns new not old doc
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No Pizza found with this ID" })
          return;
        }
        res.json(dbPizzaData)
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE a Pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No  Pizza found with this ID!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = pizzaController;