import { useMemo, useState } from "react";

const SKILLS = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "Git & GitLab", category: "Tools" },
  { name: "Figma", category: "Tools" }
];

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;

      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading">About Me</h1>
      <p className="mt-3">
        I’m a 4th-year Bachelor of Applied Computer Science student at Dalhousie
        University, focused on front-end development and building accessible, responsive
        web applications.
      </p>

      <h2 className="h4 mt-4">Education</h2>
      <ul>
        <li>BACS – Dalhousie University (Expected 2026)</li>
      </ul>

      <h2 className="h4 mt-4">Interactive Skills</h2>
      <p>
        Use the search box and category filter below to explore my technical skills.
        Results update dynamically as you type or change filters.
      </p>

      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label htmlFor="skill-search" className="form-label">
            Search skills
          </label>
          <input
            id="skill-search"
            type="text"
            className="form-control"
            placeholder="Type a skill or category (e.g., frontend, backend)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <span className="d-block mb-2">Filter by category:</span>
          <div className="btn-group flex-wrap" role="group" aria-label="Skill categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === cat ? "btn-primary" : "btn-outline-primary"
                } mb-1`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        {filteredSkills.length === 0 ? (
          <p>No skills match your search yet. Try a different term or category.</p>
        ) : (
          <ul className="list-group">
            {filteredSkills.map((skill) => (
              <li
                key={skill.name}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{skill.name}</span>
                <span className="badge bg-secondary">{skill.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default About;
