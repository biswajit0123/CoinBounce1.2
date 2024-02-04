
//1
const Joi = require('joi');
//2
const Comment =require('../model/comment');
//3
const CommentDto=require('../dto/comment-detaildto');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;


const commentController = {

     async create(req, res, next){

const createCommentSchema = Joi.object({
    content:Joi.string().required(),
author:Joi.string().regex(mongodbIdPattern).required(),
blog:Joi.string().regex(mongodbIdPattern).required(),
});

const {error} = createCommentSchema.validate(req.body);

if(error){
    return next(error);
}

const {content, author, blog} = req.body;

try {
    const newComment = new Comment({
        content,
        author,
        blog,
    });

    await newComment.save();
} catch (error) {
    return next(error);
}

return res.status(201).json({message:"comment created"});
     },

     async getById(req, res, next){

const getByIdChema= Joi.object({
    id:Joi.string().regex(mongodbIdPattern).required(),
});

const {error} = getByIdChema.validate(req.params);

if(error){
    return next(error);

}

const {id}= req.params;
let comment;
try {
  comment=  await Comment.find({blog:id}).populate('author');
} catch (error) {
    return next(error);
}
let commentDto = [];
for(let i=0; i<comment.length; i++){
    const obj =new CommentDto(comment[1]);
    commentDto.push(obj);
}
return res.status(200).json({data:commentDto});
     },
}

module.exports= commentController;