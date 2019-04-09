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
import {requestFavoriteDwellings, requestAddFavorite, requestUserProfile} from '../../../actions/index';

moment.locale('es');

class Favorite extends Component {
    static propTypes = {
        requestFavoriteDwellings: PropTypes.func.isRequired,
        requestUserProfile: PropTypes.func.isRequired,
        requestAddFavorite: PropTypes.func.isRequired,
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
            alert: null,
            loading: true,
            hasMore: true,
            message: null
        };
    }

    componentDidMount() {
        this.props.requestUserProfile();
        this.props.requestFavoriteDwellings();
    }
    componentWillReceiveProps(props) {
        if (props.loading !== this.state.loading && props.dwellings) {
            if (props.dwellings.length === 0) {
                this.setState({loading: false, message: 'Aún no has guardado ninguna propiedad como favorita!'});
            } else {
                this.setState({loading: false, message: null});
            }
        } else if (props.loading === this.state.loading && props.dwellings) {
            if (props.dwellings.length === 0) {
                this.setState({loading: false, message: 'Aún no has guardado ninguna propiedad como favorita!'});
            } else {
                this.setState({loading: false, message: null});
            }
        } else {
            this.setState({message: 'Aún no has guardado ninguna propiedad como favorita!'});
        }
    }

    deleteFromFavorite(param){
      this.showAlert('Eliminado de tus favoritos.', 'success', param, false);
    }
    async handleHeartButton(param) {
        const favorite = this.props.userProfile;
        favorite['dwelling_id'] = param;
        // const {agency} = this.state;
        // agency['deleted'] = false;
        await this.props.requestAddFavorite(favorite);
        this.props.requestFavoriteDwellings();
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

  hideAlert(param) {
    this.handleHeartButton(param);
    this.setState({
      alert: null
    });
  }

    renderContent() {
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
                        {this.props.dwellings.map(dwelling => {
                            let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
                            let detail_url = this.props.userProfile ? ['admin', 'martillero', 'vendedor'].includes(this.props.userProfile.role) ?
                                `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
                            return (
                                <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                                    <div
                                        className="highlight-box"
                                        onClick={() => this.props.history.push(detail_url)}
                                    >
                                        <div className="prop-detail-btns">
                                            <Button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.deleteFromFavorite(dwelling._id);
                                                }}
                                                className="like">
                                                <FontAwesome name="heart" size="lg" style={{color:'#fbad1c'}}/>
                                            </Button>
                                        </div>
                                        <div className="img" style={{
                                            width: '100%',
                                            height: '200px',
                                            backgroundSize: 'cover',
                                            backgroundImage: 'url("' + img_url + '")'
                                        }}></div>
                                        <Row className="highlight-body">
                                            <Col sm={12}>
                                                {dwelling.price
                                                    ? <h3>
                                                        <small>{dwelling.currency}</small>
                                                        {dwelling.price}</h3>
                                                    : <h3>Consulte</h3>}
                                                <h4 className="primary">
                                                    {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus} en {dwelling.address.streetName}, {dwelling.address.city}
                                                </h4>
                                            </Col>
                                            <Col sm={12}>
                                                <span
                                                    className="pull-left">{dwelling.createdAt !== dwelling.updatedAt ?
                                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}</span>
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
                        <h3>Tus propiedades favoritas</h3>
                    </Col>
                </Row>
                {
                    this.state.loading
                        ?
                        <BeatLoader color="#fbad1c" loading={this.state.loading} />
                        :
                        !this.state.message
                        ?
                        this.props.dwellings && this.renderContent()
                        :
                        <Row>
                            <Col>
                                <h5>{this.state.message}</h5>
                            </Col>
                        </Row>
                }
            </Container>
        );
    }
}

export default connect(
    state => ({
        userProfile: state.user.userProfile,
        dwellings: state.favorite.dwellings,
        loading: state.favorite.loading
    }),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile()),
        requestFavoriteDwellings: () => dispatch(requestFavoriteDwellings()),
        requestAddFavorite: favorite_data => dispatch(requestAddFavorite(favorite_data))
    })
)(Favorite);
