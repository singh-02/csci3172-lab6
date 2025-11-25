function About() {
  return (
    <section>
      <h1 className="mb-4">About Me</h1>

      <div className="row gy-4">
        <div className="col-md-6">
          <h2 className="h4">Education</h2>
          <p>
            I am a senior Bachelor of Applied Computer Science student at
            Dalhousie University. My coursework includes web development,
            software engineering, databases, and management courses that
            strengthen both my technical and communication skills.
          </p>

          <h2 className="h4 mt-4">Experience</h2>
          <p>
            I have worked on several academic and personal projects, including
            building web applications with JavaScript, PHP, and React, and
            creating mobile-first interfaces. I also have experience working in
            team-based projects where I contributed as a developer and
            coordinator.
          </p>
        </div>

        <div className="col-md-6">
          <h2 className="h4">Technical Skills</h2>
          <ul>
            <li>Languages: JavaScript, PHP, Java, SQL</li>
            <li>Web: HTML5, CSS3, React, Bootstrap</li>
            <li>Tools: Git, GitLab, GitHub, VS Code</li>
            <li>Databases: MySQL, basic PostgreSQL</li>
          </ul>

          <h2 className="h4 mt-4">Career Goals & Passion</h2>
          <p>
            I am passionate about building user-friendly, accessible web
            applications that solve real problems for people. My goal is to work
            as a full-stack or front-end developer where I can keep learning
            modern web technologies and contribute to impactful products.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
