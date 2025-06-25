import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "@/api";
import "../styles/posts-style.css";

export default function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await APIClient.get("/posts");
        const rawPosts = response.data;

        const enrichedPosts = await Promise.all(
          rawPosts.map(async (post) => {
            try {
              const userRes = await APIClient.get(`/users/${post.userId}`);
              const avatarFileName = userRes.data.avatar;

              const fullAvatarURL = avatarFileName
                ? `http://localhost:3000/uploads/${avatarFileName}`
                : "/default-avatar.png";

              return {
                ...post,
                author: {
                  name: userRes.data.name,
                  avatar: fullAvatarURL,
                },
                createdAt: new Date().toISOString(),
              };
            } catch {
              return {
                ...post,
                author: {
                  name: "Unknown",
                  avatar: "/default-avatar.png",
                },
                createdAt: new Date().toISOString(),
              };
            }
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await APIClient.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      alert("Failed to delete post.");
      console.error("Delete error:", err);
    }
  };

  const formatDate = (dateStr) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Latest Posts</h2>

      {posts.length === 0 ? (
        <p className="text-muted text-center">No posts found.</p>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="post-card shadow-sm rounded-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold mb-2">{post.title}</h5>

                  <p className="text-muted small">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={post.author?.avatar}
                      alt="Author avatar"
                      width="36"
                      height="36"
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-semibold">{post.author?.name}</div>
                      <div className="text-muted small">{formatDate(post.createdAt)}</div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-light border"
                      title="View"
                      onClick={() => handleView(post.id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light border"
                      title="Delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
