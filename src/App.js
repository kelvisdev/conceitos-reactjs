import React, { useState, useEffect } from "react";

import api from "./services/api";

import { FiHeart, FiTrash2, FiGithub } from "react-icons/fi";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

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

  async function handleAddLikeInRepository(id) {
    const { data } = await api.post(`repositories/${id}/like`);

    const repository = repositories.find((repository) => repository.id === id);

    const repositoryIndex = repositories.indexOf(repository);

    const repositoryUpdated = {
      id: data.id,
      title: data.title,
      url: data.url,
      techs: data.techs,
      likes: data.likes,
    };

    repositories[repositoryIndex] = repositoryUpdated;

    setRepositories([]);
    setRepositories(repositories);
  }

  async function handleUrlRepository(url) {
    window.open(`${url}`, "_blank");
  }

  async function handleAddRepository(e = null) {
    if (e) {
      e.preventDefault();
    }

    const response = await api.post("repositories", {
      title,
      url,
      techs,
    });

    const { data } = response;

    setRepositories([data, ...repositories]);

    limpaCampos();
  }

  function limpaCampos() {
    setTitle("");
    setUrl("");
    setTechs([]);
  }

  return (
    <div className="repository-container">
      <section>
        <form onSubmit={handleAddRepository}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Repository Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            placeholder="Technologies"
            value={techs}
            onChange={(e) => setTechs(e.target.value.split(","))}
          />
          <button
            className="btn-add"
            type="submit"
            onClick={handleAddRepository}
          >
            Adicionar
          </button>
        </form>
      </section>
      <section className="list-repositories">
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>
              <h3 className="h3">{repository.title}</h3>
              {repository.techs.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}

              <div className="likes">
                <button
                  className="btn-like"
                  onClick={() => handleAddLikeInRepository(repository.id)}
                >
                  <FiHeart fill="#ca4949" color="#ca4949" />{" "}
                  {repository.likes} likes
                </button>
              </div>

              <div>
                <button
                  id="btn-remove"
                  className="btn-remove"
                  onClick={() => handleRemoveRepository(repository.id)}
                >
                  <p className="title-btn">Remover</p>{" "}
                  <FiTrash2 size={20} />
                </button>

                <button
                  className="btn-url"
                  onClick={() => handleUrlRepository(repository.url)}
                >
                  <p className="title-btn">Repositório </p>{" "}
                  <FiGithub size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );  
}

export default App;
