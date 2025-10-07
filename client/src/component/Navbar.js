import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            fontSize: "1.6rem",
            background: "linear-gradient(90deg, #00eaff, #b366ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          ZAMYT Blog
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mx-2">
              <Link
                className="nav-link fw-semibold"
                to="/"
                style={{
                  color: "white",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#00eaff")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                🏠 Home
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link fw-semibold"
                    to="/admin"
                    style={{
                      color: "white",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#b366ff")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    📋 Dashboard
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <button
                    className="btn btn-sm fw-bold"
                    onClick={handleLogout}
                    style={{
                      background: "linear-gradient(90deg, #ff4d4d, #ff7b7b)",
                      border: "none",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background =
                        "linear-gradient(90deg, #ff7b7b, #ff4d4d)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background =
                        "linear-gradient(90deg, #ff4d4d, #ff7b7b)")
                    }
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item mx-2">
                <Link
                  className="btn fw-bold px-3"
                  to="/admin-login"
                  style={{
                    background: "linear-gradient(90deg, #00eaff, #b366ff)",
                    color: "#000",
                    border: "none",
                    borderRadius: "8px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background =
                      "linear-gradient(90deg, #b366ff, #00eaff)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background =
                      "linear-gradient(90deg, #00eaff, #b366ff)")
                  }
                >
                  🔑 Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
