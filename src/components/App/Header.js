/* global document */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {NavbarToggler, NavbarBrand, Input, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {
    InputGroup,
    FormControl,
    FormGroup,
} from 'react-bootstrap';

import DwellingService from '../../services/dwelling';

const Header = withRouter(props => <NavHeader {...props}/>);

class NavHeader extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            siocId: '',
            modal: false
        };    
        this.toggle = this.toggle.bind(this);
    }
    
    async handleSubmit(siocId) {
        if (!siocId) return;
        const id = await DwellingService.findSiocId(siocId);
        if (id) {
            if (['admin', 'martillero', 'vendedor'].includes(this.props.userProfile.role)) {
                this.props.history.push(`/admin/dwellings/card/${id}`);
            } else {
                this.props.history.push(`/propiedades/${id}`);
            }
        } else {
            this.toggle();
        }
    }
    
    handleChange(e) {
        const {value} = e.target;
        if (value.length === 7) return;
        this.setState({
            siocId: value
        });
    }
    
    handleKeyPress(e) {
        //const {onChange} = this.props;
        const {siocId} = this.state;
        if (e.key === 'Enter') {
            this.handleSubmit(siocId);
        }
    }

    sidebarToggle = e => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    };

    sidebarMinimize = e => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    };

    mobileSidebarToggle = e => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    };


    asideToggle = e => {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    render() {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"/>
                </NavbarToggler>
                <NavbarBrand href="#"/>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"/>
                </NavbarToggler>
                
                {(this.props.location.pathname === '/home') &&
                <div className="home-input-code">
                    <FontAwesome name="hashtag" />
                    <Input
                        type="number"
                        placeholder="Código"
                        value={this.state.siocId}
                        maxLength={6}
                        onChange={e => this.handleChange(e)}
                        onKeyPress={e => this.handleKeyPress(e)}
                        style={{width:'100px', background:'#fff'}}
                    />
                </div>}

                {(this.props.location.pathname === '/resultados/' || this.props.location.pathname === '/admin/dwellings/search') &&
                <NavbarToggler onClick={this.asideToggle}>
                    <FontAwesome name="map-marker" size='2x'/>
                </NavbarToggler>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        Ups! No hemos podido encontrar el código ingresado... Chequealo e intentá de nuevo
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </header>
        );
    }
}

export default Header;
