import { useEffect,useState } from "react";
import { getAllBlogs } from "../../api/internal";
import Loader from "../../Components/Loader/Loader1";
import { useNavigate } from "react-router-dom";
import styles from "./Blog.module.css"
function Blog(){

const [blogs, setBlogs] = useState([])
const navigate = useNavigate();
useEffect(() => {

    (async function getAllBlogApiCall(){
        const response = await getAllBlogs();

        // if(response.status === 200){
        //     setBlogs(response.data.blogs)
        // }
                    setBlogs(response.data.blogs)

    })();
},[])

if(blogs.length == 0){
    return <Loader text="blogs"/>
}
    return(
        <div className={styles.blogsWrapper}>
        {blogs.map((blog) => (
          <div
            id={blog._id}
            className={styles.blog}
            onClick={() => navigate(`/blogs/${blog._id}`)}  //my route is blogs
          >
            <h1>{blog.title}</h1>
            <img src={blog.photo} />
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    );
}

export default Blog;