function Projects() {
  return (
    <section>
      <h1 className="mb-4">Projects</h1>
      <p className="mb-4">
        Below are a few sample projects that represent my interests and skills
        as a developer. For Lab 5, these entries are static, but they will be
        good candidates for dynamic content in future labs.
      </p>

      <div className="row gy-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Beach Safety Mobile App</h2>
              <p className="card-text">
                A group project focused on providing real-time beach safety
                information, lifeguard details, and local services.
              </p>
              <p className="mb-1">
                <strong>Technologies:</strong> Flutter, Firebase, REST APIs
              </p>
              <p className="mb-0">
                <strong>My Role:</strong> Senior developer responsible for app
                architecture, feature implementation, and code reviews.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">PHP Email Web Application</h2>
              <p className="card-text">
                A course project that implemented authentication, a message
                inbox, and database-backed email functionality.
              </p>
              <p className="mb-1">
                <strong>Technologies:</strong> PHP, MySQL, HTML, CSS
              </p>
              <p className="mb-0">
                <strong>My Role:</strong> Implemented server-side logic and
                database interactions; focused on validation and error handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
