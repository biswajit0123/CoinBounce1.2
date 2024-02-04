

//1
const Joi = require('joi');
//3 
const fs=require('fs');
//4
const Blog= require('../model/blogs')
//5
const dotenv = require('dotenv').config();
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
//6
const BlogDto = require('../dto/blog');
//7 
const BlogDetailDto = require('../dto/blog-detaildto');
//8
const Comment = require('../model/comment');

//2
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;





const blogController = {

    //create blog
    async create(req, res, next){
     // 1 validate req body
           const createBlogSchema = Joi.object({
            title:Joi.string().required(),
            author:Joi.string().regex(mongodbIdPattern).required(),
            content:Joi.string().required(),
            //our photo will come from client and be like
            //clent side -> base64 encoded string ->decode -> store-> save photo's path in db
            photo:Joi.string().required(),
           });
           //now validate
           const {error} = createBlogSchema.validate(req.body);
           //if error occure then show via middle wire
           if(error){
            return next(error);
           }
     // 2 handle photo storage naming,

           const {title, author, content, photo} = req.body;

           //read as buffer //builtin node buffer to read binary data of string
              //read photo ,replace with empty string, encode  to base 64
              //we allow png jpg jpeg and base64 added with each image
           const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

           //allot a random number
               const imagePath = `${Date.now()}-${author}.png`;
           //save locally
             try {
                fs.writeFileSync(`storage/${imagePath}`,buffer);
             } catch (error) {
              return next(error);  
             }
     // 3 add to db
     let newBlog;
        try {
             newBlog = new Blog({
                title,        // i recevied eror like 'failure when receiving data peer' error like i didnt declare newBlog outside of trycatch and accesing outside in dto
                author,
                content,
                photoPath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });
            //save
            await newBlog.save();
        } catch (error) {
            return next(error);
        }

const blogDto = new BlogDto(newBlog);

     // 4 return response
return res.status(200).json({blog:blogDto});
                                 
    },
               
                                 //
    async getAll(req, res, next){
               try {
                const blogs= await Blog.find({});
                const blogDto = [];
                for(let i = 0; i < blogs.length; i++){
                    const dto= new BlogDto(blogs[i]);
                    blogDto.push(dto);
                }
               return res.status(200).json({blogs:blogDto});

               } catch (error) {
                return next(error);
               }
    },
                                 //
    async getById(req, res, next){
               // 1 validate id
               //response

               const getByIdSchema = Joi.object({
                id:Joi.string().regex(mongodbIdPattern).required(),
               });
               const {error} = getByIdSchema.validate(req.params);
               if(error){
                return next(error);
               }

               //find
               let blog;
               const {id} = req.params;
               try {
                blog = await Blog.findOne({_id:id}).populate('author');//populate toshow all info of that author
               } catch (error) {
                return next(error);
               };

               const blogDetailDto = new BlogDetailDto(blog);

               return res.status(200).json({blogs:blogDetailDto});
    },
                                 //
    async update(req, res, next){
        // 1 validate
               const updateBlogSchema = Joi.object({
                title:Joi.string().required(),
                content:Joi.string().required(),
                author:Joi.string().regex(mongodbIdPattern).required(),
                blogId:Joi.string().regex(mongodbIdPattern).required(),
                photo:Joi.string(),
               });

               const {error} = updateBlogSchema.validate(req.body);

               const {title, content, author, blogId, photo} = req.body;

               // 2 find delete previous one 
               let blog;
               try {
                 blog= await Blog.findOne({_id:blogId});

               } catch (error) {
                return next(error);
               }

               if(photo){
                let previousPhoto = blog.photoPath;
                previousPhoto = previousPhoto.split('/').at(-1);//12345-56788.png

                // now delete photo
                fs.unlinkSync(`storage/${previousPhoto}`);

                //store new photo
                const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

                //allot a random number
                    const imagePath = `${Date.now()}-${author}.png`;
                //save locally
                  try {
                     fs.writeFileSync(`storage/${imagePath}`,buffer);
                  } catch (error) {
                   return next(error);  
                  }

               // 3 add new one
         await Blog.updateOne({_id:blogId},{
            title,
            content,
            photoPath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`,
        });

         }else{
             await Blog.updateOne({_id:blogId},{
                title,
                content,
             });
               }

return res.status(200).json({message:"Blog updated successfully"});

    },
                                 //
    async delete(req, res, next){
                   // 1 validate id
                
                   
                   const deleteBlogSchema = Joi.object({
                    id:Joi.string().regex(mongodbIdPattern).required(),
                   });

                   const {error} =deleteBlogSchema.validate(req.params);
if(error){
    return next(error);
}
                   const {id}=req.params;  //i got a error here
                   // 2 delete blog

                   // 3 delete comment

                   try {

                    await Blog.deleteOne({_id:id});

                    await Comment.deleteMany({blog:id});

                   } catch (error) {
                    return next(error);
                   }
                   return res.status(200).json({message:"blog deleted"});
    },


}

module.exports= blogController;