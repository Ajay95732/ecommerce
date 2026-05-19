import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card shadow rounded-4 p-4 p-md-5">
        <div className="text-center mb-4">
          <div className="login-badge mb-3">MY SHOP</div>
          <h2 className="fw-bold">Welcome back</h2>
          <p className="text-muted mb-0">
            Sign in to your account and continue shopping with exclusive deals.
          </p>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-pill"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter password"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberLogin"
              />
              <label className="form-check-label" htmlFor="rememberLogin">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 text-muted small">
          New to MyShop?{' '}
          <Link to="/signup" className="text-primary text-decoration-none fw-semibold">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}