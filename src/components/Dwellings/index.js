import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import Latest from '../Dwellings/Latest';
import Favorite from '../Dwellings/Favorite';
import Appraisals from '../Admin/Dwellings/Appraisals';
import Mine from '../Dwellings/Mine';

const Dwellings = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/latest`} name="Latest" component={Latest} exact/>
        <Route path={`${path}/appraisals`} name="Search" component={Appraisals} exact/>
        <Route path={`${path}/favorite`} name="Favorite" component={Favorite} exact/>
        <Route path={`${path}/mine`} name="Mine" component={Mine} exact/>
    </Switch>
);

Dwellings.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Dwellings;
