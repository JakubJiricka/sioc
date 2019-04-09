import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    FormGroup,
    Button
} from 'react-bootstrap';
import {
    Container,
    Input,
    InputGroup,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import GoogleSearchBox from '../Maps/GoogleSearchBox';

class SearchModal extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        searchModal: PropTypes.string().isRequired
    };

    handleChange({target: {id, value}}) {
        this.props.onChange({[id]: value});
    }

    render() {
        const {searchParams, searchModal} = this.props;
        return (
            <Modal
                isOpen={searchModal}
                toggle={() => this.toggleModals('searchModal')}
                className="overlay-filters"
            >
                <ModalHeader toggle={() => this.toggleModals('searchModal')}>Estoy Buscando</ModalHeader>
                <ModalBody>
                    <Container className="animated fadeIn">
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <ButtonGroup className="btn-justified">
                                        <Button
                                            outline
                                        >ALQUILER
                                        </Button>
                                        <Button
                                            outline
                                        >
                                            VENTA
                                        </Button>
                                    </ButtonGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <GoogleSearchBox/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="selectMulti"
                                        id="subtype"
                                        className="multiple"
                                        multiple
                                    >
                                        <option disabled value="">Residencial</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Departamento">Departamento</option>
                                        <option value="Duplex">Duplex</option>
                                        <option value="PH">PH</option>
                                        <option value="Cabaña">Cabaña</option>
                                        <option value="Piso">Piso</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="selectMulti"
                                        id="subtype"
                                        className="multiple"
                                        multiple
                                    >
                                        <option disabled value="">Comercial</option>
                                        <option value="Local">Local</option>
                                        <option value="Campo">Campo</option>
                                        <option value="Cochera">Cochera</option>
                                        <option value="Terreno">Terreno</option>
                                        <option value="Oficina">Oficina</option>
                                        <option value="Galpón">Galpón</option>
                                        <option value="Edificio">Edificio</option>
                                        <option value="Fondo de Comercio">Fondo de Comercio</option>
                                        <option value="Depósito">Depósito</option>
                                        <option value="Industriales">Industriales</option>
                                        <option value="Countries y Barrios">Countries y Barrios</option>
                                        <option value="Fracciones">Fracciones</option>
                                        <option value="Depósito">Depósito</option>
                                        <option value="Otros">Otros</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupButtonDropdown
                                            addonType="append"
                                        >
                                            <DropdownToggle caret/>
                                            <DropdownMenu>
                                                <DropdownItem onClick={e => this.selectCurrency(e)}>US$
                                                </DropdownItem>
                                                <DropdownItem onClick={e => this.selectCurrency(e)}>$
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </InputGroupButtonDropdown>
                                        <Input
                                            type="number"
                                            placeholder="Precio"
                                        />

                                        <InputGroupButtonDropdown
                                            addonType="append"
                                            isOpen={this.state.dropDownOpen2}
                                            toggle={() => this.toggleDropDown('dropDownOpen2')}
                                        >
                                            <DropdownToggle caret/>
                                            <DropdownMenu>
                                                <DropdownItem onClick={e => this.selectPricing(e)}>
                                                    Por Día
                                                </DropdownItem>
                                                <DropdownItem onClick={e => this.selectPricing(e)}>
                                                    Por Semana
                                                </DropdownItem>
                                                <DropdownItem onClick={e => this.selectPricing(e)}>
                                                    Por Mes
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </InputGroupButtonDropdown>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        id="occupationStatus"
                                    >
                                        <option disabled value="">Estado Ocupacional</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Alquilada">Alquilada</option>
                                        <option value="Vendida">Vendida</option>
                                        <option value="Reservada">Reservada</option>
                                        <option value="Suspendida">Suspendida</option>
                                        <option value="Tasaciones">Tasaciones</option>
                                        <option value="Eliminada">Eliminada</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => this.toggleModals('searchModal')}
                        className="btn-submit-search"
                    >Confirmar
                    </Button>{' '}
                    <Button
                        onClick={() => this.toggleModals('searchModal')}
                        className="btn-decline-search"
                    >Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default SearchModal;
