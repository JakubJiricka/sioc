import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import SiocLogoHead from '../../../public/images/siocLogoHead.png';

const HomeFooter = () => (
    <Container fluid className="footer">
        <Row>
        <Col sm={12}>
        <Row>
            <Col sm={4} className="mb-5">
                <div>
                    <img src={SiocLogoHead} alt="sioc.com.ar"/>
                    <p>info@sioc.com.ar</p>
                </div>
                <div className="social-icons">
                    <i className="fa fa-facebook"/>
                    <i className="fa fa-instagram"/>
                </div>
            </Col>
            <Col sm={4}>
                <h5><b>Te sirvió el sistema de búsqueda online?</b></h5>
                <h5>Te parece que hay algo que podamos mejorar para vos?</h5>
                <h5>Mandanos tus sugerencias para que nuestro servicio sea mejor día a día!</h5>
            </Col>
            <Col sm={4}>
                <div className="">
                    <h5>Los equipos inmobiliarios más importantes de la ciudad unidos por una plataforma online de compra, venta y alquiler de propiedades: </h5>
                    <h5><b>28 equipos trabajando en equipo !</b></h5>
                </div>
            </Col>
        </Row>
        </Col>
        </Row>
    </Container>
);

export default HomeFooter;
