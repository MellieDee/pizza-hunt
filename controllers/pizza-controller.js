const { Pizza } = require('../models');


//Create all of these functions as methods of the pizzaController object. 
// These methods will be used as the callback functions for the Express.js routes Each will take two parameters: req and res.


const pizzaController = {

  //  Get ALL Pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },


  // Get ONE Pizza - destructured params cuz just need ID
  getPizzaByID({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
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


  // CREATE Pizza aka NEW Pizza  --destructured cuz just need the body data
  //can handle [] or a single data point (takes[] from objectStore)
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  //UPDATE a Pizza aka Edit
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true,
        runValidators: true
      } //new means will return the updated doc with changes in it
      //runValidators in conjunction with require fields in Schema so when pizza is updated -t ALSO gets checked for rules - of not peaople could add super mega size etc
    )
      //set to true returns new not old doc
      .then(dbPizzaData => {
        if (!dbPizzaData) { //confirming data was rec from Mongo
          res.status(404).json({ message: "No Pizza found with this ID" })
          return;
        }
        res.json(dbPizzaData)
      })
      .catch(err => res.status(400).json(err));
  },



  // DELETE a Pizza
  // destructured params, dont need body cuz no data to be received by Mongo/db
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