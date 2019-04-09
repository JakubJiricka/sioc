/* global window */
import React, {Component} from 'react';
import {Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Label, Input} from 'reactstrap';
import {delay} from 'lodash';
import FontAwesome from 'react-fontawesome';
import SignInService from '../../services/signIn';
import SignUpService from '../../services/signUp';
import StorageService from '../../services/storage';

import {User} from '../../model';

import LoadingButton from '../common/LoadingButton';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            email: '',
            password: '',
            clock: null,
            register: false,
            saving: false
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await SignInService.login(this.state.email, this.state.password);
            if (result.token) {
                StorageService.setAuthToken(result.token);
                window.location = '/home';
            } else {
                this.setState({invalidLogin: true});
            }
        } catch (ex) {
            this.setState({invalidLogin: true});
            clearTimeout(this.state.clock);
            this.setState({clock: delay(() => this.setState({invalidLogin: false}), 3500)});
        }
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleUser({target: {id, value}}) {
        this.setState(
            state => ({
                user: new User(Object.assign(state.user, {[id]: value}))
            })
        );
    }

    handleRegister() {
        this.setState({register: true});
    }

    handleBack() {
        this.setState({register: false});
    }

    async handleRegisterSubmit() {
        this.setState({saving: true});
        try {
            const result = await SignUpService.register(this.state.user);
            if (result.token) {
                StorageService.setAuthToken(result.token);
                window.location = '/home';
            } else {
                this.setState({saving: false, invalidRegister: true});
            }
        } catch (ex) {
            this.setState({saving: false, invalidRegister: true});
            clearTimeout(this.state.clock);
            this.setState({clock: delay(() => this.setState({invalidRegister: false}), 3500)});
        }
    }

    render() {
        return (
            <Grid>
                {!this.state.register ?
                    <Row className="login">
                        <Col>
                            <h3 className="login-intro">Bienvenido :)</h3>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <div className="login-form">
                                    <FormGroup controlId="email">
                                        <FormControl
                                            type="text"
                                            value={this.state.email}
                                            placeholder="Ingrese su e-mail"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="password">
                                        <FormControl
                                            type="password"
                                            value={this.state.password}
                                            placeholder="Password"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="login-btns">
                                    <FormGroup>
                                        <Button className="login-signin" type="submit">
                                            INICIAR SESIÓN
                                        </Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button className="login-signup" onClick={() => this.handleRegister()}>
                                            REGISTRARME
                                        </Button>
                                    </FormGroup>
                                </div>
                                {this.state.invalidLogin &&
                                <FormGroup className="text-center text-danger">
                                    <span>El Usuario o la Contraseña son inválidos</span>
                                </FormGroup>}
                            </Form>
                        </Col>

                    </Row>
                    :
                    <Row className="login">
                        <Col>
                            <h3 className="login-intro">Complete por favor:</h3>
                            <div className="login-form">
                                <FormGroup controlId="email">
                                    <ControlLabel>E-mail</ControlLabel>
                                    <FormControl
                                        type="email"
                                        value={this.state.user.email}
                                        maxLength={50}
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <ControlLabel>Contraseña</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.user.password}
                                        maxLength={16}
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="name">
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.user.name}
                                        maxLength={50}
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="surname">
                                    <ControlLabel>Apellido</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.user.surname}
                                        maxLength={50}
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="whatsapp">
                                    <ControlLabel>Whatsapp</ControlLabel>
                                    <FormControl
                                        type="number"
                                        value={this.state.user.whatsapp}
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Fecha de Nacimiento</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="birthdate"
                                        placeholder=""
                                        onChange={e => this.handleUser(e)}
                                    />
                                </FormGroup>
                            </div>
                            <div className="login-btns">
                                {this.state.saving && <LoadingButton/>}
                                <FormGroup>
                                    {!this.state.saving &&
                                    <Button className="login-signin" onClick={() => this.handleRegisterSubmit()}>
                                        INGRESAR
                                    </Button>} {' '}
                                </FormGroup>
                                <FormGroup>
                                    <Button className="login-signup" onClick={() => this.handleBack()}>
                                        VOLVER
                                    </Button>
                                </FormGroup>
                            </div>
                            {this.state.invalidRegister &&
                            <FormGroup className="text-center text-danger">
                                <span>E-mail ya existente</span>
                            </FormGroup>}
                        </Col>
                    </Row>
                }
            </Grid>
        );
    }
}
