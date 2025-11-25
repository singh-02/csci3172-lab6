function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <p className="mb-0">
          <a className="link-light" href="mailto:your.email@dal.ca">
            your.email@dal.ca
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
