import React from 'react';
import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
import SiocSonrisa from '../../../public/images/sonrisa-sioc.png';
import ImgPropiedad from '../../../public/images/330x220.png';

const Resultados = () => (
    <Grid className="single-page">
        <Row className="head">
            <div className="padding-md"/>
            <Col sm={12} className="text-center">
                <img src={SiocSonrisa} alt="La vida te sonríe" width={100}/>
                <h3 className="primary">Esto es lo que encontramos para vos!</h3>
            </Col>
            <Col sm={6} smOffset={3} className="text-center head-res">
                <h4>Tomate tu tiempo, mirá tranquilo, y contactanos si tenés dudas o necesitás alguna información
                    adicional ;)
                </h4>
            </Col>
        </Row>
        <Row className="content">
            <Col sm={12} md={10} mdOffset={1}>
                <div className="content-box">
                    <Row>
                        <Col sm={3}>
                            <img src={ImgPropiedad} alt=""/>
                        </Col>
                        <Col sm={9}>
                            <h3 className="primary">Departamento en Venta Calle 55 e/ 4 y 5</h3>
                            <h5>Excelente departamento al frente, cuenta con living, cocina comedor, dos dormitorios en
                                suite, lavadero cubierto, dos baños, 1 toilette, dos terrazas propias y dos cocheras
                                cubierta.
                            </h5>
                            <div className="pull-left">
                                <p>Precio</p>
                                <p>Código</p>
                            </div>
                            <ButtonToolbar className="pull-right">
                                <Button bsSize="large" href="/propiedades">
                                    Ver
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col sm={12} md={10} mdOffset={1}>
                <div className="content-box">
                    <Row>
                        <Col sm={3}>
                            <img src={ImgPropiedad} alt=""/>
                        </Col>
                        <Col sm={9}>
                            <h3 className="primary">Departamento en Venta Calle 55 e/ 4 y 5</h3>
                            <h5>Excelente departamento al frente, cuenta con living, cocina comedor, dos dormitorios en
                                suite, lavadero cubierto, dos baños, 1 toilette, dos terrazas propias y dos cocheras
                                cubierta.
                            </h5>
                            <div className="pull-left">
                                <p>Precio</p>
                                <p>Código</p>
                            </div>
                            <ButtonToolbar className="pull-right">
                                <Button bsSize="large">
                                    Ver
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col sm={12} md={10} mdOffset={1}>
                <div className="content-box">
                    <Row>
                        <Col sm={3}>
                            <img src={ImgPropiedad} alt=""/>
                        </Col>
                        <Col sm={9}>
                            <h3 className="primary">Departamento en Venta Calle 55 e/ 4 y 5</h3>
                            <h5>Excelente departamento al frente, cuenta con living, cocina comedor, dos dormitorios en
                                suite, lavadero cubierto, dos baños, 1 toilette, dos terrazas propias y dos cocheras
                                cubierta.
                            </h5>
                            <div className="pull-left">
                                <p>Precio</p>
                                <p>Código</p>
                            </div>
                            <ButtonToolbar className="pull-right">
                                <Button bsSize="large">
                                    Ver
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </Grid>
);

export default Resultados;
