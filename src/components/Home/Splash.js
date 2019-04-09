import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    FormGroup
} from 'react-bootstrap';
import {
    Container,
    Row,
    Col,
    Button,
    ButtonGroup,
    Input
} from 'reactstrap';

import {map} from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';
import siocLogoInicio from '../../../public/images/sonrisa-sioc.png';
import {groupedOptions} from '../../data/data';
import GoogleSearchBox from '../Maps/GoogleSearchBox';
import MultipleSearchBox from '../Maps/MultipleSearchBox';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '0.3rem',
    color: '#003d6f',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center'
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);


class Splash extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            siocId: '',
            searchParams: {
                price: {
                    min: undefined,
                    max: undefined
                },
                publicationType: 'Venta',
                agencyDwellings: false,
                currency: 'dolares',
                selectedLocations: []
            }
        };
    }

    handleSubmit() {
        const {onSearch} = this.props;
        onSearch(this.state.searchParams);
    }

    handleChange(e) {
        const {value} = e.target;
        if (value.length === 7) return;
        this.setState({
            siocId: value
        });
    }

    handleType(id, e) {
        let c_type = 'pesos'
        if (e == 'Venta') {
            c_type = 'dolares'
        }
        this.setState(
            state => ({
                searchParams: (Object.assign(state.searchParams, {[id]: e, currency: c_type}))
            })
        );
    }

    handleSelect(e) {
        const values = map(e, subtype => subtype.value);
        this.setState(
            state => ({
                searchParams: {...state.searchParams, subtype: values}
            })
        );
    }

    handleAddress(e) {

        this.setState(
            state => ({
                searchParams: {
                    ...state.searchParams, address: e.map(addr => {
                        let res = {...addr};
                        delete res.altitude;
                        delete res.latitude;
                        delete res.formatted_address;
                        return res;
                    }), selectedLocations: e.map(addr => {
                        let res = {...addr};
                        return res;
                    })
                },
            })
        );

    }

    handlePrice({target: {id, value}}, type) {
        this.setState(
            state => ({
                searchParams: {...state.searchParams, [id]: {...state.searchParams[id], [type]: value}}
            })
        );
    }

    handleKeyPress(e) {
        const {onChange} = this.props;
        const {siocId} = this.state;
        if (e.key === 'Enter') {
            onChange(siocId);
        }
    }

    render() {
        if (this.state.searchParams.publicationType === undefined) {
            this.state.searchParams.publicationType = 'Venta';
        }
        return (
            <Container className="animated fadeIn landing">
                <div className="landing-overlay">
                    <div className="color-layer"></div>
                </div>
                <Row className="centered v-center main-search">
                    <Col sm={{size: 6}} className="text-center">
                        <img src={siocLogoInicio} alt="SIOC Logo" width="180px"/>
                        <h3>
                            Miles de propiedades para <b>comprar</b>,
                            <br/> <b>vender</b> o <b>alquilar</b> te están esperando!
                        </h3>
                    </Col>
                    <Col sm={{size: 6}}>

                        <Col sm={12}>
                            <FormGroup>
                                <ButtonGroup className="d-flex">
                                    <Button
                                        outline
                                        onClick={() => this.handleType('publicationType', 'Venta')}
                                        active={this.state.searchParams.publicationType === 'Venta'}
                                    >
                                        VENTA
                                    </Button>
                                    <Button
                                        outline
                                        onClick={() => this.handleType('publicationType', 'Alquiler')}
                                        active={this.state.searchParams.publicationType === 'Alquiler'}
                                    >ALQUILER
                                    </Button>
                                </ButtonGroup>
                            </FormGroup>
                        </Col>

                        <Col sm={12}>
                            <FormGroup>
                                <MultipleSearchBox onChange={e => this.handleAddress(e)} value={[]}/>
                            </FormGroup>
                        </Col>

                        <Col sm={12}>
                            <FormGroup>
                                <Select
                                    isMulti
                                    options={groupedOptions}
                                    placeholder="Seleccione Tipo de Propiedad"
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={e => this.handleSelect(e)}
                                />
                            </FormGroup>
                        </Col>

                        <Row className="price-range">
                            <Col xs={6} style={{paddingRight: '2.5px'}}>
                                <FormGroup>
                                    <Input
                                        type="number"
                                        step={0.1}
                                        placeholder="Precio Desde"
                                        id="price"
                                        value={this.state.searchParams.price.min !== undefined ? this.state.searchParams.price.min : ''}
                                        onChange={e => this.handlePrice(e, 'min')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={6} style={{paddingLeft: '2.5px'}}>
                                <FormGroup>
                                    <Input
                                        type="number"
                                        placeholder="Precio Hasta"
                                        id="price"
                                        value={this.state.searchParams.price.max !== undefined ? this.state.searchParams.price.max : ''}
                                        onChange={e => this.handlePrice(e, 'max')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Col sm={12}>
                            <Button size="lg" block onClick={() => this.handleSubmit()}>Buscar</Button>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect(
    state => ({
        userProfile: state.user.userProfile
    }),
    null
)(Splash);
