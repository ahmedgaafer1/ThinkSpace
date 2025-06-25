import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { APIClient } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/userposts.css";

export default function UserPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    const authStore = localStorage.getItem("auth-store");
    if (authStore) {
      const parsed = JSON.parse(authStore);
      const token = parsed.state?.token;
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserId(decoded.id);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await APIClient.get("/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleCreate = () => {
    navigate("/posts/create");
  };

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const confirmDelete = (postId) => {
    setPostIdToDelete(postId);
    setShowConfirmModal(true);
  };

  const deletePost = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth-store"))?.state?.token;
      await APIClient.delete(`/posts/${postIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => prev.filter((post) => post.id !== postIdToDelete));
      toast.success("Post deleted successfully!", { position: "top-right" });
    } catch (err) {
      console.error("Failed to delete post:", err);
      toast.error("Failed to delete post", { position: "top-right" });
    } finally {
      setShowConfirmModal(false);
      setPostIdToDelete(null);
    }
  };

  const filteredPosts = posts.filter((post) => post.userId === userId);

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Posts</h2>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleCreate}>
          + Create Post
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-muted text-center">No posts found.</p>
      ) : (
        <div className="row g-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="post-card shadow-sm rounded-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold mb-2">{post.title}</h5>
                  <p className="text-muted small">
                    {post.content.length > 120 ? post.content.slice(0, 120) + "..." : post.content}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted small">Post ID: {post.id}</div>
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
                      title="Edit"
                      onClick={() => navigate(`/posts/${post.id}/edit`)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light border"
                      title="Delete"
                      onClick={() => confirmDelete(post.id)}
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

      {/* Modal التأكيد */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
