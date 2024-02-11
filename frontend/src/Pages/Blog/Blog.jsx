import { useEffect,useState } from "react";
import { getAllBlogs } from "../../api/internal";
import Loader from "../../Components/Loader/Loader1";


function Blog(){

const [blogs, setBlogs] = useState([])

useEffect(() => {

    (async function getAllBlogApiCall(){
        const response = await getAllBlogs();

        if(response.status == 200){
            setBlogs(response)
        }
    })();
},[])


    return(
<div>

</div>
    );
}

export default Blog;