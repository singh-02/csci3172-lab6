import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="text-center">
      <h1 className="display-5 fw-bold mb-3">404 - Page Not Found</h1>
      <p className="lead mb-4">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
