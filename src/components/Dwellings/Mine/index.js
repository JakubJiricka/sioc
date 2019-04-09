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
    Button
} from 'reactstrap';
import {BeatLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import FontAwesome from 'react-fontawesome';
import {requestLoadMoreDwellings} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';

moment.locale('es');

class Mine extends Component {
    static propTypes = {
        requestLoadMoreDwellings: PropTypes.func.isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
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
            firstTime: true
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.userProfile && prevState.firstTime) {
            nextProps.requestLoadMoreDwellings({client: nextProps.userProfile.client, page: prevState.page});
            return {firstTime: false};
        }
        if(nextProps.dwellings){
            if (nextProps.dwellings[0] !== prevState.items[0]) {
                if (nextProps.dwellings.length === 0) {
                    return {items: prevState.items.concat(nextProps.dwellings), loading: false, hasMore: false};
                }else{
                    return {items: prevState.items.concat(nextProps.dwellings), loading: false};
                }
            }
        }

        return null;
    }

    fetchMoreData = () => {
        setTimeout(() => {
            const {page} = this.state;
            page.pageNumber = this.state.page.pageNumber + 1;
            this.setState({page, loading: true});
            this.props.requestLoadMoreDwellings({client: this.props.userProfile.client, page: this.state.page});
        }, 500);
    };

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
                                        onClick={() => this.props.history.push(`/propiedades/${dwelling._id}`)}
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
                                                    {dwelling.createdAt !== dwelling.updatedAt ?
                                                        `Actualizado hace ${moment(dwelling.updatedAt).startOf('minutes').fromNow()}` :
                                                        `Subido ${moment(dwelling.createdAt).startOf('minutes').fromNow()}`}</span>
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
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col>
                        <h2>Mis Propiedades</h2>
                        {this.props.dwellings && this.props.dwellings.length == 0 && this.state.items.length == 0? "El cliente aún no tiene propiedades" : this.renderContent()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({
        dwellings: state.dwelling.dwellings,
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestLoadMoreDwellings: serachParams => dispatch(requestLoadMoreDwellings(serachParams))
    })
)(Mine);