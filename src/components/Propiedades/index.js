import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {MoonLoader} from 'react-spinners';
import FontAwesome from 'react-fontawesome';
import FaHeart from 'react-icons/lib/fa/heart';
import FaShare from 'react-icons/lib/fa/share-alt';
import FaImg from 'react-icons/lib/fa/image';
import FaHome from 'react-icons/lib/fa/home';
import FaBed from 'react-icons/lib/fa/bed';
import FaBank from 'react-icons/lib/fa/bank';
import MdCheck from 'react-icons/lib/md/check';
import MdChevronRight from 'react-icons/lib/md/chevron-right';

import SweetAlert from 'react-bootstrap-sweetalert';

import MapWithSearchBox from '../Maps/MapWithSearchBox';

import ImgPropiedad from '../../../public/images/casa.jpg';

import {
    Container,
    Row,
    Col,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    UncontrolledCarousel,
    Form, FormGroup, Input,
    UncontrolledTooltip
} from 'reactstrap';

import {requestDwelling, requestAddFavorite, requestUserProfile} from '../../actions/index';
import {withRouter} from "react-router-dom";

class Propiedades extends Component {
    static propTypes = {
        requestFindDwelling: PropTypes.func.isRequired,
        requestAddFavorite: PropTypes.func.isRequired,
        requestUserProfile: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        }),
        dwelling: PropTypes.shape({}),
        id: PropTypes.string,
        loading: PropTypes.bool
    };

    static defaultProps = {
        dwelling: undefined,
        id: '',
        match: {},
        loading: true
    };

    constructor(props) {
        super(props);
        this.state = {
            modalShare: false,
            modalImg: false,
            alert: null
        };

        this.toggleShare = this.toggleShare.bind(this);
        this.toggleImg = this.toggleImg.bind(this);
    }

    toggleShare() {
        this.setState({
            modalShare: !this.state.modalShare
        });
    }

    toggleImg() {
        this.setState({
            modalImg: !this.state.modalImg
        });
    }

    componentDidMount() {
        this.props.requestUserProfile();
        if (this.props.match.params === undefined) {
            var id = this.props.id;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        } else {
            /* const params = new URLSearchParams(window.location.search);
            const id = params.get('id'); */
            const {id} = this.props.match.params;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        }
    }

    showAlert(title, type, param, load = false) {
        if (load) {
            var getAlert = () => (
                <SweetAlert
                    type={type}
                    title={title}
                    onConfirm={() => this.loadWindow()}
                />
            );
        }
        else {
            var getAlert = () => (
                <SweetAlert
                    type={type}
                    title={title}
                    onConfirm={() => this.hideAlert(param)}
                />
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

    myFavorite(param) {
        if (this.props.userProfile != 'anonymous') {
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
        else {
            this.showAlert('Debés estar registrado para agregar a favoritos.', 'danger', param, false);
        }
    }

    renderContent() {
        const {dwelling} = this.props;
        var favorites = [];
        {
            this.props.userProfile ? favorites = this.props.userProfile.favorite : <div/>
        }
        let items = [];
        let backgroundImage = null;
        if (dwelling.images.length > 0) {
            backgroundImage = dwelling.images[0].secure_url;
            dwelling.images.map(image => {
                items.push({src: image.secure_url.replace('/upload/', '/upload/w_auto,q_auto,f_auto/')});
            });
        }
        else
            backgroundImage = ImgPropiedad;

        return (
            <div>
                {
                    this.state.alert
                }
                <div className="head-img" style={{backgroundImage: `url(${backgroundImage})`}}>
                    <Button color="white" onClick={this.toggleShare}><FaShare/>{' '} Compartir</Button> {' '}

                    <Button onClick={e => {
                        e.stopPropagation();
                        this.myFavorite(dwelling._id);
                    }}
                            color="white">
                        {this.props.userProfile != 'anonymous' ?
                            favorites.includes(dwelling._id) ?
                                <FaHeart style={{color: '#fbad1c'}}/> :
                                <FaHeart/>
                            :
                            <FaHeart/>

                        }

                        {' '} Guardar</Button> {' '}

                    <Button className="pull-right" color="white" onClick={this.toggleImg}><FaImg/>{' '} Ver más</Button>
                </div>

                <Modal isOpen={this.state.modalShare} toggle={this.toggleShare} className={this.props.className}>
                    <ModalHeader toggle={this.toggleShare}>Compartir Propiedad</ModalHeader>
                    <ModalBody>
                        Facebook <br/>
                        <hr/>
                        Whatsapp <br/>
                        <hr/>
                        Mail
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalImg} toggle={this.toggleImg} className="modal-prop-imgs">
                    <UncontrolledCarousel items={items}/>
                </Modal>

                <Container>
                    <Row>
                        <Col sm={12} className="head">
                            <div className="head-main">
                                <div className="price">
                                    {dwelling.price
                                        ? <span><small>{dwelling.currency}</small><b>{dwelling.price}</b></span>
                                        : <span>Consulte Precio</span>}
                                </div>
                                <div className="head-pre">
                                    {dwelling.features.status}
                                </div>
                                <div className="head-title">
                                    {dwelling.subtype} {dwelling.occupationStatus == 'Disponible'? ' en '+dwelling.publicationType : dwelling.occupationStatus == 'Tasaciones'? ' en '+dwelling.occupationStatus : dwelling.occupationStatus} en {dwelling.address.streetName}, {dwelling.address.city}
                                </div>
                                <div className="head-sub">
                                    cód: {dwelling.siocId}
                                </div>
                            </div>
                        </Col>

                        <Col sm={12} className="content">
                            <div className="content-main">
                                <p> {dwelling.generalDescription} </p>
                            </div>
                            <div className="content-info">
                                <h5>
                                    sup. total <b>{dwelling.features.lotSurface}</b> • sup. cubierta <b>{dwelling.features.coveredSurface}</b> • sup. semicubierta <b>{dwelling.features.totalSurface}</b> 
                                </h5>

                                {dwelling.spaces.rooms !== 0 &&
                                <span>
                                    <FaHome/> {' '}
                                    {dwelling.spaces.rooms} Ambientes
                                </span>}

                                {dwelling.spaces.bathRoom !== 0 &&
                                <span>
                                    <FontAwesome name="bath"/>
                                    {dwelling.spaces.bathRoom}Baños
                                </span>}

                                <span>
                                    <FaBed/> {' '}
                                    {dwelling.spaces.bedrooms} Dormitorios
                                </span>

                                {dwelling.legal.bank &&
                                <span>
                                    <FaBank/> {' '}
                                    Apto Banco
                                </span>}
                                {dwelling.legal.prof &&
                                <span>
                                    <FaBank/> {' '}
                                    Prof
                                </span>}
                            </div>
                            <div>
                                <p>
                                    {dwelling.spaces.floors && <span><b>{dwelling.spaces.floors}</b> planta(s) -{' '}</span>} 
                                    {dwelling.spaces.closets && <span><b>{dwelling.spaces.closets}</b> placard(s) -{' '}</span>} 
                                    {dwelling.spaces.toilette && <span><b>{dwelling.spaces.toilette}</b> toilette(s) -{' '}</span>} 
                                    {(dwelling.spaces.living == true) && <span> Living - {' '}</span> }
                                    {(dwelling.spaces.livingDining == true) && <span>Living comedor - {' '}</span> }
                                    {(dwelling.spaces.diningRoom == true) && <span>Comedor - {' '}</span> }
                                    {(dwelling.spaces.kitchen == true) && <span>Cocina - {' '}</span> }
                                    {(dwelling.spaces.kitchenDining == true) && <span>Cocina comedor - {' '}</span> }
                                    {(dwelling.spaces.terrace == true) && <span>Terraza - {' '}</span> }
                                    {(dwelling.spaces.balcony == true) && <span>Balcón - {' '}</span> }
                                    {(dwelling.spaces.backYard == true) && <span>Jardín - {' '}</span> }
                                    {(dwelling.spaces.swimmingPool == true) && <span>Piscina - {' '}</span> }
                                    {(dwelling.spaces.barbecue == true) && <span>Parrilla - {' '}</span> }
                                    {dwelling.spaces.garage && <span>Garage</span>} -{' '}
                                    {dwelling.spaces.laundryRoom && <span>Lavadero</span>} -{' '}

                                </p>
                            </div>
                            <div className="content-main">
                                <h4 style={{textDecoration: 'underline'}}>Características:</h4>
                                <p>
                                    <MdChevronRight style={{color: '#003d6f'}}/>
                                    {dwelling.features.luminosity && <span>Luminosidad <b>{dwelling.features.luminosity}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.orientation && <span>Orientación <b>{dwelling.features.orientation}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.location && <span>Ubicación <b>{dwelling.features.location}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.apartments && <span>Dtos x piso <b>{dwelling.features.apartments}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.security && <span>Seguridad <b>{dwelling.features.security}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.depser && <span>Dep. Servicios <b>{dwelling.features.depser}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.constructionYear && <span>Antiguedad <b>{dwelling.features.constructionYear}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.repair && <span>P/refacción: <b>{dwelling.features.repair}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                    {dwelling.features.refurbished && <span>Fue refaccionado <b>{dwelling.features.refurbished}</b> <MdChevronRight style={{color: '#003d6f'}}/></span>} {' '}
                                </p>
                            </div>
                        </Col>

                        <Col sm={12} className="content-map">
                            {this.renderMap()}
                        </Col>

                        <Col sm={12} className="content">
                            <div className="content-main">
                                <h4 style={{textDecoration: 'underline'}}>Servicios:</h4>
                                <p>
                                    {(dwelling.services.gas == true) && <span><MdCheck style={{color: '#003d6f'}}/>Gas</span>}{' '}
                                    {(dwelling.services.sewer == true) && <span><MdCheck style={{color: '#003d6f'}}/>Cloacas </span>}{' '}
                                    {(dwelling.services.water == true) && <span><MdCheck style={{color: '#003d6f'}}/>Agua Corriente </span>}{' '}
                                    {(dwelling.services.phone == true) && <span><MdCheck style={{color: '#003d6f'}}/>Teléfono </span>}{' '}
                                    {(dwelling.services.pavement == true) && <span><MdCheck style={{color: '#003d6f'}}/>Asfalto </span>}{' '}
                                    {(dwelling.services.electricity == true) && <span><MdCheck style={{color: '#003d6f'}}/>Electricidad </span>}{' '}
                                    {(dwelling.services.cable == true) && <span><MdCheck style={{color: '#003d6f'}}/>Cable </span>}{' '}
                                </p>
                            </div>
                        </Col>

                        <Col sm={12}>
                            <hr/>
                        </Col>

                        <Col sm={12} className="text-center">
                            <h3>Consultanos ahora! Puede ser tuya...</h3>
                            <div className="pr-box text-center">
                                <a onClick={() => window.open(`https://wa.me/${this.props.dwelling.createdBy.whatsapp}?text=Hola! Estoy interesado en la propiedad ${this.props.dwelling.siocId}`)}>
                                    <FontAwesome
                                        name="whatsapp"
                                        size="5x"
                                        style={{color: '#25d366'}}
                                    />
                                    <h4>Escribinos por <span style={{color: '#25d366'}}>Whatsapp</span> web!</h4>
                                </a>
                            </div>
                        </Col>

                        <Col sm={12}>
                            <hr/>
                        </Col>
                        <Col sm={{size: 8, offset: 2}}>

                        </Col>

                        <Col>
                            <div className="pr-box">
                                <Row>
                                    <Col>
                                        <h4 className="text-center">{/*Escribinos ahora por
                                        <a
                                            onClick={() => window.open(`https://wa.me/${this.props.dwelling.createdBy.whatsapp}?text=Hola! Estoy interesado en la propiedad ${this.props.dwelling.siocId}`)}
                                            target="_blank"
                                            style={{color: '#25d366'}}>Whatsapp Web
                                        </a> */}
                                            O dejanos un mensaje y nosotros nos comunicamos.
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={12} sm={3} className="mb-2">
                                        <Input name="name" id="name" placeholder="Nombre"/>
                                    </Col>
                                    <Col xs={12} sm={3} className="mb-2">
                                        <Input name="phone" id="phone" placeholder="Cel."/>
                                    </Col>
                                    <Col xs={12} sm={3} className="mb-2">
                                        <Input type="email" name="email" id="email" placeholder="E-mail"/>
                                    </Col>
                                    <Col xs={12} sm={3}>
                                        <Input type="select">
                                            <option>Que inmobiliaria elegís?</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input type="textarea" name="text" id="text" placeholder="Mensaje"/>
                                    </Col>
                                </Row>


                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="float-btns">
                    <Button id="GoBack" className="goback" onClick={() => this.props.history.goBack()}>
                        <FontAwesome name="angle-left"/>
                        <UncontrolledTooltip placement="top" target="GoBack"> Volver </UncontrolledTooltip>
                    </Button> {' '}
                    <Button
                        onClick={() => window.open(`https://wa.me/${this.props.dwelling.createdBy.whatsapp}?text=Hola! Estoy interesado en la propiedad ${this.props.dwelling.siocId}`)}
                        id="Whatsapp"
                        className="whatsapp"
                    >
                        <FontAwesome name="whatsapp"/>
                        <UncontrolledTooltip placement="top" target="Whatsapp"> Escribinos por whatsapp
                            web
                        </UncontrolledTooltip>
                    </Button>
                </div>
            </div>
        );
    }

    renderMap() {
        return (
            <MapWithSearchBox user={this.props.userProfile} dwellings={[this.props.dwelling]} selectedRef={this.props.currentPosition}/>
        );
    }

    render() {
        return (
            (this.props.loading ?
                    <div className="overlay-spinner">
                        <MoonLoader className="overlay-spinner-child"/>
                    </div>
                    :
                    <div className="single-page">
                        {this.props.dwelling && this.renderContent()}
                    </div>
            )
        );
    }
}


export default withRouter(connect(
    state => ({
        loading: state.dwelling.loading,
        dwelling: state.dwelling.dwelling,
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile()),
        requestFindDwelling: id => dispatch(requestDwelling(id)),
        requestAddFavorite: favorite_data => dispatch(requestAddFavorite(favorite_data))
    })
)(Propiedades));
