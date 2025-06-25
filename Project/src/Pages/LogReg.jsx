import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import "../styles/AuthPage.css";

export default function LogReg() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="fw-bold mb-3">{isLogin ? "Welcome Back" : "Join Us"}</h2>
        <p className="text-muted mb-4">
          {isLogin ? "Login to continue" : "Create an account to get started"}
        </p>

        {isLogin ? <Login /> : <Register />}

        <div className="switch">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
