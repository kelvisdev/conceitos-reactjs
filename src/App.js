import React, { useState, useEffect } from "react";

import api from "./services/api";

import { FiHeart, FiTrash2, FiGithub } from "react-icons/fi";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      console.log(response.data);

      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repository ${Date.now()}`,
      url: "https://github.com/kelvisdev/conceitos-reactjs",
      techs: ["Node.js", "React.js", "React Native"],
    });

    const { data } = response;

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      alert("Error removing repository, try again.");
    }
  }

  async function handleUrlRepository(url) {
    window.open(
      `${url}`,
      '_blank'
    );
  }

  return (
    <div className="repository-container">
      <section>
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>
              <h3>{repository.title}</h3>
              {repository.techs.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}

              <div>
                <button className="btn-like">
                  <FiHeart size={14} color="#ca4949" /> {repository.likes}{" "}
                  <small>Curtidas</small>
                </button>
              </div>

              <div>
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveRepository(repository.id)}
                >
                  <p className="title-btn">Remover</p> <FiTrash2 size={20} color="#fff" />
                </button>

                <button
                  className="btn-url"
                  onClick={() => handleUrlRepository(repository.url)}
                >
                  <p className="title-btn">Repositório </p> <FiGithub size={20} color="#fff" />                  
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button className="btn-add" onClick={handleAddRepository}>Adicionar</button>
      </section>
    </div>
  );
}

export default App;
