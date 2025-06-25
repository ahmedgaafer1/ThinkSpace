import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import "../styles/custom.css";

export default function Home() {
  const { token } = useAuthStore();

  return (
    <div className="home-wrapper">
      <section className="hero d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            Welcome to <span className="brand">ThinkSpace</span>
          </h1>
          <p className="lead mb-4">
            {token
              ? "Glad to see you again! Check out the latest posts or create your own."
              : "Share your thoughts, read inspiring stories, and connect with passionate writers."}
          </p>
          {token ? (
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/posts"
                className="btn btn-light btn-lg rounded-pill px-4"
              >
                View Posts
              </Link>
              <Link
                to="/user-posts"
                className="btn btn-outline-light btn-lg rounded-pill px-4"
              >
                My Posts
              </Link>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/posts"
                className="btn btn-primary btn-lg rounded-pill px-4"
              >
                Explore Posts
              </Link>
              <Link
                to="/auth"
                className="btn btn-outline-primary btn-lg rounded-pill px-4"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why BlogSphere?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="feature-card shadow-sm p-4 rounded-4">
                <i className="bi bi-pencil-square display-4 text-primary mb-3"></i>
                <h5>Write Freely</h5>
                <p>Express yourself and share your ideas with the world.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card shadow-sm p-4 rounded-4">
                <i className="bi bi-search display-4 text-success mb-3"></i>
                <h5>Discover More</h5>
                <p>
                  Explore diverse topics, learn from others, and get inspired.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card shadow-sm p-4 rounded-4">
                <i className="bi bi-people display-4 text-warning mb-3"></i>
                <h5>Join Community</h5>
                <p>Connect with creators and make your voice heard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="about"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">About ThinkSpace</h3>
              <p className="mb-3 text-muted">
                ThinkSpace is more than just a blog — it's a community of
                thinkers, storytellers, and learners. Whether you're here to
                share, discover, or grow, you're in the right place.
              </p>
              {token ? (
                <Link to="/posts" className="btn btn-primary rounded-pill px-4">
                  Go to Posts
                </Link>
              ) : (
                <Link to="/auth" className="btn btn-primary rounded-pill px-4">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 border-top">
        <div className="container d-flex justify-content-between">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} ThinkSpace. All rights reserved.
          </p>
          <div>
            <a href="#" className="text-muted me-3">
              Privacy
            </a>
            <a href="#" className="text-muted">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
