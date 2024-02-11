import { useState } from "react";
import { submitBlog } from "../../api/internal";
import { useSelector } from "react-redux";
import styles from "./Submitblog.module.css";
import TextInput from "../../Components/Textinput/Textinput";
import { useNavigate } from "react-router-dom";


function Submitblog() {

    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const author = useSelector((state) => state.user._id);

  const getPhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result); // base64 image in in resuylt
    };
  };


  // handeling submit
const submitHandeler =async () => {

    const data = {
        author,
        title,
        content,
        photo,
    }

    const response = await submitBlog(data);

    if(response.status == 201){
        navigate('/blogs')
    }
}

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {/* {" "} */}
          Create a blog
          <TextInput
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{ width: "60%" }}
          />
          <textarea 
          
          className={styles.content}
          placeholder="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={400}
          />
       
          <div className={styles.photopath}>
            <p>Chooose a Photo:</p>
            <input
              type="file"
              name="photo"
              id="photo"
              className={styles.inp}
              accept="image/jpg, image/jpeg, image/png"
              onChange={getPhoto}
            />
            {photo !== "" ? <img src={photo} width={40} height={40} /> : ""}
          </div>
          <button className={styles.submitbtn} onClick={submitHandeler}
   disabled={
    title === ""|| content === ""  || photo === "" 
}
          >Submit</button>
        </div>
      </div>
    </>
  );
}

export default Submitblog;
