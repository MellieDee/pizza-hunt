const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: { // Tells Schema to use Virtuals & getters
      virtuals: true,
      getters: true
    },
    id: false //id set to false since it is virtual and ID not needed
  }
);


//-----------------  Virtuals  -----------------
// Get total number of Comments and Replies on Retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// As .reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array.



//  ------------Create Pizza Model --------------
const Pizza = model('Pizza', PizzaSchema);


module.exports = Pizza;