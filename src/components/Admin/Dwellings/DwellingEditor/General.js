/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
    Row,
    Col,
    Container,
    InputGroup,
    InputGroupButtonDropdown,
    FormGroup,
    DropdownMenu,
    ButtonGroup,
    DropdownItem,
    Button,
    DropdownToggle,
    Input,
    Tooltip
} from 'reactstrap';

import {requestSearchClients, savePartialDwelling, requestAgencies} from '../../../../actions/index';
import GoogleSearchBox from '../../../Maps/DwellingGoogleSearchBox';
import {Dwelling} from '../../../../model/index';
import Typeahead from '../../../common/Typeahead';

class General extends Component {
    static propTypes = {
        savePartialDwelling: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwelling: PropTypes.shape({}),
        agencies: PropTypes.arrayOf(PropTypes.shape({}))

    };

    static defaultProps = {
        dwelling: new Dwelling()
    };

    constructor(props) {
        super(props);

        this.state = {
            dwelling: new Dwelling(),
            tooltipOpen: false
        };
        
        if (this.props.dwelling && (window.location.prev == "general" || window.location.search == "?action=edit")) {
            this.state = this.props;
            window.location.prev = '';
        }

    }

    componentDidMount() {
        this.props.requestAgencies();
    }

    componentWillUnmount() {
        if (this.state.tooltipOpen) {
            this.state.tooltipOpen = false;
        }
    }

