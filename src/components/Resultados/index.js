import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MoonLoader} from 'react-spinners';

import MapWithSearchBox from '../Maps/MapWithSearchBox';
import {requestFindDwellings, cleanSearchParams} from '../../actions/index';

class Resultados extends Component {
    static propTypes = {
        requestFindDwellings: PropTypes.func.isRequired,
        cleanSearchParams: PropTypes.func.isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({})),
        searchParams: PropTypes.shape({}),
        currentPosition: PropTypes.shape({}),
        loading: PropTypes.bool
    };

    static defaultProps = {
        dwellings: null,
        searchParams: null,
        currentPosition: undefined,
        loading: true
    };

    constructor(props) {
        super(props);
        this.state = {
            searchParams: {},
            height: 0
        };
        if (this.props.searchParams) {
            this.state = {
                searchParams: this.props.searchParams
            };
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        if (this.props.location.pathname === '/admin/dwellings/search') {
            this.props.cleanSearchParams();
            this.props.requestFindDwellings({publicationType: undefined, agencyDwellings: true});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({height: window.innerHeight});
    }

    handleSubmit(searchParams) {
        this.props.requestFindDwellings(searchParams);
    }

    renderMap() {
        return (
            <MapWithSearchBox user={this.props.userProfile} dwellings={this.props.dwellings} selectedRef={this.props.currentPosition}/>
        );
    }

    render() {
        return (
            (this.props.loading ?
                    <div className="overlay-spinner">
                        <MoonLoader/>
                    </div>
                    :
                    <div style={{height: '100%'}}>
                        {this.renderMap()}
                    </div>
            )
        );
    }
}

export default connect(
    state => ({
        userProfile: state.user.userProfile,
        loading: state.dwelling.loading,
        dwellings: state.dwelling.searchedDwellings,
        searchParams: state.dwelling.searchParams,
        currentPosition: state.map.currentPosition
    }),
    dispatch => ({
        requestFindDwellings: searchParams => dispatch(requestFindDwellings(searchParams)),
        cleanSearchParams: () => dispatch(cleanSearchParams())
    })
)(Resultados);
