import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Home.css";
import CivitaiImages from "./Imagenes";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="fondohome">
      <Container>
        {/* Primera imagen */}
        <Row>
          <Col>
            <div id="contenedor_imagen">
              <div id="imagen">
                <Image
                  src="https://education.civitai.com/wp-content/uploads/2023/07/5000x5000_faviconC.png"
                  fluid
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Segunda imagen */}
        <Row>
          <Col>
            <div id="contenedor_imagen">
              <div id="imagen">
                <Image
                  src="https://shop.civitai.com/cdn/shop/files/kiss-cut-stickers-white-3x3-default-64c808ac61d73.png?crop=center&height=300&v=1690831025&width=300"
                  fluid
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Título de bienvenida */}
        <Row>
          <Col id="contenedor_imagen2">
            <h1>Bienvenido a la API de CIVITAI</h1>
          </Col>
        </Row>

        {/* Botón para ver más imágenes */}
        <Row>
          <Col id="contenedor_imagen2">
            <Button as={Link} to="/Imagenes?limite=50">
              Ver Más
            </Button>
          </Col>
        </Row>

        {/* Mostrar imágenes en Home */}
        <div id="contendorAPI">
          <CivitaiImages limite={6} /> {/* Mostrar solo 6 imágenes en Home */}
        </div>
      </Container>
    </div>
  );
};

export default Home;