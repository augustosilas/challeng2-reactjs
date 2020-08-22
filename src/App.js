import React from "react";

import api from "./services/api";

import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects([...projects, ...response.data]);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Project ${Date.now()}`,
      url: "http://github.com/project",
      techs: ["Node", "React"],
    });

    const newProjects = response.data;
    setProjects([...projects, newProjects]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      setProjects([...projects.filter((project) => project.id !== id)]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