    handleChange({target: {id, value}}) {
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, {[id]: value}))
            })
        );
    }

    handleSubType({target: {id, value}}, type) {
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling,
                    {[id]: value},
                    {type}
                ))
            })
        );
    }

    handleToggle(e, id) {
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, {[id]: e}))
            })
        );
    }

    selectCurrency(event) {
        const currency = event.target.innerText;
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling,
                    {dropDownOpen: state.dwelling.dropDownOpen},
                    {currency}))
            })
        );
    }

    selectPricing(event) {
        const pricingType = event.target.innerText;
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling,
                    {dropDownOpen2: state.dwelling.dropDownOpen2},
                    {pricingType}))
            })
        );
    }

    toggleDropDown(id) {
        this.setState(prevState => ({
            [id]: !prevState[id]
        }));
    }

    handleType(id, e) {
        let currency;
        if (e === 'Venta') {
            currency = 'US$';
        } else {
            currency = '$';
        }
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling,
                    {[id]: e},
                    {currency}
                ))
            })
        );
    }


    handleSubmit() {
        const {dwelling} = this.state;
        this.setState(
            state => ({
                dwelling: {...state.dwelling, createdBy: this.props.userProfile}
            })
        );
        dwelling.createdBy = this.props.userProfile;

        if (dwelling.agency) {
            this.props.savePartialDwelling(dwelling);
            this.props.history.push('/admin/dwellings/characteristics');
        }
    }

    handleTypeahead(client) {
        this.setState(
            state => ({
                dwelling: {...state.dwelling, client: {value: client.value, label: client.label}}
            })
        );
    }

    handleSelect(e) {
        let agency = this.props.agencies.filter(item => {
            if (item._id == e.value) return item;
            return null;
        });

        this.setState(
            state => ({
                dwelling: {...state.dwelling, agency: agency[0]}
            })
        );
    }

    render() {
        if (!this.state.dwelling.occupationStatus) {
            this.state.dwelling.occupationStatus = 'Disponible';
        }
        if (!this.state.dwelling.pricingType && this.state.dwelling.publicationType === 'Alquiler') {
            this.state.dwelling.pricingType = 'Por Mes';
        }
        if (!this.state.dwelling.price) {
            this.state.dwelling.price = undefined;
        }
        if (!this.state.dwelling.publicationType) {
            this.state.dwelling.publicationType = 'Alquiler';
        }
        if (!this.state.dwelling.subtype) {
            this.state.dwelling.subtype = 'Casa';
        }
        if (!this.state.dwelling.type) {
            this.state.dwelling.type = 'Residencial';
        }
        const {dwelling, client} = this.state;
        const {clientsOptions} = this.props;

        let AgencyOptions = [];
        if (this.props.agencies) {
            for (let i = 0; i < this.props.agencies.length; i++) {

                let item = {
                    value: this.props.agencies[i]._id,
                    label: this.props.agencies[i].name
                };

                if (this.props.userProfile && (this.props.userProfile.role == 'admin'
                    || (this.props.userProfile.role != 'user' && this.props.agencies[i].auctioneers.length > 0
                        && this.props.agencies[i].auctioneers.map(auctioneer => (auctioneer.value.role == this.props.userProfile.role)).includes(true))
                    || (this.props.userProfile.role != 'user' && this.props.agencies[i].sellers.length > 0
                        && this.props.agencies[i].sellers.map(seller => (seller.value.role == this.props.userProfile.role)).includes(true))
                    )) {
                    AgencyOptions.push(item);
                }
            }
        }

        return (
            <Container fluid className="animated fadeIn mt-3">
                <Row>
                    <Col md={12}>
                        <Typeahead
                            control="clientes"
                            options={clientsOptions}
                            onLoadOptions={term => this.props.requestSearchClients(term)}
                            placeholder="Indique Propietario"
                            value={dwelling.client.label ? dwelling.client : ''}
                            onChange={params => this.handleTypeahead(params)}
                            removeSelected
                        />
                    </Col>
                    {this.props.userProfile && this.props.userProfile.role == 'admin' &&
                    <Col md={6}>
                        <FormGroup>
                            <Select
                                options={AgencyOptions}
                                placeholder="Seleccione Inmobiliaria"
                                value={this.props.dwelling.agency ? this.props.dwelling.agency.name : ''}
                                onChange={e => this.handleSelect(e)}
                            />
                        </FormGroup>
                    </Col>
                    }
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <ButtonGroup className="btn-justified">
                                <Button
                                    outline
                                    onClick={() => this.handleType('publicationType', 'Venta')}
                                    active={this.state.dwelling.publicationType === 'Venta'}
                                >VENTA
                                </Button>
                                <Button
                                    outline
                                    onClick={() => this.handleType('publicationType', 'Alquiler')}
                                    active={this.state.dwelling.publicationType === 'Alquiler'}
                                >ALQUILER
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <GoogleSearchBox
                                address={dwelling.address}
                                onChange={e => this.handleToggle(e, 'address')}
                            />
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
                                value={dwelling.subtype}
                                onChange={e => this.handleSubType(e, 'Residencial')}
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
                                value={dwelling.subtype}
                                onChange={e => this.handleSubType(e, 'Comercial')}
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
                                    isOpen={this.state.dropDownOpen}
                                    toggle={() => this.toggleDropDown('dropDownOpen')}
                                >
                                    <DropdownToggle caret style={{borderBottomLeftRadius:'3px',borderTopLeftRadius:'3px'}}>
                                        {dwelling.currency}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={e => this.selectCurrency(e)}>US$</DropdownItem>
                                        <DropdownItem onClick={e => this.selectCurrency(e)}>$</DropdownItem>
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>
                                <Input
                                    type="number"
                                    placeholder="Precio"
                                    value={[dwelling.price]}
                                    onChange={e => this.handleToggle(e.target.value, 'price')}
                                    style={{fontWeight: 'bold'}}
                                />
                                {dwelling.publicationType === 'Alquiler' &&
                                <InputGroupButtonDropdown
                                    addonType="append"
                                    isOpen={this.state.dropDownOpen2}
                                    toggle={() => this.toggleDropDown('dropDownOpen2')}
                                >
                                    <DropdownToggle caret>
                                        {dwelling.pricingType}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={e => this.selectPricing(e)}>Por Día</DropdownItem>
                                        <DropdownItem onClick={e => this.selectPricing(e)}>Por Semana</DropdownItem>
                                        <DropdownItem onClick={e => this.selectPricing(e)}>Por Mes</DropdownItem>
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>}
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
                                value={dwelling.occupationStatus}
                                onChange={e => this.handleChange(e)}
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
                <div className="padding-sm"></div>

                    {/*<Col sm={4}></Col>
                    <Col sm={4} className="multi-steps">
                        <ol className="in-multi-steps text-top">
                            <li className="current">
                                <span>
                                    <FontAwesome
                                        name="home"
                                        style={{color: 'rgba(0,0,0,.3)'}}
                                    />
                                </span>
                            </li>
                            <li className="">
                                <span>
                                    <FontAwesome
                                        name="cog"
                                        spin
                                        style={{color: 'rgba(0,0,0,.3)'}}
                                    />
                                </span>
                            </li>
                            <li><span><FontAwesome name="check-square" style={{color: 'rgba(0,0,0,.3)'}}/></span></li>
                        </ol>
                    </Col>*/}
                    <div className="pull-right float-btns">
                        <Tooltip
                            placement="top"
                            isOpen={this.state.tooltipOpen}
                            target="Next"
                            toggle={() => this.toggleDropDown('tooltipOpen')}
                        >
                            Complete todos los campos para continuar
                        </Tooltip>
                        <span id="Next" className="add-dwelling-info"><FontAwesome name="info"/>&nbsp;&nbsp;</span>
                        <Button
                            className="next"
                            size="lg"
                            disabled={!(dwelling.address.streetName && dwelling.price && dwelling.subtype && dwelling.client.value)}
                            onClick={() => this.handleSubmit()}
                        >
                            <FontAwesome name="angle-right"/>
                        </Button>
                    </div>
            </Container>
        );
    }
}

export default connect(
    state => ({
        clientsOptions: state.client.clientsOptions,
        dwelling: state.dwelling.dwelling,
        agencies: state.agency.agencies,
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestSearchClients: term => dispatch(requestSearchClients(term)),
        savePartialDwelling: dwelling => dispatch(savePartialDwelling(dwelling)),
        requestAgencies: () => dispatch(requestAgencies())
    })
)(General);
