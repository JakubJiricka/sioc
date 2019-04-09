import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {requestSignOut} from '../../../actions';


const SidebarFooter = props => (
    <NavItem className="sidebar-footer" onClick={props.requestSignOut}>
        <NavLink to="/home">
            <i><FontAwesome name="power-off"/></i>Cerrar Sesión
        </NavLink>
    </NavItem>
);
SidebarFooter.propTypes = {
    requestSignOut: PropTypes.func.isRequired
};

export default connect(
    null,
    dispatch => ({
        requestSignOut: () => dispatch(requestSignOut())
    })
)(SidebarFooter);
