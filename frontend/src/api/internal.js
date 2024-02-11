import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  let response;

  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signup = async (data) => {
  let response;
  try {
    response = await api.post("/register", data);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const signOut = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    console.log(error);
  }
  return response;
};

//
export const getAllBlogs = async () => {
  let response;
  try {
    response = await api.get("/blogs/all");
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const submitBlog = async (data) => {
  let response;
  try {
    response = await api.post("/blogs", data);
  } catch (error) {
    console.log(error);
  }
  return response;
};

//everything is ok above

//get by id

export const getBlogById = async (id) => {
  let response;

  try {
    response = await api.get(`/blogs/${id}`);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const getCommentsById = async (id) => {
  let response;

  try {
    response = await api.get(`/comment/${id}`, {
      validateStatus: false,
    });
  } catch (error) {
    console.log(error);
  }

  return response;
};

// post a comment

export const postComment = async (data) => {
  let response;

  try {
    response = await api.post("/comment", data);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const deleteBlog = async (id) => {
  let response;

  try {
    response = await api.delete(`/blogs/${id}`);
  } catch (error) {
    console.log(error);
  }
  return response;
};


//update

export const updateBlog =async (data) => {
  let response;

  try {
    response = await api.put('/blogs',data)
  } catch (error) {
    console.log(error);
  }
  return response;
}