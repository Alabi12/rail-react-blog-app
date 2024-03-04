/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          throw response;
        }
      } catch (e) {
        console.error("An error occurred:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),
      });
      if (response.ok) {
        const updatedPost = await response.json();
        console.log("Success", updatedPost);
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (e) {
      console.error("An error occurred", e);
    }
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor='post-title'>Title</label>
          <input
            id='post-title'
            type='text'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='post-body'>Body</label>
          <textarea
            id='post-body'
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default PostEditForm;
