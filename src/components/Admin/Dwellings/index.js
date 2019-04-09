import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';


import Bookmark from './Bookmark';
import General from './DwellingEditor/General';
import Latest from '../../Dwellings/Latest';
import Characteristics from './DwellingEditor/Characteristics';
import Card from './DwellingEditor/Card';
import Reports from './Reports';
import Detailed from './Reports/Detailed';
import Description from './DwellingEditor/Description';
import Appraisals from './Appraisals';
import SearchDwellings from '../../Resultados';

const Dwellings = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/general`} component={General} exact/>
        <Route path={`${path}/latest`} component={Latest} exact/>
        <Route path={`${path}/characteristics`} component={Characteristics} exact/>
        <Route path={`${path}/description`} component={Description} exact/>
        <Route path={`${path}/search`} name="Search" component={SearchDwellings} exact/>
        <Route path={`${path}/appraisals`} name="Search" component={Appraisals} exact/>
        <Route path={`${path}/reports`} name="Reports" component={Reports} exact/>
        <Route path={`${path}/reports/detailed/:filterBy`} name="Detailed" component={Detailed} exact/>
        <Route path={`${path}/bookmark`} name="Bookmark" component={Bookmark} exact/>
        <Route path={`${path}/card/:id`} name="Card" component={Card} exact/>
    </Switch>
);

Dwellings.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Dwellings;
