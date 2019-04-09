import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BeatLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Button, FormGroup, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestLoadMoreUsers, requestDeleteUser} from '../../../actions';

class Search extends Component {
    static propTypes = {
        requestLoadMoreUsers: PropTypes.func.isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({})),
        requestDeleteUser: PropTypes.func.isRequired
    };

    static defaultProps = {
        users: []
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            delUserId: null,
            items: [],
            page: {
                pageNumber: 0,
                perPage: 15
            },
            loading: true,
            hasMore: true
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.requestLoadMoreUsers({page: this.state.page});
    }

    componentWillReceiveProps(props) {
        if (props.users[0] !== this.state.items[0]) {
            this.setState({
                items: this.state.items.concat(props.users)
            });
            if (props.users.length < 15) {
                this.setState({hasMore: false});
            }
        }
        if (this.state.delUserId) {
            this.setState(
                state => ({
                    items: state.items.filter(item => item._id != state.delUserId)
                })
            );
        }
    }

    fetchMoreData = () => {
        setTimeout(() => {
            const {page} = this.state;
            page.pageNumber = this.state.page.pageNumber + 1;
            this.setState({page});
            this.props.requestLoadMoreUsers({page: this.state.page});
        }, 500);
    };

    editUser(user) {
        this.props.history.push({pathname: '/admin/users/edit', state: {user}});
    }

    deleteUserConfirm(user) {
        this.setState({delUserId: user._id});
        this.toggle();
    }

    deleteUser() {
        this.props.requestDeleteUser(this.state.delUserId);
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
        const {users} = this.props;
        const {keyword} = this.state;
        const filterUser = ((user) => {
            if (!keyword) 
                return true;
            const fullname = user.name+' '+user.surname;
            if (fullname.includes(keyword) || user.email.includes(keyword))
                return true;
            if (user.whatsapp) {
                if (user.whatsapp.toString().includes(keyword))
                    return true;
            }
            return false;
        });
        return (
            <Container fluid className="animated fadeIn">
                <h2 className="pull-left">Usuarios</h2>
                <FormGroup>
                    <Input
                        type="" 
                        name="" 
                        id="" 
                        placeholder="Buscar" 
                        value={this.state.keyword} 
                        onChange={e => this.onKeywordChange(e.target.value)} 
                    />
                </FormGroup>
                <InfiniteScroll
                    element="tbody"
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    useWindow={true}
                    threshold={500}
                    loader={<BeatLoader
                        color="#fbad1c"
                        loading={this.state.loading}
                    />}
                >
                    <Table hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Mail</th>
                                <th>Cel</th>
                                <th>Rol</th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.state.items.filter(filterUser).map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{user.name+' '+user.surname}</th>
                                <td>{user.email}</td>
                                <td>{user.whatsapp}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button outline className="list-action-btn" color="light" onClick={() => this.editUser(user)}><FontAwesome name="eye" /></Button>{' '}
                                    <Button outline className="list-action-btn" color="light" onClick={() => this.deleteUserConfirm(user)}><FontAwesome className="text-danger" name="trash" /></Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </InfiniteScroll>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Confirmación</ModalHeader>
                    <ModalBody>
                        ¿Desea eliminar este usuario?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteUser.bind(this)}>Eliminar</Button>{' '}
                        <Button color="light" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default connect(
    state => ({
        users: state.user.users
    }),
    dispatch => ({
        requestLoadMoreUsers: (searchParams) => dispatch(requestLoadMoreUsers(searchParams)),
        requestDeleteUser: (userId) => dispatch(requestDeleteUser(userId))
    })
)(Search);