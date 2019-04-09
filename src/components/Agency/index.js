import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Reports from './Dwellings/Reports';
import Detailed from './Dwellings/Reports/Detailed';

const Agency = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/dwellings/reports`} name="Reports" component={Reports} exact/>
        <Route path={`${path}/dwellings/reports/detailed/:filterBy`} name="Detailed" component={Detailed} exact/>
    </Switch>
);

Agency.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Agency;
