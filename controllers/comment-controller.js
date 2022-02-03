const req = require('express/lib/request');
const { Comment, Pizza } = require('../models');

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      // get comment ID
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbPizzaData => { //get data of Pizza so we can do soemthing with it
        if (!dbPizzaData) {//confirming data was rec from Mongo
          res.status(404).json({ message: 'No pizza found with this ID!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  addReply({ params, body }, res) {
    console.log(body)
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true }
    )
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this ID' });
          return;
        }
        res.json(dbPizzaData)
      })
      .catch(err => res.json(err));
  },


  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbPizzaData => res.json(dbPizzaData)
      )
      .catch(err => res.json(err));
  },



  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        //Deletes the Document, but still returns the data (from the comment)
        if (!deletedComment) { //confirming data was rec from Mongo
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Pizza.findOneAndUpdate(
          //then we use that (comment) data to ID and remove it from the pizza
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })  //returning the pizza, but w/o the comment ID ie w/o the comment
      .then(dbPizzaData => {
        if (!dbPizzaData) { //confirming data was rec from Mongo
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

};

module.exports = commentController;
