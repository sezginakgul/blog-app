import { createContext, useContext, useState } from "react";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [blogPost, setBlogPost] = useState([]);
  console.log("BlogPost", blogPost);
  return (
    <BlogContext.Provider value={{ blogPost, setBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

export const useBlogContext = () => {
  return useContext(BlogContext);
};
