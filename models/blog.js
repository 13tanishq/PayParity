
const mongoose=require('mongoose');
const Comment=require('./comment')
const Schema=mongoose.Schema;

const BlogSchema= new Schema({
    title: String,
    image: String,
    description: String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
});

BlogSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Blog',BlogSchema);