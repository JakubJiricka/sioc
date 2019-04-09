import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ButtonGroup
} from 'reactstrap';
import {BeatLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import FontAwesome from 'react-fontawesome';
import {requestSearchUsers, requestSaveClient, requestUser, clearClientSaved, requestLoadMoreDwellings, requestLoadFavourites} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Client} from '../../../model/index';

moment.locale('es');

class Edit extends Component {
    static propTypes = {
        requestSearchUsers: PropTypes.func.isRequired,
        requestSaveClient: PropTypes.func.isRequired,
        requestUser: PropTypes.func.isRequired,
        requestLoadMoreDwellings: PropTypes.func.isRequired,
        requestLoadFavourites:PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        clientUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        client: PropTypes.shape({})
    };

    static defaultProps = {
        client: new Client(),
        clientUsersOptions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            client: new Client(),
            items: [],
            page: {
                pageNumber: 0,
                perPage: 9
            },
            loading: true,
            hasMore: true,
            item_favourite: [],
            publicationType: 'propiedades',
            user: {},
            first: true
        };
    }

    componentDidMount() {
        if (this.props.location.state.client.user)
            this.props.requestUser(this.props.location.state.client.user);
        this.props.requestLoadMoreDwellings({'client': this.props.location.state.client._id, page: this.state.page});
        this.props.requestLoadFavourites({'client': this.props.location.state.client.user, page: this.state.page});

        let birthdate = this.props.location.state.client.birthdate ? this.props.location.state.client.birthdate.slice(0,10) : '';
        this.setState(
            state => ({
                client: (Object.assign({}, this.props.location.state.client, {birthdate}))
            })
        );
    }

    componentWillReceiveProps(props) {
        if (props.dwellings && props.dwellings[0] !== this.state.items[0]) {
            this.setState({
                items: this.state.items.concat(props.dwellings)
            });

            if (props.dwellings.length === 0) {
                this.setState({hasMore: false});
            }
        }

        if (props.dwelling_favourite && props.dwelling_favourite[0] != this.state.item_favourite[0]) {
            this.setState({
                item_favourite: props.dwelling_favourite
            });
        }

        if (props.user) {
            if (this.state.first) {
                this.setState(
                    state => ({
                        user: {...state.user, value: props.user._id, label: props.user.name+' '+props.user.surname+' - '+props.user.email},
                        first: false
                    })
                );
            }
            this.setState(
                state => ({
                    client: (Object.assign(state.client, {user: props.user._id}))
                })
            );
        }
    }

    fetchMoreData = () => {
        setTimeout(() => {
            const {page} = this.state;
            page.pageNumber = this.state.page.pageNumber + 1;
            this.setState({page});
            this.props.requestLoadMoreDwellings({'client': this.props.location.state.client._id, page: this.state.page});
            this.props.requestLoadFavourites({'client': this.props.location.state.client._id, page: this.state.page});
        }, 500);
    };

    handleType = (type)=>{
        this.setState({
            publicationType:type
        });
    }

    handleInput(e, id) {
        this.setState(
            state => ({
                client: (Object.assign(state.client, {[id]: e}))
            })
        );
    }

    handleChange(user) {
        this.setState(
            state => ({
                user: {...state.user, value: user.value, label: user.label}
            })
        );
        if (user.value) {
            this.props.requestUser(user.value);
        } else {
            this.setState(
                state => ({
                    client: (Object.assign(state.client, {user: undefined}))
                })
            );
        }
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            return;
        }
        event.preventDefault();
        const {client} = this.state;
        client['deleted'] = false;
        this.props.requestSaveClient(client);
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
                    <Row className="highlights-main" style={{padding: '0'}}>
                        {this.state.items.map(dwelling => {
                            let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
                            return (
                                <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                                    <div
                                        className="highlight-box"
                                        onClick={() => this.props.history.push(`/admin/dwellings/card/${dwelling._id}`)}
                                    >
                                        <div className="prop-detail-btns">
                                            <Button className="goto">
                                                <FontAwesome name="map-marker"/>
                                                <small style={{color: '#fff'}}> {dwelling.address.city} </small>
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
                                                    Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                                <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </InfiniteScroll>
            </div>
        );
    }

    renderfavourite(){
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
                        <Row className="highlights-main" style={{padding: '0'}}>
                                    {this.state.item_favourite.map(dwelling => {
                                        let img_url = dwelling.images[0] !== undefined
                                            ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                            : 'http://via.placeholder.com/330x220';
                                        return (
                                            <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                                                <div
                                                    className="highlight-box"
                                                    onClick={() => this.props.history.push(`/admin/dwellings/card/${dwelling._id}`)}
                                                >
                                                    <div className="prop-detail-btns">
                                                        <Button className="goto">
                                                            <FontAwesome name="map-marker"/>
                                                            <small style={{color: '#fff'}}> {dwelling.address.city} </small>
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
                                                                {dwelling.subtype} en {dwelling.publicationType} en {dwelling.address.streetName}
                                                            </h4>
                                                        </Col>
                                                        <Col sm={12}>
                                                            <span className="pull-left">
                                                                Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                                            <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </InfiniteScroll>
                </div>
                );
    }

    render() {
        const {clientUsersOptions, saved, unsaved} = this.props;
        const {client, user} = this.state;

        if (saved) {
            this.props.clearClientSaved();
            this.props.history.push('/admin/clients/search');
        }

        if (unsaved) {
            this.props.clearClientSaved();
            this.setState({'unsaved': unsaved});
        }

        return (
            <Container fluid className="animated fadeIn">
                <Row className="mb-4">
                    <Col><h2>Ver/Editar Cliente</h2></Col>
                </Row>
                <Form
                    className="form"
                    onSubmit={this.handleSubmit.bind(this)}>
                    <Row className="mb-4">
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    required
                                    placeholder="Ingrese Nombre del Cliente"
                                    value={client.name}
                                    onChange={e => this.handleInput(e.target.value, 'name')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Apellido</Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    required
                                    placeholder="Ingrese Apellido del Cliente"
                                    value={client.surname}
                                    onChange={e => this.handleInput(e.target.value, 'surname')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Typeahead
                                    label="Creado desde Usuario Existente"
                                    control="users"
                                    options={clientUsersOptions}
                                    onLoadOptions={term => this.props.requestSearchUsers(term, 'usuario')}
                                    placeholder="Seleccione usuario"
                                    value={user ? user : ''}
                                    onChange={params => this.handleChange(params)}
                                    removeSelected
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Celular</Label>
                                <Input
                                    type="number"
                                    required
                                    placeholder="Ingrese el Teléfono de Celular del Cliente"
                                    value={client.cellPhone}
                                    onChange={e => this.handleInput(e.target.value, 'cellPhone')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    required
                                    placeholder="Ingrese el E-mail del Cliente"
                                    value={client.email}
                                    onChange={e => this.handleInput(e.target.value, 'email')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Categoría</Label>
                                <Input
                                    type="select"
                                    required
                                    placeholder="Ingrese Categoría del Cliente"
                                    value={client.category}
                                    onChange={e => this.handleInput(e.target.value, 'category')}
                                >
                                    <option value="interesado">interesado</option>
                                    <option value="propietario">propietario</option>
                                    <option value="inquilino">inquilino</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Horario de contacto</Label>
                                <Input
                                    type="text"
                                    value={client.contactSchedule}
                                    placeholder="Ingrese un horario de contacto"
                                    maxLength={50}
                                    onChange={e => this.handleInput(e.target.value, 'contactSchedule')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>Dirección</Label>
                                <GoogleSearchBox
                                    required
                                    address={client.address}
                                    onChange={e => this.handleInput(e, 'address')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>Tel. Casa</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese el Teléfono del Cliente"
                                    value={client.phone}
                                    onChange={e => this.handleInput(e.target.value, 'phone')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>Tel. Trabajo</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese el Teléfono de Trabajo del Cliente"
                                    value={client.workPhone}
                                    onChange={e => this.handleInput(e.target.value, 'workPhone')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>Fecha de Nac.</Label>
                                <Input
                                    type="date"
                                    required
                                    value={client.birthdate}
                                    onChange={e => this.handleInput(e.target.value, 'birthdate')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>DNI</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese DNI del Cliente"
                                    value={client.documentId}
                                    onChange={e => this.handleInput(e.target.value, 'documentId')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                                <Label>CUIT</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese CUIT del Cliente"
                                    value={client.cuit}
                                    onChange={e => this.handleInput(e.target.value, 'cuit')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <FormGroup>
                                <Label>Observacioness</Label>
                                <Input
                                    type="textarea"
                                    value={client.observations}
                                    onChange={e => this.handleInput(e.target.value, 'observations')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {this.state.unsaved&&
                    <Row>
                        <Alert color="danger">
                            Email already exists
                        </Alert>
                    </Row>}

                    <Row>
                        <Col>
                            <Button
                                className="pull-right"
                                outline
                                size="lg"
                                type="submit"
                            >
                                Guardar <FontAwesome name="angle-right"/>
                            </Button>

                            <Button
                                className="pull-left"
                                outline
                                size="lg"
                                color="second"
                                onClick={() => this.props.history.push('/admin/clients/search')}
                            >
                                <FontAwesome name="angle-left"/> Volver
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <hr/>

                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <ButtonGroup className="btn-justified">
                                <Button
                                    outline
                                    onClick={() => this.handleType('propiedades')}
                                    active={this.state.publicationType === 'propiedades'}
                                >
                                    Propiedades
                                </Button>
                                <Button
                                    outline
                                    onClick={() => this.handleType('favourite')}
                                    active={this.state.publicationType === 'favourite'}
                                >
                                    Favoritas
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        {
                            this.state.publicationType == 'propiedades'?
                                this.state.items.length == 0? "El cliente aún no tiene propiedades" : this.renderContent()
                                :this.state.item_favourite.length == 0? "El cliente aún no agregó favoritas" : this.renderfavourite()
                        }
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default connect(
    state => ({
        clientUsersOptions: state.user.clientUsersOptions,
        user: state.user.user,
        saving: state.client.saving,
        saved: state.client.saved,
        unsaved: state.client.unsaved,
        dwellings: state.dwelling.dwellings,
        dwelling_favourite:state.dwelling.dwellings_favourite
    }),
    dispatch => ({
        requestSearchUsers: (term, userType) => dispatch(requestSearchUsers(term, userType)),
        requestUser: user => dispatch(requestUser(user)),
        requestSaveClient: client => dispatch(requestSaveClient(client)),
        clearClientSaved: () => dispatch(clearClientSaved()),
        requestLoadMoreDwellings: serachParams => dispatch(requestLoadMoreDwellings(serachParams)),
        requestLoadFavourites:serachParams => dispatch(requestLoadFavourites(serachParams))
    })
)(Edit);
