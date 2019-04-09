import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Typeahead from '../../../common/Typeahead';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import Propiedades from '../../../Propiedades';

import {
    requestDwelling,
    requestSaveDwelling,
    savePartialDwelling,
    requestAgencies,
    requestSearchClients,
    saveVisit
} from '../../../../actions/index';

import {Visit} from '../../../../model/index';
import '../../../../sass/common.scss';

moment.locale('es');

class Card extends Component {
    static propTypes = {
        requestFindDwelling: PropTypes.func.isRequired,
        requestSearchClients: PropTypes.func.isRequired,
        requestSaveDwelling: PropTypes.func.isRequired,
        requestAgencies: PropTypes.func.isRequired,
        savePartialDwelling: PropTypes.func.isRequired,
        saveVisit: PropTypes.func.isRequired,
        clientsOptions: PropTypes.arrayOf(PropTypes.shape({})),
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        }),
        dwelling: PropTypes.shape({}),
        id: PropTypes.string,
        agencies: PropTypes.arrayOf(PropTypes.shape({})),
        visit: PropTypes.shape({})
    };

    static defaultProps = {
        dwelling: undefined,
        id: '',
        match: {},
        agencies: [],
        clientsOptions: [],
        visit: new Visit()
    };

    constructor(props) {
        super(props);
        this.state = {
            visitOrderModal: false,
            createdByModal: false,
            visit: new Visit()
        };
    }

    componentDidMount() {
        this.props.requestAgencies();

        if (this.props.match.params === undefined) {
            var id = this.props.id;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        } else {
            /* const params = new URLSearchParams(window.location.search);
            const id = params.get('id'); */
            const {id} = this.props.match.params;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        }
    }

    toggleModals(modal) {
        this.setState({
            [modal]: !this.state[modal]
        });
    }

    editar(){
        console.log("fuck");
        //console.log(this.props);
    }

    handleTypeahead(client) {
        this.setState(
            state => ({
                visit: {
                    ...state.visit,
                    client: {value: client.value, label: client.label},
                    dwelling: this.props.dwelling._id,
                    agency: {received: this.props.dwelling.agency._id}
                }
            })
        );
    }

    handleVisit({target: {id, value}}) {
        this.setState(
            state => ({
                visit: {...state.visit, [id]: value}
            })
        );
    }
    async handleSubmit() {
        await this.props.saveVisit(this.state.visit);
        this.toggleModals('visitOrderModal');
    }

    handleChange(e) {
        const dwelling = Object.assign({}, this.props.dwelling);
        dwelling.occupationStatus = e.target.value;
        dwelling.updatedAt = new Date();
        dwelling.occupationStatusHistory.push({user: this.props.userProfile, status: e.target.value});
        this.props.requestSaveDwelling(dwelling);
        this.props.savePartialDwelling(dwelling);
    }

    renderVisitOrderModal() {
        const {visit} = this.state;
        const {clientsOptions} = this.props;
        return (
            <Modal
                isOpen={this.state.visitOrderModal}
                toggle={() => this.toggleModals('visitOrderModal')}
                className={this.props.className}
            >
                <ModalHeader toggle={() => this.toggleModals('visitOrderModal')}>Pedido de Visita
                    a {this.props.dwelling.createdBy.name} {this.props.dwelling.createdBy.surname}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Typeahead
                                    label=""
                                    control="clientes"
                                    options={clientsOptions}
                                    minChar={0}
                                    onLoadOptions={term => this.props.requestSearchClients(term)}
                                    placeholder="Seleccione Cliente"
                                    value={visit.client.value ? visit.client : ''}
                                    onChange={params => this.handleTypeahead(params)}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <p> {this.props.dwelling.agency.name} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Input
                                    type="date"
                                    id="dateVisit"
                                    required
                                    onChange={e => this.handleVisit(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Input
                                    type="time"
                                    id="timeVisit"
                                    required
                                    onChange={e => this.handleVisit(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="comment"
                                    id="comment"
                                    rows="6"
                                    placeholder="Comentarios"
                                    onChange={e => this.handleVisit(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        disabled={!(visit.client.value && visit.dateVisit && visit.timeVisit)}
                        onClick={() => this.handleSubmit()}
                    >CONFIRMAR</Button>{' '}
                    <Button color="white" onClick={() => this.toggleModals('visitOrderModal')}>CANCELAR</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderCreatedByModal() {
        return (
            <Modal isOpen={this.state.createdByModal} toggle={() => this.toggleModals('createdByModal')} className={this.props.className}>
                <ModalHeader toggle={() => this.toggleModals('createdByModal')}>Creada por: <b>{this.props.dwelling.createdBy && `${this.props.dwelling.createdBy.name} ${this.props.dwelling.createdBy.surname}`}</b> </ModalHeader>
                <ModalBody>
                    <h2><b>{this.props.dwelling.agency ? this.props.dwelling.agency.name : "Sin agencia asociada" }</b></h2>
                    <h4>
                        {this.props.dwelling.createdBy && this.props.dwelling.createdBy.email} <br/>
                        {this.props.dwelling.createdBy && this.props.dwelling.createdBy.whatsapp}
                    </h4>
                </ModalBody>
            </Modal>
        );
    }

    render() {
        var id;
        if(this.props.match.params)
        {
            id = this.props.match.params;
        }


        if(this.props.id)
        {
            id = this.props.id;
        }

        let userBelongsToAgency = false;
        if (this.props.userProfile) {
            if (this.props.userProfile.role == 'admin') {
                userBelongsToAgency = true;
            }
            if (this.props.dwelling) {
                if (Object.keys(this.props.dwelling.agency).length > 0) {
                    if (this.props.dwelling.agency.auctioneers.length > 0 && !userBelongsToAgency) {
                        userBelongsToAgency = this.props.dwelling.agency.auctioneers.map(auctioneer => (auctioneer.value == this.props.userProfile._id)).includes(true);
                    }
                    if (this.props.dwelling.agency.sellers.length > 0 && !userBelongsToAgency) {
                        userBelongsToAgency = this.props.dwelling.agency.sellers.map(seller => (seller.value == this.props.userProfile._id)).includes(true);
                    }
                }
            }
        }

        return (
            <Fragment>
                <Propiedades id={id}/>
                <Row>
                    <Col sm={12} className="admin-prop-footer">
                        <div className="prop-footer-detail">
                            <h2>
                                Cargado por:
                                <a onClick={() => this.toggleModals('createdByModal')}>
                                    <b> {(this.props.dwelling && this.props.dwelling.createdBy.name) ? `${this.props.dwelling.createdBy.name}` : "No existe el dato"}</b>
                                </a>
                            </h2>
                            <p>
                                {this.props.dwelling ? moment(this.props.dwelling.createdAt).format('D MMMM YYYY, HH:mm') : "No existe el dato"}
                            </p>
                            <br/>
                            <p>
                                <em>Última modificación por: </em>
                                <b>{(this.props.dwelling && this.props.dwelling.occupationStatusHistory.length > 0) ? this.props.dwelling.occupationStatusHistory.slice(-1)[0].user.name : "Aún no ha sido modificada."}</b> {(this.props.dwelling && this.props.dwelling.occupationStatusHistory.length > 0) ? moment(this.props.dwelling.occupationStatusHistory.slice(-1)[0].modified).format('D MMMM YYYY, HH:mm') : " "}
                            </p>
                        </div>
                        <hr/>        
                        {this.props.dwelling && <h4><em>"{this.props.dwelling.privateDescription}"</em></h4>}
                        <hr/>
                        <div className="prop-footer-btns">
                            <div className="float-left inline-fix">
                                {userBelongsToAgency &&
                                <Link to={'/admin/dwellings/general?action=edit'}>
                                    <Button onClick={this.editar}>
                                        <FontAwesome name="pencil"/> {' '}
                                        Editar propiedad
                                    </Button>
                                </Link>}

                                <Col></Col>
                                {userBelongsToAgency &&
                                <FormGroup>
                                    <Input
                                        style={{backgroundColor: '#fff',border: '1px solid #003d6f',height: '30px'}}
                                        type="select"
                                        id="occupationStatus"
                                        value={this.props.dwelling ? this.props.dwelling.occupationStatus : []}
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
                                </FormGroup>}
                            </div>
                            <div className="float-right">
                                <Button onClick={() => this.toggleModals('visitOrderModal')}>
                                    <FontAwesome name="folder-open"/> {' '}
                                    Pedido de visita
                                </Button>
                            </div>
                            {this.props.dwelling && this.renderVisitOrderModal()}
                            {this.props.dwelling && this.renderCreatedByModal()}
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        clientsOptions: state.client.clientsOptions,
        dwelling: state.dwelling.dwelling,
        userProfile: state.user.userProfile,
        agencies: state.agency.agencies
    }),
    dispatch => ({
        requestFindDwelling: id => dispatch(requestDwelling(id)),
        requestSearchClients: term => dispatch(requestSearchClients(term)),
        requestSaveDwelling: dwelling => dispatch(requestSaveDwelling(dwelling)),
        savePartialDwelling: dwelling => dispatch(savePartialDwelling(dwelling)),
        requestAgencies: () => dispatch(requestAgencies()),
        saveVisit: visit => dispatch(saveVisit(visit))
    })
)(Card);
