const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    //set custom ID to avoid confustion with parent id (ie comment _id)
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: { // Tells Schema to use Virtuals & getters
      getters: true
    },
  }
);


const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  replies: [ReplySchema], // use ReplySchema to validate for a reply
  //unlike comments in Pizz, replies are nested *directly* in comments not referenced

},
  {
    toJSON: { // Tells Schema to use Virtuals & getters
      virtuals: true,
      getters: true
    },
    id: false // virtual doesn't need an ID

  });

CommentSchema.virtual('replyCount').get(function () {
  return this.replies.length; //since reply is [] len tell us a #!
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
