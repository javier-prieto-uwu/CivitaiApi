import "./App.css";
import Navbar2 from "./Pages/Navbar";
import Home from "./Pages/Home";
import CivitaiImages from "./Pages/Imagenes";
import "bootstrap/dist/css/bootstrap.min.css";
import Models from './Pages/Models'
import CivitaiImagesCreador from './Pages/ImagenesCreador'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar2></Navbar2>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Imagenes" element={<CivitaiImages />} />
        <Route path="/Creadores" element={<Models />} />
        <Route path="/CreadoresImagen" element={<CivitaiImagesCreador />} />
      </Routes>
    </>
  );
}

export default App;
