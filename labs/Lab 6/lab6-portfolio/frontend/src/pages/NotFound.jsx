import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="text-center py-5" aria-labelledby="notfound-heading">
      <h1 id="notfound-heading" className="display-5 fw-bold">
        404 – Page Not Found
      </h1>
      <p className="mt-3">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Go back home
      </Link>
    </section>
  );
}

export default NotFound;
