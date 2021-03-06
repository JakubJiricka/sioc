/* eslint-disable max-len */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {BeatLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
    Container,
    Row,
    Col
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import {
    requestUserProfile,
    requestDwellings,
    requestLoadMoreDwellings,
    requestAddFavorite
} from '../../../actions/index';

moment.locale('es');

class Latest extends Component {
    static propTypes = {
        requestLoadMoreDwellings: PropTypes.func.isRequired,
        requestAddFavorite: PropTypes.func.isRequired,
        requestUserProfile: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        dwellings: null
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: {
                pageNumber: 0,
                perPage: 9
            },
            loading: true,
            hasMore: true,
            alert: null
        };
    }

    componentDidMount() {
        // this.props.requestUserProfile();
        if (this.props.location.pathname === '/admin/dwellings/latest') {
            this.props.requestLoadMoreDwellings({page: this.state.page, admin: true});
        } else {
            this.props.requestLoadMoreDwellings({page: this.state.page});
        }
    }

    componentWillReceiveProps(props) {
        if (props.dwellings[0] !== this.state.items[0]) {
            const dwellings = props.dwellings.filter(dwelling => {
                    return dwelling.occupationStatus === "Disponible"
            });
            this.setState({
                items: this.state.items.concat(dwellings)
            });
            if (props.dwellings.length === 0) {
                this.setState({hasMore: false});
            }
            if (props.dwellings.length < 6) {
                this.setState({loading: false});
            }
        }
    }

    myFavorite(param) {
        if (this.props.userProfile.favorite.includes(param)) {
            this.showAlert('Eliminado de tus favoritos.', 'success', param, false);
        }
        else {
            this.showAlert('Agregado a tus favoritos!', 'success', param, false)
        }
        const favorite = this.props.userProfile;
        favorite['dwelling_id'] = param;
        // const {agency} = this.state;
        // agency['deleted'] = false;
        this.props.requestAddFavorite(favorite);
    }

    showAlert(title, type, param, load = false) {
        if (load) {
            var getAlert = () => (
                <SweetAlert
                    type={type}
                    title={title}
                    onConfirm={() => this.loadWindow()}
                >
                </SweetAlert>
            );
        }
        else {
            var getAlert = () => (
                <SweetAlert
                    type={type}
                    title={title}
                    onConfirm={() => this.hideAlert(param)}
                >
                </SweetAlert>
            );
        }

        this.setState({
            alert: getAlert()
        });
    }

    hideAlert() {
        this.handleHeartButton();
        this.setState({
            alert: null
        });
    }

    loadWindow() {
        window.location.pathname = '/home';
    }

    handleHeartButton() {
        this.props.requestUserProfile();
    }

    fetchMoreData = () => {
        setTimeout(() => {
            const {page} = this.state;
            page.pageNumber = this.state.page.pageNumber + 1;
            this.setState({page});
            if (this.props.location.pathname === '/admin/dwellings/latest') {
                this.props.requestLoadMoreDwellings({page: this.state.page, admin: true});
            } else {
                this.props.requestLoadMoreDwellings({page: this.state.page});
            }
        }, 500);
    };

    renderContent() {
        var favorites = [];
        {
            this.props.userProfile ? favorites = this.props.userProfile.favorite : <div/>
        }
        return (
            <div className="highlights">
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<BeatLoader
                        color="#fbad1c"
                        loading={this.state.loading}
                    />}
                >
                    <Row className="highlights-main">
                        {this.state.items.map(dwelling => {
                            let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
                            let detail_url = this.props.userProfile ? ['admin', 'martillero', 'vendedor'].includes(this.props.userProfile.role) ?
                                `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
                            return (
                                <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                                    <div className="highlight-box"
                                         onClick={() => this.props.history.push(detail_url)}>
                                        <div className="prop-detail-btns">
                                            <Button className="goto">
                                                <FontAwesome name="map-marker"/>
                                                <small style={{color: '#fff'}}> {dwelling.address?dwelling.address.city:''} </small>
                                            </Button>
                                            <Button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.myFavorite(dwelling._id);
                                                }}
                                                className="like"
                                            >
                                                {
                                                  favorites.includes (dwelling._id)?
                                                    <FontAwesome name="heart" size="lg" style={{color:'#fbad1c'}}/>
                                                  :
                                                   <FontAwesome name="heart" size="lg" style={{color:'white'}}/>
                                                }
                                            </Button>
                                        </div>
                                        <div
                                            className="img"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                backgroundSize: 'cover',
                                                backgroundImage: 'url("' + img_url + '")'
                                            }}
                                        />
                                        <Row className="highlight-body">
                                            <Col sm={12}>
                                                {dwelling.price ?
                                                    <h3>
                                                        <small>{dwelling.currency}</small>
                                                        {dwelling.price}
                                                    </h3>
                                                    : <h3>Consulte</h3>}
                                                <h4 className="primary">
                                                    {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus} en {dwelling.address.streetName}
                                                </h4>
                                            </Col>
                                            <Col sm={12}>
                                                <span className="pull-left">
                                                    {dwelling.createdAt !== dwelling.updatedAt ?
                                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}
                                                </span>
                                                <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            );
                        })}
                        {
                            this.state.alert
                        }
                    </Row>
                </InfiniteScroll>
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col>
                        <h3>Últimas Propiedades cargadas</h3>
                    </Col>
                </Row>
                {this.props.dwellings && this.renderContent()}
            </Container>
        );
    }
}

export default connect(
    state => ({dwellings: state.dwelling.dwellings, userProfile: state.user.userProfile}),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile()),
        requestDwellings: () => dispatch(requestDwellings()),
        requestLoadMoreDwellings: serachParams => dispatch(requestLoadMoreDwellings(serachParams)),
        requestAddFavorite: favorite_data => dispatch(requestAddFavorite(favorite_data)),
    })
)(Latest);
