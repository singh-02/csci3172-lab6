function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light text-center py-3 mt-auto border-top">
      <div className="container">
        <small className="text-muted">
          &copy; {year} Sidhantdeep Singh &middot; CSCI 3172 React Portfolio
        </small>
      </div>
    </footer>
  );
}

export default Footer;
