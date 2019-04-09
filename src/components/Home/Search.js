import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestUserProfile, requestDwellings, requestAddFavorite} from '../../actions';

import ImgPropiedad from '../../../public/images/330x220.png';
import {Dwelling} from "../../model";
import moment from "moment/moment";
import SweetAlert from 'react-bootstrap-sweetalert';


class Search extends Component {
    static propTypes = {
        requestUserProfile: PropTypes.func.isRequired,
        requestDwellings: PropTypes.func.isRequired,
        requestAddFavorite: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({}))
    };
    static defaultProps = {
        dwellings: []
    };
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            favorite: []

        };
    }

    componentDidMount() {
        this.props.requestUserProfile();
        this.props.requestDwellings();
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
    loadWindow() {
        window.location.pathname = '/home';
    }
     handleHeartButton(param) {
        this.props.requestUserProfile();
    }
    myFavorite(param){
      if (this.props.userProfile.favorite.includes(param)) {
            this.showAlert('Eliminado de tus favoritos', 'success', param, false);
      }
      else {
            this.showAlert('Agregado a tus favoritos', 'success', param, false)
          }
          const favorite = this.props.userProfile;
          favorite['dwelling_id'] = param;
          // const {agency} = this.state;
          // agency['deleted'] = false;
          this.props.requestAddFavorite(favorite);
    }
    renderContent() {
        const {dwellings} = this.props;
        /*const dwellings2 = dwellings.filter(dwelling => {
                return dwelling.occupationStatus === "Disponible"
        });*/
        var favorites = this.state.favorite;
        {
          this.props.userProfile ? favorites = this.props.userProfile.favorite : <div/>
        }
        return (
            <Row className="highlights-main">
              {
              this.props.userProfile != 'anonymous' ?
                dwellings.map(dwelling => {
                    let img_url = dwelling.images[0] !== undefined
                        ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                        : 'http://via.placeholder.com/330x220';
                    let detail_url = this.props.userProfile ? ['admin', 'martillero', 'vendedor'].includes(this.props.userProfile.role) ?
                        `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
                    let dwelling_id = dwelling._id;
                    return (
                        <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                            <div
                                className="highlight-box"
                                onClick={() => this.props.history.push(detail_url)}
                            >
                                <div className="prop-detail-btns">
                                    <Button className="goto">
                                        <FontAwesome name="map-marker"/>
                                        <small style={{color: '#fff'}}> {dwelling.address.city} </small>
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
                                <div className="img" style={{
                                    width: '100%',
                                    height: '200px',
                                    backgroundSize: 'cover',
                                    backgroundImage: 'url("' + img_url + '")'
                                }}></div>
                                <Row className="highlight-body">
                                    <Col sm={12}>
                                        {dwelling.price ?
                                            <h4>
                                                <small>{dwelling.currency}</small>
                                                {dwelling.price}
                                            </h4>
                                            : <h4>Consulte</h4>}
                                        <h3 className="primary">
                                            {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus}
                                        </h3>
                                    </Col>
                                    <Col sm={12}>
                                    <span className="pull-left">
                                        {dwelling.createdAt !== dwelling.updatedAt ?
                                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}</span>
                                        <span className="pull-right">#{dwelling.siocId}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                })
                :
                this.props.dwellings.map(dwelling => {
                    let img_url = dwelling.images[0] !== undefined
                        ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                        : 'http://via.placeholder.com/330x220';
                    let detail_url = this.props.userProfile ? this.props.userProfile.role === 'admin' ?
                        `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
                    let dwelling_id = dwelling._id;
                    return (
                        <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                            <div
                                className="highlight-box"
                                onClick={() => this.props.history.push(detail_url)}
                            >
                                <div className="prop-detail-btns">
                                    <Button className="goto">
                                        <FontAwesome name="map-marker"/>
                                        <small style={{color: '#fff'}}> {dwelling.address.city} </small>
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
                                        {dwelling.price ?
                                            <h4>
                                                <small>{dwelling.currency}</small>
                                                {dwelling.price}
                                            </h4>
                                            : <h4>Consulte</h4>}
                                        <h3 className="primary">
                                            {dwelling.subtype} en {dwelling.publicationType}
                                        </h3>
                                    </Col>
                                    <Col sm={12}>
                                    <span className="pull-left">
                                        Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                        <span className="pull-right">#{dwelling.siocId}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                })
              }
                {
                    this.state.alert
                }
            </Row>
        );
    }


    render() {
        return (
            <Container fluid className="animated fadeIn highlights">
                <Col sm={12} className="text-center">

                    <hr/>
                    <h3>Presentamos las últimas novedades del <b>SIOC</b> en tiempo real!</h3>
                    <hr/>
                </Col>
                {this.props.dwellings && this.renderContent()}
                <Row className="mt-4">
                    <Col sm={12} className="text-right">
                        <Button
                            size="lg"
                            color="light"
                            onClick={() => this.props.history.push('/dwellings/latest')}
                        > Ver más <FontAwesome name="angle-right"/>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(connect(
    state => ({
        userProfile: state.user.userProfile,
        dwellings: state.dwelling.dwellings
    }),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile()),
        requestDwellings: () => dispatch(requestDwellings()),
        requestAddFavorite: favorite_data => dispatch(requestAddFavorite(favorite_data))
    })
)(Search));
