import React, { useEffect, useState } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?limit=5'
        );

        const data = await response.json();

        const updatedPosts = data.map((post) => ({
          ...post,
          isEditing: false,
        }));

        setPosts(updatedPosts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleEdit = (postId) => {
    // Toggle the isEditing property for the clicked post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isEditing: !post.isEditing } : post
      )
    );
  };

  const handleEditChange = (e, postId) => {
    // Update the input field when editing a post
    setInput(e.target.value);

    // Update the title of the post being edited
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, title: e.target.value } : post
      )
    );
  };

  const handleDelete = (postId) => {
    // Filter out the post with the specified ID to delete it
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      {posts.map((post) => (
        <div style={{ border: '1px dashed', marginBottom: '5px' }} key={post.id}>
          {post.isEditing ? (
            <input
              type="text"
              value={post.title}
              onChange={(e) => handleEditChange(e, post.id)}
            />
          ) : (
            post.title
          )}
          <button onClick={() => handleEdit(post.id)}>
            {post.isEditing ? 'Save' : 'Edit'}
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}