import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const LoadingButton = ({label}) => (
    <Button bsStyle="primary" disabled className="btn btn-group-justified">
        <FontAwesome name="spinner" pulse/> {label}
    </Button>
);

LoadingButton.propTypes = {
    label: PropTypes.string
};

LoadingButton.defaultProps = {
    label: 'Cargando...'
};

export default LoadingButton;
