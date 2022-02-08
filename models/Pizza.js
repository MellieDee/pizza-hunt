const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'Your pizza needs a name!',
      trim: true
    },
    createdBy: {
      type: String,
      required: "What's your name?",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'arge', 'Extra Large'],
      defualt: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,// foreign key ie saying FK is comment ID
        ref: 'Comment' // comments from Comment
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