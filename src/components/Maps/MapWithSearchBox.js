/* eslint-disable react/jsx-closing-tag-location */
import _ from 'lodash';
import React, {Component} from 'react';
import {compose, withProps, lifecycle, withStateHandlers, withState, withHandlers} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import {Button} from 'reactstrap';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';


const MapWithASearchBox = compose(
    withProps({
        // eslint-disable-next-line max-len
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBPcjKZsJ6A7MtY_Y3aowX6K7tJQRBuU9s&language=es&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{height: '100%'}}/>,
        containerElement: <div style={{height: '100%'}}/>,
        mapElement: <div style={{height: '100%'}}/>
    }),
    withStateHandlers(() => ({
        isOpen: null
    }), {
        onToggleOpen: () => event => ({
            isOpen: event
        }),
        refHelper: () => (nextCenter, prevRef) => ({
            helper: nextCenter,
            prevRef
        }),
        onRefChange: props => (center, selectedRef) => ({})
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                bounds: null,
                initialCenter: {
                    lat: -34.9204948,
                    lng: -57.95356570000001
                    // lat: this.props.appMarkers !== undefined ? this.props.appMarkers[0].lat : -34.9204948,
                    // lng: this.props.appMarkers !== undefined ? this.props.appMarkers[0].lng : -57.95356570000001
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: _.debounce(
                    () => {
                        this.setState({
                            bounds: refs.map.getBounds(),
                            center: refs.map.getCenter()
                        });
                        let {onBoundsChange} = this.props;
                        if (onBoundsChange) {
                            onBoundsChange(refs.map);
                        }
                    },
                    300,
                    {maxWait: 1500}
                ),
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    // eslint-disable-next-line no-undef
                    const bounds = new google.maps.LatLngBounds();

                    // eslint-disable-next-line lodash/prefer-lodash-method
                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
                    this.props.refHelper(nextCenter, this.props.selectedRef);
                    this.setState({
                        markers: nextMarkers
                    });
                    // refs.map.fitBounds(bounds);
                },
                onRefChanged: () => {
                    this.props.refHelper(this.props.selectedRef, this.props.selectedRef);
                }
            });
        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={13}
            center={!props.helper ? props.appMarkers ? props.appMarkers[0] : props.initialCenter : props.helper}
            onBoundsChanged={props.onBoundsChanged}
        >
            {(props.prevRef !== props.selectedRef) && props.onRefChanged()}
            {(props.prevRef !== props.selectedRef) && props.onToggleOpen(props.selectedRef.index)}
            {/*<SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                // eslint-disable-next-line no-undef
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Escriba ubicación"
                    style={{
                        boxSizing: 'border-box',
                        border: '1px solid transparent',
                        width: '240px',
                        height: '32px',
                        marginTop: '27px',
                        padding: '0 12px',
                        borderRadius: '3px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        fontSize: '14px',
                        outline: 'none',
                        textOverflow: 'ellipses'
                    }}
                />
            </SearchBox>*/}
            {props.appMarkers !== undefined && props.appMarkers.map((marker, index) => {
                let detail_url = props.user ? ['admin', 'martillero', 'vendedor'].includes(props.user.role) ?
                    `/admin/dwellings/card/${props.dwellings[index]._id}` : `/propiedades/${props.dwellings[index]._id}` : `/propiedades/${props.dwellings[index]._id}`;
                return (
                    <Marker
                        key={index}
                        position={marker}
                        onClick={() => {
                            props.onToggleOpen(index);
                        }}
                        // defaultAnimation={google.maps.Animation.DROP}
                    >
                        {props.isOpen === index && 
                        <InfoWindow onCloseClick={props.onToggleOpen}>
                            <div>
                                <img
                                src={props.dwellings[index].images[0] !== undefined
                                    ? props.dwellings[index].images[0].thumbnail_url
                                    : 'https://res.cloudinary.com/sioc/image/upload/w_200,q_auto,f_auto/v1525712940/epnvioppkpvwye1qs66z.jpg'}
                                alt=""
                                />
                                <h3>{props.dwellings[index].subtype} en {props.dwellings[index].address.streetName}</h3>
                                <Button color="light" href={detail_url}>
                                    <MdArrowForward/> Ir a la propiedad
                                </Button>
                            </div>
                        </InfoWindow>}
                    </Marker>
                );
            })}
        </GoogleMap>)
);

const enhance = _.identity;

class MapWithSearchBox extends Component {
    render() {
        let appMarkers;
        let {user, dwellings, selectedRef} = this.props;
        if (dwellings) {
            appMarkers = dwellings.map(position => ({
                lat: position.address.latitude,
                lng: position.address.altitude
            }));
        }
        if (dwellings === undefined) {
            dwellings = {};
        }
        return (
            <MapWithASearchBox
                key="map"
                user={user}
                dwellings={dwellings}
                appMarkers={appMarkers}
                selectedRef={selectedRef}
                helper={selectedRef}
            />
        );
    }
}

export default enhance(MapWithSearchBox);
