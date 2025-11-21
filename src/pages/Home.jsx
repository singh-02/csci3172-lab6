function Home() {
  return (
    <section>
      <div className="row align-items-center">
        <div className="col-md-7">
          <h1 className="display-4 fw-bold mb-3">
            Hi, I&apos;m Sidhantdeep Singh
          </h1>
          <p className="lead">
            I&apos;m an Applied Computer Science student with a passion for
            building web applications and solving real-world problems through
            technology.
          </p>
          <p>
            This React portfolio was created for CSCI 3172 to showcase my skills,
            projects, and interests as a developer.
          </p>
        </div>
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Quick Highlights</h2>
              <ul className="mb-0">
                <li>Experience with JavaScript, React, PHP, and MySQL</li>
                <li>Interest in full-stack and mobile development</li>
                <li>Strong focus on usability and accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
