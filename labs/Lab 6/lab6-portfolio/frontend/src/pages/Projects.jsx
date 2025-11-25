import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/projects`);

        if (!response.ok) {
          throw new Error("Failed to fetch projects.");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setProjects([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading">Projects</h1>
      <p className="mt-2">
        The projects below are fetched from my backend API and displayed dynamically.
      </p>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
          {projects.map((project) => (
            <div className="col" key={project.id || project.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title h5">{project.name}</h2>
                  <p className="card-text">
                    <strong>Author:</strong> {project.author}
                  </p>
                  <p className="card-text">
                    <strong>Languages:</strong>{" "}
                    {Array.isArray(project.languages)
                      ? project.languages.join(", ")
                      : project.languages}
                  </p>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && !loading && !error && (
            <p>No projects available.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Projects;
