
class BlogDetailDto{
    constructor(blog){
      this._id=blog._id,
    //    this.author = blog.author,
       this.content = blog.content,
       this.title = blog.title,
       this.photo = blog.photoPath,
       this.createdAt = blog.createdAt,
this.name=blog.author.name;
this.username=blog.author.username;
    }
   }
   
   module.exports = BlogDetailDto;