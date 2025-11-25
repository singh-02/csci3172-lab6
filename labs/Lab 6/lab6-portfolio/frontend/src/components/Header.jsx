import { Link, NavLink } from "react-router-dom";

function Header({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            YourName.dev
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink end className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects">
                  Projects
                </NavLink>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={onToggleTheme}
              aria-label="Toggle light and dark theme"
            >
              {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
