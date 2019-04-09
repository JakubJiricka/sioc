import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {map, includes} from 'lodash';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Collapse,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestAgencies, requestDeleteAgency} from '../../../actions';
import nav from "../../App/Sidebar/_nav";

class ListTeam extends Component {
    static propTypes = {
        requestAgencies: PropTypes.func.isRequired,
        agencies: PropTypes.arrayOf(PropTypes.shape({})),
        requestDeleteAgency: PropTypes.func.isRequired
    };

    static defaultProps = {
        agencies: null
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            delAgencyIndex: null
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.requestAgencies();
    }

    editAgency(agency) {
        this.props.history.push({pathname: '/admin/team/edit', state: {agency}});
    }

    deleteAgencyConfirm(e, index) {
        e.stopPropagation();
        this.setState({delAgencyIndex: index});
        this.toggle();
    }

    deleteAgency() {
        this.props.requestDeleteAgency(this.props.agencies[this.state.delAgencyIndex]);
        this.toggle();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleCollapse(index) {
        this.setState({
            [index]: !this.state[index]
        });
    }

    renderContent() {
        const {agencies} = this.props;
        return (
            <div>
                {agencies.filter(agency => {
                    return !agency.deleted;
                }).map((agency, index) => (
                    <ListGroup key={agency._id} className="inmobs">
                        <ListGroupItem
                            action
                            onClick={() => this.toggleCollapse(index)}
                        >
                            <h4 className="title">{agency.name ? agency.name : 'Inmobiliaria sin Nombre'}</h4>
                            <Collapse className="animated fadeIn" isOpen={this.state[index]}>
                                <hr/>
                                <Row>
                                    <Col sm="12">
                                        <p>Martillero</p>
                                        <h3>
                                            {agency.auctioneers ?
                                                agency.auctioneers.map(auctioneer => <span key={auctioneer.value._id}> {auctioneer.label} </span>)
                                                :
                                                'No posee'
                                            }
                                        </h3>
                                    </Col>
                                    <Col sm="4">
                                        <p>Dirección</p>
                                        <h4>{agency.address ?
                                            <Fragment>
                                                {agency.address.streetName},{}
                                                {agency.address.streetNumber},{}
                                                {agency.address.city}
                                            </Fragment> : 'Sin Direccion'}
                                        </h4>
                                    </Col>
                                    <Col sm="4">
                                        <p>Tel</p>
                                        <h4>{agency.phone ? agency.phone : 'Desconocido'}</h4>
                                    </Col>
                                    <Col sm="4">
                                        <p>Email</p>
                                        <h4>{agency.email ? agency.email : 'Desconocido'}</h4>
                                    </Col>
                                    <Col sm="12">
                                        <p>Capitán</p>
                                        <h4>{agency.captain ? agency.captain.label : 'No posee'}</h4>
                                    </Col>
                                    <Col sm="12">
                                        <p>Vendedores</p>
                                        <h4>
                                            {agency.sellers ?
                                                agency.sellers.map(seller => <span> {seller.label} </span>)
                                                :
                                                'No posee'
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                                <hr/>
                                {this.props.userProfile.role === 'admin' &&
                                <Row>
                                    <Col sm="12">
                                        <Button
                                            className="list-action-btn"
                                            color="light"
                                            onClick={() => this.editAgency(agency)}
                                        >
                                            <FontAwesome name="edit"/>
                                        </Button>{' '}
                                        <Button
                                            className="list-action-btn"
                                            color="light"
                                            onClick={e => this.deleteAgencyConfirm(e, index)}
                                        >
                                            <FontAwesome name="trash"/>
                                        </Button>
                                    </Col>
                                </Row>}
                                {this.props.userProfile.role === 'martillero' && agency.auctioneers.length > 0 && agency.auctioneers.map(auctioneer => (auctioneer.value._id == this.props.userProfile._id)).includes(true) && 
                                <Row>
                                    <Col sm="12">
                                        <Button
                                            className="list-action-btn"
                                            color="light"
                                            onClick={() => this.editAgency(agency)}
                                        >
                                            <FontAwesome name="edit"/>
                                        </Button>{' '}
                                    </Col>
                                </Row>}
                                {this.props.userProfile.role === 'admin' || (this.props.userProfile.role === 'martillero' && agency.auctioneers.length > 0 && agency.auctioneers.map(auctioneer => (auctioneer.value._id == this.props.userProfile._id)).includes(true)) && 
                                <hr/>}
                            </Collapse>
                        </ListGroupItem>
                    </ListGroup>
                ))}
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col sm="12">
                        <h3>Inmobiliarias </h3>
                        {(this.props.agencies && this.props.userProfile) && this.renderContent()}
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
                    <ModalBody>
                        Do you really delete this agency?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.deleteAgency.bind(this)}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default connect(
    state => ({
        agencies: state.agency.agencies,
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestAgencies: () => dispatch(requestAgencies()),
        requestDeleteAgency: agency => dispatch(requestDeleteAgency(agency))
    })
)(ListTeam);
