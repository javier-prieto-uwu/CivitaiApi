import { useState, useEffect } from "react";
import "./Imagenes.css"; // Importa el archivo CSS actualizado

export default function CivitaiImages({ limite = 50 }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para mezclar el array aleatoriamente (Fisher-Yates)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio de valores
    }
    return array;
  };

  useEffect(() => {
    fetch(`https://civitai.com/api/v1/images?limit=${limite}`, {
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
          // Mezclar imágenes aleatoriamente antes de actualizar el estado
          const shuffledImages = shuffleArray(data.items.map((item) => item.url));
          setImages(shuffledImages);
        } else {
          throw new Error("No se encontraron imágenes");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limite]);

  if (loading) return <p>Cargando imágenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="images-container">
      <h1 className="images-title">Imágenes</h1>
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
