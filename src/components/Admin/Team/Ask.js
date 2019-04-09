import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typeahead from '../../common/Typeahead';
import moment from 'moment';
import {
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    ListGroup,
    ListGroupItem,
    Collapse,
    Button,
     Modal,
     ModalHeader,
     ModalBody,
     ModalFooter,
     FormGroup,
     Input
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import {requestVisits, requestMoreVisits, changeVisitStatus,requestSearchClients,saveVisit,updateVisit,requestUsersByRole} from '../../../actions';
import Card from '../Dwellings/DwellingEditor/Card';
import Propiedades from '../../Propiedades';
class ListTeam extends React.Component {
    static propTypes = {
        requestVisits: PropTypes.func.isRequired,
        requestMoreVisits: PropTypes.func.isRequired,
        changeVisitStatus: PropTypes.func.isRequired,
        requestSearchUsers: PropTypes.func.isRequired,
        requestUsersByRole: PropTypes.func.isRequired,
        newVisits: PropTypes.arrayOf(PropTypes.shape({})),
        confirmedVisits: PropTypes.arrayOf(PropTypes.shape({})),
        finalizedVisits: PropTypes.arrayOf(PropTypes.shape({})),
        cancelledVisits: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        requestSearchClients: PropTypes.func.isRequired,
        saveVisit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        newVisits: [],
        confirmedVisits: [],
        finalizedVisits: [],
        cancelledVisits: [],
        friendvisit:[]
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            nuevo: [],
            confirmado: [],
            finalizado: [],
            cancelado: [],
            transferir:[],
            page: {
                nuevo: {pageNumber: 0},
                confirmado: {pageNumber: 0},
                finalizado: {pageNumber: 0},
                cancelado: {pageNumber: 0},
                perPage: 5
            },
            dwelling:{createdBy:{},client:{},agency:{}},
            activeTab: 'nuevo'
        };

        if(window.location.search)
        {
            this.state.username = window.location.search.split('=')[1];
        }
    }
     renderdwelling(dwelling)
    {
        let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
        let detail_url = `/admin/dwellings/card/${dwelling._id}`;
        return (
            <div className="highlights">
            <Row className="highlights-main">
                <Col className="prop-listing-margin-fix" sm={12} md={12} key={dwelling._id}>
                    <div className="highlight-box"
                         onClick={() => this.props.history.push(detail_url)}>
                        <div className="prop-detail-btns">
                            <Button className="goto">
                                <FontAwesome name="map-marker"/>
                                <small style={{color: '#fff'}}> {dwelling.address?dwelling.address.city:''} </small>
                            </Button>
                        </div>
                        <div
                            className="img"
                            style={{
                                width: '100%',
                                height: '200px',
                                backgroundSize: 'cover',
                                backgroundImage: 'url("' + img_url + '")'
                            }}
                        />
                        <Row className="highlight-body">
                            <Col sm={12}>
                                {dwelling.price ?
                                    <h3>
                                        <small>{dwelling.currency}</small>
                                        {dwelling.price}
                                    </h3>
                                    : <h3>Consulte</h3>}
                                <h4 className="primary">
                                    {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus} en {dwelling.addresss?dwelling.address.streetName:''}
                                </h4>
                            </Col>
                            <Col sm={12}>
                                <span className="pull-left">
                                    {console.log(dwelling)}
                                    {dwelling.createdAt !== dwelling.updatedAt ?
                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}
                                </span>
                                <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </div>
            );
    }

    handleVisit({target: {id, value}}) {
        var dwelling = this.state;
        dwelling.dwelling[id] = value;
        this.setState(dwelling);
    }


    async handleSubmit() {
        var sends = this.state.dwelling;
        sends.client = this.state.partnerclient;
        sends.status = 'friendShare';

        //this.state.partnerclient.value = Number(this.state.partnerclient.value);
        //console.log(sends);
         var senddata = {
            client:this.state.partnerclient,
            dwelling:sends.dwelling._id,
            dateVisit:sends.dateVisit,
            timeVisit:sends.timeVisit,
            agency:{
                requested:sends.agency.requested._id,
                received:sends.agency.received._id
            },
            _id:sends._id,
            comment:sends.comment,
            status:'friendShare'
        }

        await this.props.updateVisit(senddata);

        this.toggleModals('visitOrderModal');
    }

    async handleEdit()
    {
        console.log(this.state.dwelling);
        await this.props.updateVisit(this.state.dwelling);
        this.toggleModals('editmodal');
    }
    handleTypeahead(client) {
        //console.log(client);
        var state = this.state;
        state.partnerclient = client;
        this.setState(state);
    }

    toggleModals(modal,dwelling = null) {
        var state = this.state;
        if(dwelling)
        {
            state.dwelling = dwelling;
            state.dwelling.dateVisit = state.dwelling.dateVisit.split('T')[0];
            state.display = true;
            state.partnerclient = '';
        }
        state[modal] = !this.state[modal];
        this.setState(state);
    }

    renderVisitOrderModal() {
        var visit = this.state.dwelling;

        if(!visit.agency.received)
        {
            visit.agency.received = {};
        }
        const clientsOptions = [];

        if(this.props.usersByRole)
        {
            this.props.usersByRole.map(function(value){
                clientsOptions.push({
                    value:value._id,
                    label:value.surname + ' ' + value.name
                })
            })
        }

        return (
            <Modal
                isOpen={this.state.visitOrderModal}
                toggle={() => this.toggleModals('visitOrderModal')}
                className={this.props.className}
            >
                <ModalHeader toggle={() => this.toggleModals('visitOrderModal')}>Pedido de Visita
                    a {this.state.dwelling.dwelling?this.state.dwelling.dwelling.createdBy.name + ' ' + this.state.dwelling.dwelling.createdBy.surname:''}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Typeahead
                                    label=""
                                    control="clientes"
                                    options={clientsOptions}
                                    minChar={0}
                                    onLoadOptions={term => this.props.requestSearchClients(term)}
                                    placeholder="seleccione compañero"
                                    value={this.state.partnerclient?this.state.partnerclient:''}
                                    onChange={params => this.handleTypeahead(params)}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => this.handleSubmit()}
                    >Transfer</Button>{' '}
                    <Button color="white" onClick={() => this.toggleModals('visitOrderModal')}>CANCELAR</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderEdit()
    {
        var visit = this.state.dwelling;

        var state = this.state;

        if(!visit.agency.received)
        {
            visit.agency.received = {};
        }

        const clientsOptions = visit.agency.received.clients?visit.agency.received.clients:{};

        console.log(clientsOptions);
        return (
            <Modal
                isOpen={this.state.editmodal}
                toggle={() => this.toggleModals('editmodal')}
                className={this.props.className}
            >
                <ModalHeader toggle={() => this.toggleModals('editmodal')}>Pedido de Visita
                    a {this.state.dwelling.createdBy.name} {this.state.dwelling.createdBy.surname}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Input
                                    type="date"
                                    id="dateVisit"
                                    required
                                    onChange={e => this.handleVisit(e)}
                                    value = {this.state.dwelling.dateVisit}
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
                                    value={this.state.dwelling.timeVisit}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => this.handleEdit()}
                    >Updatar</Button>{' '}
                    <Button color="white" onClick={() => this.toggleModals('editmodal')}>CANCELAR</Button>
                </ModalFooter>
            </Modal>
        );

    }
    async componentDidMount() {
        await this.props.requestVisits({
            pageNumber: this.state.page.nuevo.pageNumber, perPage: this.state.page.perPage, status: 'nuevo'
        });
        await this.props.requestVisits({
            pageNumber: this.state.page.confirmado.pageNumber, perPage: this.state.page.perPage, status: 'confirmado'
        });
        await this.props.requestVisits({
            pageNumber: this.state.page.finalizado.pageNumber, perPage: this.state.page.perPage, status: 'finalizado'
        });
        await this.props.requestVisits({
            pageNumber: this.state.page.cancelado.pageNumber, perPage: this.state.page.perPage, status: 'cancelado'
        });

        await this.props.requestVisits({
            pageNumber: this.state.page.cancelado.pageNumber, perPage: this.state.page.perPage, status: 'friendShare'
        })

        const role = 'vendedor';
        this.props.requestUsersByRole(role);
    }

    toggleCollapse(index, activeTab) {
        if(this.state.display)
        {
            var state = this.state;
            state.display = false;
            this.setState(state);
            return;
        }
        this.setState(
            state => ({
                [activeTab]: {...state[activeTab], [index]: !this.state[activeTab][index]}
            })
        );
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    renderdwelling(dwelling)
    {
        let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
                            let detail_url = this.props.userProfile ? ['admin', 'martillero', 'vendedor'].includes(this.props.userProfile.role) ?
                                `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
        return (
            <div className="highlights">
            <Row className="highlights-main">
                <Col className="prop-listing-margin-fix" sm={12} md={12} key={dwelling._id}>
                    <div className="highlight-box"
                         onClick={() => this.props.history.push(detail_url)}>
                        <div className="prop-detail-btns">
                            <Button className="goto">
                                <FontAwesome name="map-marker"/>
                                <small style={{color: '#fff'}}> {dwelling.address?dwelling.address.city:''} </small>
                            </Button>
                        </div>
                        <div
                            className="img"
                            style={{
                                width: '100%',
                                height: '200px',
                                backgroundSize: 'cover',
                                backgroundImage: 'url("' + img_url + '")'
                            }}
                        />
                        <Row className="highlight-body">
                            <Col sm={12}>
                                {dwelling.price ?
                                    <h3>
                                        <small>{dwelling.currency}</small>
                                        {dwelling.price}
                                    </h3>
                                    : <h3>Consulte</h3>}
                                <h4 className="primary">
                                    {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus} en {dwelling.addresss?dwelling.address.streetName:''}
                                </h4>
                            </Col>
                            <Col sm={12}>
                                <span className="pull-left">
                                    {dwelling.createdAt !== dwelling.updatedAt ?
                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}
                                </span>
                                <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </div>
            );
    }

    loadMoreVisits(activeTab) {
        const page = this.state.page[activeTab].pageNumber + 1;
        this.setState(
            state => ({
                page: {
                    ...state.page,
                    [activeTab]: {...state.page[activeTab], pageNumber: page}
                }
            })
        );
        this.props.requestMoreVisits({
            pageNumber: page, perPage: this.state.page.perPage, status: activeTab
        });
    }

    handleStatus(newStatus, visitId) {
        this.props.changeVisitStatus({status: newStatus, id: visitId});
        //this.props.history.push('/admin/team/ask');
        window.location.reload();
    }

    handleDisplay(id){
        var state = this.state;
        if(state[id])
        {
            state[id] = false;
        }
        else
        {
            state[id] = true;
        }

        state.display = true;
        this.setState(state);
        return false;
    }

    renderContent(visits) {
        return (
            <Fragment>
                {visits.map((visit, index) => (
                    <ListGroup key={visit._id} className="mb-2" >
                        <ListGroupItem
                            tag="span"
                            action
                            onClick={() => this.toggleCollapse(index, this.state.activeTab)}
                        >
                            <div>
                                <h4>Pedido de visita {visit.client?'a:':'de:'} <b>{visit.client?visit.dwelling.createdBy.name + ' ' + visit.dwelling.createdBy.surname:visit.createdBy.name + ' ' + visit.createdBy.surname}</b> de {visit.client?visit.agency.received.name:visit.agency.requested.name} </h4>
                                <h4>{moment.utc(new Date(visit.dateVisit)).format('dddd D MMMM')} {visit.timeVisit}hs. - {visit.dwelling.address.streetName}, {visit.dwelling.address.city} - <b>Cod. {visit.dwelling.siocId}</b></h4>
                            </div>
                            <Collapse isOpen={this.state[this.state.activeTab][index]}>
                                <Row>
                                    <Col sm="6">
                                        <Row>
                                            <Col sm="12">
                                                <hr/>
                                            </Col>
                                            <Col sm="6">
                                                {visit.client?'Cliente Interesado':'propietario'}
                                                <h4>{visit.client?visit.client.label:visit.dwelling.client.label}</h4>
                                            </Col>
                                            <Col sm="12">
                                                <hr/>
                                            </Col>

                                            <Col sm="12">
                                                Observaciones:
                                                <h4>{visit.comment}</h4>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm="6">
                                        {this.renderdwelling(visit.dwelling)}
                                    </Col>
                                </Row>

                                <Col sm="12" className="clearfix mt-4 mb-4">
                                    <div className="float-left">
                                        <Button color="light" onClick = {()=>this.toggleModals('editmodal',visit)}>Editar Fecha</Button>{' '}
                                        <Button color="light"
                                                onClick={() => this.handleStatus('confirmado', visit._id)}>Confirmar</Button>{' '}
                                        <Button color="light"
                                                onClick={() => this.handleStatus('finalizado', visit._id)}>Finalizar</Button>
                                        <Button color="light"
                                                onClick={() => this.toggleModals('visitOrderModal',visit)}>Transferir</Button>
                                    </div>
                                    <div className="float-right">
                                        <Button color="danger"
                                                onClick={() => this.handleStatus('cancelado', visit._id)}>Cancelar</Button>{' '}
                                    </div>
                                </Col>
                                {
                                    this.state[visit.dwelling._id]?

                                        this.renderdwelling(visit.dwelling)
                                    :
                                        ''
                                }
                                {this.renderVisitOrderModal()}
                                {this.renderEdit()}
                            </Collapse>
                        </ListGroupItem>
                    </ListGroup>))}
                <Button
                    className="mt-3"
                    color="light"
                    onClick={() => this.loadMoreVisits(this.state.activeTab)}
                >
                    Cargar más <FontAwesome name="angle-down"/>
                </Button>
            </Fragment>

        );
    }

    render() {

        var newvisit = this.props.newVisits;
        var friendvisit = this.props.friendvisit;

        console.log('friend');
        console.log(friendvisit.length);


        // console.log('friend');
        // console.log(this.props.friendvisit);

        //var userProfile = this.props.userProfile;
        friendvisit.map(function(value,index){
            if(!value.client)
            {
                newvisit.push(value);
                friendvisit.splice(index,1);
            }
        })

        console.log('new');
        console.log(newvisit);
        return (
            <Container fluid className="animated fadeIn ask">
                <h3>Pedidos de Visita {this.state.username?'a ' + this.state.username:''}</h3>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'nuevo'})}
                            onClick={() => {
                                this.toggle('nuevo');
                            }}
                        >
                            Nuevos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'confirmado'})}
                            onClick={() => {
                                this.toggle('confirmado');
                            }}
                        >
                            Confirmados
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'finalizado'})}
                            onClick={() => {
                                this.toggle('finalizado');
                            }}
                        >
                            Finalizados
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'transferir'})}
                            onClick={() => {
                                this.toggle('transferir');
                            }}
                        >
                            Transferidos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === 'cancelado'})}
                            onClick={() => {
                                this.toggle('cancelado');
                            }}
                        >
                            Cancelados
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="nuevo">
                        {this.props.newVisits && this.renderContent(newvisit)}
                    </TabPane>
                    <TabPane tabId="confirmado">
                        {this.props.confirmedVisits && this.renderContent(this.props.confirmedVisits)}
                    </TabPane>
                    <TabPane tabId="finalizado">
                        {this.props.finalizedVisits && this.renderContent(this.props.finalizedVisits)}
                    </TabPane>
                    <TabPane tabId="cancelado">
                        {this.props.cancelledVisits && this.renderContent(this.props.cancelledVisits)}
                    </TabPane>
                    <TabPane tabId="transferir">
                        {this.renderContent(friendvisit)}
                    </TabPane>
                </TabContent>
            </Container>
        );
    }
}

export default connect(
    state => ({
        clientsOptions: state.client.clientsOptions,
        newVisits: state.visit.newVisits,
        confirmedVisits: state.visit.confirmedVisits,
        finalizedVisits: state.visit.finalizedVisits,
        cancelledVisits: state.visit.cancelledVisits,
        friendvisit:state.visit.friendVisits?state.visit.friendVisits:[],
        usersByRole: state.user.usersByRole,
        userProfile:state.user.userProfile
    }),
    dispatch => ({
        requestVisits: searchParams => dispatch(requestVisits(searchParams)),
        changeVisitStatus: visit => dispatch(changeVisitStatus(visit)),
        requestMoreVisits: searchParams => dispatch(requestMoreVisits(searchParams)),
        requestSearchClients: term => dispatch(requestSearchClients(term)),
        saveVisit: visit => dispatch(saveVisit(visit)),
        updateVisit:visit => dispatch(updateVisit(visit)),
        requestUsersByRole: role => dispatch(requestUsersByRole(role))
    })
)(ListTeam);
