import { useAuthStore } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "@/api/user";
import "../styles/global.css";

export default function Navbar() {
  const { token, clear } = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getMe();
          setUser(res.data);
        } catch (e) {
          console.error("Failed to fetch user:", e);
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="brand-highlight">Think</span>Space
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/user-posts">
                  My Posts
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {token && user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`http://localhost:3000/uploads/${user.avatar}`}
                    alt="avatar"
                    width="34"
                    height="34"
                    className="rounded-circle me-2 border"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{user.name}</span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user-posts">
                      My Posts
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        clear();
                        navigate("/auth");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-primary rounded-pill px-3"
                    to="/auth"
                  >
                    Join Now
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
