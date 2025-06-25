import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/api/user";
import { APIClient } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    avatar: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userPostsCount, setUserPostsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getMe();
        const userData = res.data;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          username: userData.username || "",
          phone: userData.phone || "",
          avatar: userData.avatar || "",
        });

        const postsRes = await APIClient.get("/posts");
        const userPosts = postsRes.data.filter((post) => post.userId === userData.id);
        setUserPostsCount(userPosts.length);
      } catch (err) {
        console.error("❌ Failed to fetch user or posts:", err);
        toast.error("Failed to load profile data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;

      if (newAvatar) {
        payload = new FormData();
        for (const key in formData) {
          payload.append(key, formData[key]);
        }
        payload.append("avatar", newAvatar);
        payload.append("password", "placeholder");
      } else {
        payload = { ...formData, password: "placeholder" };
      }

      await updateMe(user.id, payload);
      toast.success("Profile updated successfully ✅");
      setUser((prev) => ({ ...prev, ...formData }));
    } catch (err) {
      console.error("❌ Failed to update:", err);
      toast.error("Failed to update profile ❌");
    }
  };

  const avatarURL = preview
    ? preview
    : formData.avatar
    ? `http://localhost:3000/uploads/${formData.avatar}`
    : "/default-avatar.png";

  return (
    <div className="profile-wrapper">
      <div className="container py-5">
        <ToastContainer />
        <div className="row g-4">
          {/* Profile Card */}
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-4">
              <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                <img
                  src={avatarURL}
                  alt="Avatar"
                  className="rounded-circle border border-3"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
              </label>
              <input
                type="file"
                id="avatarInput"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <h5 className="fw-bold mt-3 mb-1">{formData.name}</h5>
              <p className="text-muted">@{formData.username}</p>

              <div className="d-flex justify-content-around mt-3">
                <div>
                  <h6 className="fw-bold mb-0">{userPostsCount}</h6>
                  <small className="text-muted">Posts</small>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">210</h6>
                  <small className="text-muted">Followers</small>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">35</h6>
                  <small className="text-muted">Likes</small>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="col-md-8">
            <div className="card shadow-sm p-4">
              <h4 className="fw-bold mb-4">Edit Profile</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="tel"
                  />
                </div>

                <button className="btn btn-primary w-100 rounded-pill">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
