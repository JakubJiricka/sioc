import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {requestSearchUsers, requestSaveAgency, clearUsers, clearAgencySaved} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Agency} from '../../../model/index';

class Edit extends Component {
    static propTypes = {
        requestSearchUsers: PropTypes.func.isRequired,
        requestSaveAgency: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        clearUsers: PropTypes.func.isRequired,
        captainUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        auctioneersUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        sellersUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        agency: PropTypes.shape({})
    };

    static defaultProps = {
        agency: new Agency(),
        captainUsersOptions: [],
        auctioneersUsersOptions: [],
        sellersUsersOptions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            agency: this.props.location.state.agency
        };
    }

    componentDidMount() {
        this.props.clearUsers();
    }

    handleCaptain(user, type) {
        this.setState(
            state => ({
                agency: {
                    ...state.agency,
                    [type]: {...state.agency[type], value: user.value, label: user.label}
                }
            })
        );
    }

    handleChange(users, type) {
        if (type === 'sellers') {
            const sellers = users;
            this.setState(
                state => ({
                    agency: {
                        ...state.agency,
                        sellers
                    }
                })
            );
        }
        if (type === 'auctioneers') {
            const auctioneers = users;
            this.setState(
                state => ({
                    agency: {
                        ...state.agency,
                        auctioneers
                    }
                })
            );
        }
    }

    handleInput(e, id) {
        this.setState(
            state => ({
                agency: (Object.assign(state.agency, {[id]: e}))
            })
        );
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            return;
        }
        event.preventDefault();
        const {agency} = this.state;
        this.props.requestSaveAgency(agency);
        this.props.history.push('/admin/team/list');
    }

    render() {
        const {auctioneersUsersOptions, sellersUsersOptions, captainUsersOptions} = this.props;
        //const {saved, unsaved} = this.props;
        const {agency} = this.state;

        /*if (saved) {
            this.props.clearAgencySaved();
            this.props.history.push('/admin/team/list');
        }

        if (unsaved) {
            this.props.clearAgencySaved();
            this.setState({'unsaved': unsaved});
        }*/

        return (
            <Container className="animated fadeIn">
                <Form
                    className="form"
                    onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col sm="12">
                            <h2 className="pull-left">Editar Inmobiliaria</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Label>Nombre de Inmobiliaria</Label>
                                <Input
                                    type="text"
                                    placeholder="Ingrese Nombre de la inmobiliaria"
                                    value={agency.name}
                                    onChange={e => this.handleInput(e.target.value, 'name')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                Dirección
                                <GoogleSearchBox
                                    address={agency.address}
                                    onChange={e => this.handleInput(e, 'address')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>E-mail</Label>
                                <Input
                                    type="email"
                                    placeholder="Ingrese Email de la inmobiliaria"
                                    value={agency.email}
                                    onChange={e => this.handleInput(e.target.value, 'email')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Whatsapp</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese Whatsapp de la inmobiliaria"
                                    value={agency.whatsapp}
                                    onChange={e => this.handleInput(e.target.value, 'whatsapp')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <Input
                                    type="phone"
                                    placeholder="Ingrese Teléfono de la inmobiliaria"
                                    value={agency.phone}
                                    onChange={e => this.handleInput(e.target.value, 'phone')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Typeahead
                                    label="Martillero"
                                    isMulti
                                    control="auctioneers"
                                    options={auctioneersUsersOptions}
                                    onLoadOptions={term => this.props.requestSearchUsers(term, 'martillero')}
                                    placeholder="Seleccione usuario"
                                    value={agency.auctioneers}
                                    onChange={params => this.handleChange(params, 'auctioneers')}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Typeahead
                                    label="Capitán"
                                    control="users"
                                    options={captainUsersOptions}
                                    onLoadOptions={term => this.props.requestSearchUsers(term, 'capitan')}
                                    placeholder="Seleccione usuario"
                                    value={agency.captain}
                                    onChange={params => this.handleCaptain(params, 'captain')}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <FormGroup>
                                <Typeahead
                                    label="Vendedores"
                                    isMulti
                                    control="sellers"
                                    options={sellersUsersOptions}
                                    onLoadOptions={term => this.props.requestSearchUsers(term, 'vendedor')}
                                    placeholder="Seleccione usuario"
                                    value={agency.sellers}
                                    onChange={params => this.handleChange(params, 'sellers')}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            Cargar Img Logo <br/>
                            ...
                        </Col>
                    </Row>
                    {this.state.unsaved&&
                    <Row>
                        <Alert color="danger">
                            Email already exists
                        </Alert>
                    </Row>}
                    <Row>
                        <div className="pull-right">
                            <Button
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </div>
                        <div className="pull-right">
                            <Button style={{marginLeft: '10px'}}
                                color="second"
                                onClick={() => this.props.history.push('/admin/team/list')}
                            >
                                Volver
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default connect(
    state => ({
        saving: state.agency.saving,
        saved: state.agency.saved,
        unsaved: state.agency.unsaved,
        auctioneersUsersOptions: state.user.auctioneersUsersOptions,
        captainUsersOptions: state.user.captainUsersOptions,
        sellersUsersOptions: state.user.sellersUsersOptions
    }),
    dispatch => ({
        requestSearchUsers: (term, userType) => dispatch(requestSearchUsers(term, userType)),
        requestSaveAgency: agency => dispatch(requestSaveAgency(agency)),
        clearAgencySaved: () => dispatch(clearAgencySaved()),
        clearUsers: () => dispatch(clearUsers())
    })
)(Edit);
