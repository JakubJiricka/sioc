import React, {Component} from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, Collapse, Button, ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export default class Nuevos extends Component{
  constructor(props){
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapse:false
    }
  }
  toggleCollapse(){
     this.setState({ collapse: !this.state.collapse });
  }

  render(){
    return (       
      <ListGroup>
          <ListGroupItem tag="button" action onClick={this.toggleCollapse}>
              Fecha/hora - <em>Dirección</em> - <b>Cod. 321321</b>
              <Collapse isOpen={this.state.collapse} style={{ padding: '25px'}}>
                  <Row>
                    <Col sm="12"><hr/></Col>
                      <Col sm="12">
                          Interesado
                          <h3>Nombre_del_cliente</h3>
                      </Col>
                      <Col sm="3">
                          Vendedor
                          <h4>vendedor que solicita desde la ficha</h4>
                      </Col>
                      <Col sm="3">
                          Visitador
                          <h4>vendedor que hará la visita</h4>
                      </Col>
                      <Col sm="3">
                          Inmobiliaria
                          <h4>que posee la propiedad</h4>
                      </Col>
                      <Col sm="3">
                          Propietario
                          <h4>cliente perez</h4>
                      </Col>
                      <Col sm="3">
                          Prop. Cargada por
                          <h4>nombre del que cargó la ficha</h4>
                      </Col>
                      <Col sm="12"><hr/></Col>
                      <Col sm="12" className="clearfix">
                        <div className="float-left">
                          <Button color="light">Editar Fecha</Button>{' '}
                          <Button color="light">Confirmar</Button>{' '}
                        </div>
                        <div className="float-right">
                          <Button color="light">Finalizar</Button>
                        </div>
                      </Col>
                  </Row>
              </Collapse>
          </ListGroupItem>
      </ListGroup>
      )
  }
}
