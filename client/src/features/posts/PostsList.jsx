// PostsList.jsx
import { useState, useEffect } from "react";
import { fetchAllPosts, deletePost as deletePostServices } from '../../services/postService';
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // fetch posts from the api
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePostServices(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  }
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2>
            <Link to={`/posts/${post.id}`} className='post-title'>
              {post.title}
            </Link>
          </h2>
         <div className="post-links">
         <Link to={`/posts/${post.id}/edit?}`}>Edit</Link>
         {" | "}
          <button onClick={() => deletePostHandler(post.id)} type="button">Delete</button>
         </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
