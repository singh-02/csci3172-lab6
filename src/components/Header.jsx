import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {/* You can put your name or logo here */}
            Sidhantdeep Singh
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  Projects
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
