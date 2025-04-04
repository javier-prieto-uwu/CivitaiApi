import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Imagenes_creador.css"; // Importa el archivo CSS actualizado

export default function CivitaiImagesCreador({ limite = 200 }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { username } = location.state || {};
  

  useEffect(() => {
    let apiUrl = `https://civitai.com/api/v1/images?limit=${limite}&nsfw=x`;
    if (username) {
      apiUrl += `&username=${username}`;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las imágenes");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de la API:", data);
        if (data.items && data.items.length > 0) {
          const filteredImages = username
            ? data.items.filter((item) => item.username === username)
            : data.items;
          setImages(filteredImages.map((item) => item.url));
        } else {
          throw new Error("No se encontraron imágenes");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limite, username]);

  if (loading) return <p>Cargando imágenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="images-creador-container">
      <h1 className="images-creador-title">Imágenes de {username || "CivitAI"}</h1>
      <div className="images-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="image-item">
              <img src={img} alt={`Imagen ${index + 1}`} />
            </div>
          ))
        ) : (
          <p className="no-images">No hay imágenes disponibles.</p>
        )}
      </div>
    </div>
  );
}
