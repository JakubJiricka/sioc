import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Row, Col, Button, Collapse, Input, FormGroup, Table} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {filter, includes, lowerCase} from 'lodash';

import {requestSearchUsers, clearUsers, requestUsersByRole, requestChangeUserRole,requestAgencies} from '../../../actions';

import Typeahead from '../../common/Typeahead';

class Sellers extends Component {
    static propTypes = {
        requestChangeUserRole: PropTypes.func.isRequired,
        requestSearchUsers: PropTypes.func.isRequired,
        requestUsersByRole: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        requestAgencies: PropTypes.func.isRequired,
        usersByRole: PropTypes.arrayOf(PropTypes.shape({})),
        usersOptions: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        usersByRole: [],
        usersOptions: []
    };

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            searchParams: {},
            collapse: false,
            filter: null
        };
    }

    componentDidMount() {
        this.props.clearUsers();
        const role = 'vendedor';
        this.props.requestUsersByRole(role);
        this.props.requestAgencies();
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    handleChange(searchParams) {
        this.props.clearUsers();
        this.setState(state => ({searchParams: Object.assign(state.searchParams, searchParams)}));
    }

    handleChangeRole() {
        const {searchParams} = this.state;
        this.props.requestChangeUserRole({id: searchParams.value, label: searchParams.label, newRole: 'vendedor'});
    }

    handleRemoveRole(user) {
        this.props.requestChangeUserRole({id: user, newRole: 'usuario', oldRole: 'vendedor'});
    }

    handleSearch(e) {
        this.setState({
            filter: e.target.value
        });
    }

    Martillero(user){
        this.props.history.push('/admin/team/ask?username=' + user);
    }
    renderContent() {
        const {usersByRole,agencies,userProfile} = this.props;

        console.log(userProfile);
        if(agencies)
        {
            agencies.map(function(value){
                if(value.name == userProfile.agency)
                {
                    value.auctioneers.map(function(real){
                        usersByRole.push(real.value);
                    })
                }
            })    
        }
        
        return (
            <Table hover responsive size="sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Mail</th>
                        <th>Cel</th>
                        <th>Inmobiliaria</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {filter(usersByRole, users =>
                        includes(
                            lowerCase(users.name), lowerCase(this.state.filter)) ||
                        includes(
                            lowerCase(users.surname), lowerCase(this.state.filter)) ||
                        includes(
                            lowerCase(users.email), lowerCase(this.state.filter)) ||
                        !this.state.filter)
                        .map(user => (
                            <tr key={user._id}>
                                <th scope="row">{user.name}, {user.surname}</th>
                                <td>{user.email}</td>
                                <td>{user.whatsapp}</td>
                                <td>{user.agency? user.agency.name: ''}</td>

                                <td>
                                    <Button 
                                     outline
                                     className="list-action-btn"
                                     color="dark"
                                     onClick={()=>this.Martillero(user.name)}>
                                     <FontAwesome className="text-danger" name="plus"/>visitas
                                     </Button>
                                    <Button
                                        outline
                                        className="list-action-btn"
                                        color="light"
                                        onClick={() => this.handleRemoveRole(user._id)}
                                    ><FontAwesome className="text-danger" name="trash"/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const {usersOptions} = this.props;
        const {searchParams} = this.state;
        return (
            <Container fluid className="animated fadeIn">
                <h2>Nuestro Equipo
                    <Button
                        className="pull-right"
                        color="light"
                        onClick={this.toggle}
                        style={{marginBottom: '1rem'}}
                    >
                        <FontAwesome name="plus"/> Crear nuevo
                    </Button>
                </h2>
                <Collapse isOpen={this.state.collapse} style={{marginBottom: '1rem'}}>
                    <Row>
                        <Col sm="12">
                            <Typeahead
                                label="Usuario"
                                control="users"
                                options={usersOptions}
                                onLoadOptions={term => this.props.requestSearchUsers(term)}
                                placeholder="Seleccione un/a usuario/a"
                                value={searchParams.label ? searchParams : ''}
                                onChange={params => this.handleChange(params)}
                                removeSelected
                            />
                            <Button color="primary" onClick={() => this.handleChangeRole()}>Confirmar</Button>
                        </Col>
                    </Row>
                </Collapse>
                <FormGroup>
                    <Input onChange={e => this.handleSearch(e)} placeholder="Buscar"/>
                </FormGroup>
                {this.props.usersByRole && this.renderContent()}
            </Container>
        );
    }
}

export default connect(
    state => ({
        loading: state.user.loading,
        users: state.user.users,
        usersOptions: state.user.usersOptions,
        usersByRole: state.user.usersByRole,
        agencies: state.agency.agencies,
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestChangeUserRole: changeParams => dispatch(requestChangeUserRole(changeParams)),
        requestUsersByRole: role => dispatch(requestUsersByRole(role)),
        requestSearchUsers: term => dispatch(requestSearchUsers(term)),
        requestAgencies: () => dispatch(requestAgencies()),
        clearUsers: () => dispatch(clearUsers())
    })
)(Sellers);
