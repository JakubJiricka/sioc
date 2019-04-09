import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    Button,
    ButtonGroup,
    FormGroup,
    Input,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestClients, requestDeleteClient} from '../../../actions';

class Search extends Component {
    static propTypes = {
        requestClients: PropTypes.func.isRequired,
        clients: PropTypes.arrayOf(PropTypes.shape({})),
        requestDeleteClient: PropTypes.func.isRequired
    };

    static defaultProps = {
        clients: []
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            delClientId: null
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.requestClients();
    }

    editClient(client) {
        this.props.history.push({pathname: '/admin/clients/edit', state: {client}});
    }

    deleteClientConfirm(client) {
        this.setState({delClientId: client._id});
        this.toggle();
    }

    deleteClient() {
        this.props.requestDeleteClient(this.state.delClientId);
        this.toggle();
    }

    onKeywordChange(value) {
        this.setState({keyword: value});
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {clients} = this.props;
        const {keyword} = this.state;
        const filterClient = ((client) => {
            if (!client.deleted) {
                if (!keyword)
                    return true;
                const fullname = client.name + ' ' + client.surname;
                if (fullname.includes(keyword) || client.email.includes(keyword))
                    return true;
                if (client.cellPhone) {
                    if (client.cellPhone.toString().includes(keyword))
                        return true;
                }
            }
            return false;
        });
        return (
            <Container fluid className="animated fadeIn">
                <h2 className="pull-left">Clientes</h2>
                <Button onClick={() => this.props.history.push('/admin/clients/new')} className="pull-right"
                        color="light"><FontAwesome name="plus"/> Crear nuevo</Button>
                <FormGroup>
                    <Input
                        type=""
                        name=""
                        id=""
                        placeholder="Buscar cliente"
                        value={this.state.keyword}
                        onChange={e => this.onKeywordChange(e.target.value)}
                    />
                </FormGroup>
                <Table hover responsive size="sm">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Mail</th>
                        <th>Cel</th>
                        <th>Categoría</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.filter(filterClient).map((client, index) => (
                        <tr key={client._id}>
                            <th scope="row">{client.name + ' ' + client.surname}</th>
                            <td>{client.email}</td>
                            <td>{client.cellPhone}</td>
                            <td>{client.category}</td>
                            <td>
                                <ButtonGroup>
                                <Button 
                                    outline 
                                    className="list-action-btn" color="light"
                                    onClick={() => this.editClient(client)}>
                                    <FontAwesome name="eye"/>
                                </Button>{' '}
                                <Button 
                                    outline 
                                    className="list-action-btn" color="light"
                                    onClick={() => this.deleteClientConfirm(client)}>
                                    <FontAwesome name="trash" className="text-danger"/>
                                </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Eliminar Cliente</ModalHeader>
                    <ModalBody>
                        Confirma que desea eliminar a este cliente?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteClient.bind(this)}>Eliminar</Button>{' '}
                        <Button color="light" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default connect(
    state => ({
        clients: state.client.clients
    }),
    dispatch => ({
        requestClients: () => dispatch(requestClients()),
        requestDeleteClient: (clientId) => dispatch(requestDeleteClient(clientId))
    })
)(Search);
