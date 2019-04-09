import React from 'react';
import PropTypes from 'prop-types';
import {Label, FormGroup} from 'reactstrap';
import Select from 'react-select';

const handleInputChange = (term, onLoadOptions) => {
    if (term.length >= 3) {
        //onLoadOptions(term);
    }
};

const handleOnMenuOpen = onLoadOptions => {
    onLoadOptions();
};


const Typeahead = ({control, onChange, onLoadOptions, disabled, options, label, value, placeholder, isMulti}) => (
    <FormGroup>
        <Label>{label}</Label>
        <Select
            isMulti={isMulti}
            id={control}
            name={control}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            isOptionDisabled={option => option.disabled}
            loadingMessage={() => ('Buscando...')}
            noOptionsMessage={() => ('Busque un Usuario')}
            //onInputChange={term => handleInputChange(term, onLoadOptions)}
            onMenuOpen={() => handleOnMenuOpen(onLoadOptions)}
            options={options}
        />
    </FormGroup>
);

Typeahead.propTypes = {
    control: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
    onChange: PropTypes.func.isRequired,
    onLoadOptions: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    isMulti: PropTypes.bool
};

Typeahead.defaultProps = {
    label: '',
    value: '',
    placeholder: 'Escriba para buscar...',
    disabled: false,
    options: [],
    isMulti: false
};

export default Typeahead;
