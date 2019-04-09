import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SidebarHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar-header">
                <Link to={{
                    pathname: '/admin/users/edit',
                    state: { user: {_id: this.props._id, name: this.props.name, surname: this.props.surname, email: this.props.email, whatsapp: this.props.whatsapp, role: this.props.role}}
                }}>
                    {this.props.name} {this.props.surname}
                    <div className="sidebar-header-info"> {this.props.agency? <b>{this.props.agency + ' - '}</b>: null } <em>{this.props.role}</em></div>
                </Link>
            </div>
        );
    }
}

export default SidebarHeader;
