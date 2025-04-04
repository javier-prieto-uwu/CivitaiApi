import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Creadores.css"; // Importa el archivo CSS

export default function CivitaiCreators() {
  const [creators, setCreators] = useState([]); // Estado para los creadores iniciales
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [isSearching, setIsSearching] = useState(false); // Estado para indicar si se está realizando una búsqueda
  const navigate = useNavigate();

  // Cargar los creadores iniciales al montar el componente
  useEffect(() => {
    fetch("https://civitai.com/api/v1/creators?limit=50")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los creadores");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de la API (creadores):", data);
        if (data.items && data.items.length > 0) {
          setCreators(data.items); // Guardar los creadores iniciales
        } else {
          throw new Error("No se encontraron creadores");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Función para buscar creadores por nombre de usuario
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      // Si el campo de búsqueda está vacío, limpiar los resultados de búsqueda
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setLoading(true);
    fetch(`https://civitai.com/api/v1/creators?query=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar creadores");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resultados de la búsqueda:", data);
        if (data.items && data.items.length > 0) {
          setSearchResults(data.items); // Guardar los resultados de la búsqueda
        } else {
          setSearchResults([]); // Limpiar los resultados si no hay coincidencias
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Función para manejar el clic en el botón "Ver Creaciones"
  const handleVerCreaciones = (username) => {
    navigate("/CreadoresImagen", { state: { username } });
  };

  if (loading) return <p>Cargando creadores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="creators-container">
      <h1 className="creators-title">Creadores de CivitAI</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Buscar creador por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="creators-grid">
        {/* Mostrar resultados de búsqueda si se está buscando */}
        {isSearching ? (
          searchResults.length > 0 ? (
            searchResults.map((creator) => (
              <div key={creator.id} className="creator-card">
                <h3 className="creator-name">{creator.username}</h3>
                {creator.image ? (
                  <img
                    src={creator.image}
                    alt={`Imagen de ${creator.username}`}
                    className="creator-image"
                  />
                ) : (
                  <p className="no-image">No hay imagen disponible</p>
                )}
                <br />
                <Button onClick={() => handleVerCreaciones(creator.username)}>
                  Ver Creaciones
                </Button>
              </div>
            ))
          ) : (
            <p className="no-creators">No se encontraron creadores con ese nombre</p>
          )
        ) : (
          // Mostrar los creadores iniciales si no se está buscando
          creators.map((creator) => (
            <div key={creator.id} className="creator-card">
              <h3 className="creator-name">{creator.username}</h3>
              {creator.image ? (
                <img
                  src={creator.image}
                  alt={`Imagen de ${creator.username}`}
                  className="creator-image"
                />
              ) : (
                <p className="no-image">No hay imagen disponible</p>
              )}
              <br />
              <Button onClick={() => handleVerCreaciones(creator.username)}>
                Ver Creaciones
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}