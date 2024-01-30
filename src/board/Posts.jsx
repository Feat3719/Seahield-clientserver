import React from "react";

const Posts = ({ posts, loading }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      
        {posts.map((post) => (
            <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
            </tr>
        ))}
      
    </>
  );
};
export default Posts;