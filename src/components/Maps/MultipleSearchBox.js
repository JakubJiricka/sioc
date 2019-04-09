/* eslint-disable react/jsx-closing-tag-location,camelcase */
import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose, withProps, lifecycle} from 'recompose';
import {withScriptjs} from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import TagsInput from '../common/TagInput';
import * as addressHelper from '../common/utils/address_helpers';

const MultipleSearchBox = compose(
    withProps({
        // eslint-disable-next-line max-len
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPcjKZsJ6A7MtY_Y3aowX6K7tJQRBuU9s&language=es&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{height: '100%'}}/>,
        containerElement: <div style={{height: '400px'}}/>
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                places: {},
                value: this.props.value,
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onInputMounted: ref => {
                    refs.addressInput = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    refs.addressInput.value = '';
                    this.setState({
                        places
                    });

                    const address = addressHelper.placeToAddress(places[0]);
                    address.formatted_address = places[0].formatted_address;
                    let value = [];
                    if (this.state.value) {
                        value = this.state.value.concat(address);
                    } else {
                        value = value.concat(address);
                    }
                    this.setState({
                        value
                    })
                    this.props.onChange(value);
                },
                onChange: (value) => {
                    this.setState({value});
                    this.props.onChange(value);
                }
            });
        }
    }),
    withScriptjs
)( (props) => {
    return (
        <div>
            <TagsInput
                renderInput={ ({addTag, ...childProps})=>{
                    return (
                        <StandaloneSearchBox
                            ref={props.onSearchBoxMounted}
                            bounds={props.bounds}
                            onPlacesChanged={props.onPlacesChanged}
                        >

                            <input
                                ref={props.onInputMounted}
                                type="text"
                                placeholder={props.formattedAddress !== undefined ? props.formattedAddress : 'Escriba ubicación'}
                                style={{
                                    boxSizing: 'border-box',
                                    border: 'none',
                                    width: '100%',
                                    // height: '32px',
                                    // fontSize: '14px`',
                                    outline: 'none'
                                }}
                            />
                        </StandaloneSearchBox>)
                }}
                value={props.value}
                onChange={props.onChange}
                renderTag = { (props) => {

                    let {tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other} = props
                    return (
                        <div key={key} {...other}>
                            {/*getTagDisplayValue(tag)*/}
                            {tag.formatted_address}
                            {!disabled &&
                            <a className={classNameRemove} onClick={(e) => onRemove(key)} />
                            }
                        </div>
                    )

                } }
            />

    </div>)}
);

const enhance = _.identity;
export default enhance(MultipleSearchBox);
