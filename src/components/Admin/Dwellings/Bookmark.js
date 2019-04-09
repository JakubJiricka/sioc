import React, {Component} from 'react';
import {Row, Col, Card, CardText, CardTitle, CardBody, CardImg} from 'reactstrap';

class Bookmark extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="animated fadeIn">
                1 son por usuario <br/>
                2 se marcan cuando ves una propiedad y ahí se guardan <br/>
                3 ordenar segun la fecha del cliqueo de la favorita: abajo las mas viejas <br/>
                5 click para entrar en una (al detalle)<br/>
                <Row>
                    <Col sm="4">
                        <Card>
                            <CardImg
                                // eslint-disable-next-line react/jsx-max-props-per-line
                                top width="100%"
                                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                alt="Card image cap"
                            />
                            <CardBody>
                                <CardTitle> Departamento en Alquiler 54 423</CardTitle>
                                <CardText>1.000.000</CardText>
                                <CardText>
                                    <small className="text-muted pull-left">Subida hace 3 mins</small>
                                    <small className="text-muted pull-right">#321321</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Bookmark;
