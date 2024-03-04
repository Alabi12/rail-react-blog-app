import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("Error occurred", error);
      }
    };
    fetchCurrentPost();
  }, [id]);

const deletePost = async () => {
  try {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok){
    navigate("/");
  }else {
    throw response;
  }
 } catch(e) {
  console.log(e);
}
}

  if (!post) return <h2>Loading...</h2>;
  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
      <Link to='/'>Back to Posts</Link>
      {" | "}
      <button onClick={deletePost} type="button">Delete</button>
    </div>
  );
}

export default PostDetails;
