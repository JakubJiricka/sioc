import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import gralLatest from './Dashboard/gralLatest';
import Dashboard from './Dashboard/Dashboard';

import SearchClients from './Clients/Search';
import NewClient from './Clients/New';
import EditClient from './Clients/Edit';

import Dwellings from './Dwellings';

import AddUser from './Users/AddUser';
import ListUser from './Users/ListUser';
import EditUser from './Users/Edit';

import AddTeam from './Team/AddTeam';
import Ask from './Team/Ask';
import ListTeam from './Team/ListTeam';
import EditTeam from './Team/Edit';

import Auctioneers from './Auctioneers';
import Sellers from './Sellers';
import Captains from './Captains';

import '../../sass/admin.scss';

const Admin = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/dashboard/Dashboard`} name="Dashboard" component={Dashboard} exact/>
        <Route path={`${path}/dashboard/gralLatest`} name="gralLatest" component={gralLatest} exact/>

        <Route path={`${path}/dwellings`} component={Dwellings}/>

        <Route path={`${path}/clients/new`} name="New" component={NewClient} exact/>
        <Route path={`${path}/clients/Edit`} name="Edit" component={EditClient} exact/>
        <Route path={`${path}/clients/search`} name="Search" component={SearchClients} exact/>

        <Route path={`${path}/team/add`} name="Add" component={AddTeam} exact/>
        <Route path={`${path}/team/list`} name="List" component={ListTeam} exact/>
        <Route path={`${path}/team/ask`} name="Ask" component={Ask} exact/>
        <Route path={`${path}/team/edit`} name="Edit" component={EditTeam} exact/>

        <Route path={`${path}/auctioneers/auctioneers`} name="Auctioneers" component={Auctioneers} exact/>
        <Route path={`${path}/sellers/sellers`} name="Sellers" component={Sellers} exact/>
        <Route path={`${path}/captains/captains`} name="Captains" component={Captains} exact/>

        <Route path={`${path}/users/add`} name="Add" component={AddUser} exact/>
        <Route path={`${path}/users/list`} name="List" component={ListUser} exact/>
        <Route path={`${path}/users/edit`} name="Edit" component={EditUser} exact/>
    </Switch>
);

Admin.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Admin;

