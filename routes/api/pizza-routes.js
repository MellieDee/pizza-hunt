const { getAllPizza, createPizza, getPizzaByID, updatePizza, deletePizza } = require('../../controllers/pizza-controller');

const router = require('express').Router();

// NOTE:
// Aren't actually writing the route functionality, this keeps route files cleaner /// benefit, it  abstracts the database methods from the routes, giving option to write unit tests with Jest

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaByID)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;