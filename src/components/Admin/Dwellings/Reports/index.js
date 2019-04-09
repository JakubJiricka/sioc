import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {
    Container, Row, Col,
    TabContent, TabPane,
    Nav, NavItem, NavLink,
    Card, CardText, CardBody, CardTitle, CardSubtitle,
    Table, Input, Label, Form, FormGroup
} from 'reactstrap';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import ReportsService from '../../../../services/reports'
import {requestUserProfile} from '../../../../actions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Reports extends Component {
    constructor(props) {
        super(props);
        moment.locale("es");
        this.toggle = this.toggle.bind(this);
        this.handlePickDate = this.handlePickDate.bind(this);
        this.handleWeekDate = this.handleWeekDate.bind(this);
        this.handleMonthDate = this.handleMonthDate.bind(this);
        this.handleCustomDateBegin = this.handleCustomDateBegin.bind(this);
        this.handleCustomDateEnd = this.handleCustomDateEnd.bind(this);
        this.fetchReport = this.fetchReport.bind(this);
        this.state = {
            activeTab: '0',
            beginDate: moment().startOf("day").format(),
            p1: moment().format("YYYY-MM-DD"),
            endDate: moment().endOf("day").format(),
            reports: {
                "properties": 0,
                "onsale": 0,
                "forrent": 0,
                "forsaleandrent": 0,
                "notpublished": 0,
                "sold": 0,
                "rented": 0,
                "unsubscribed": 0,
                "agencyData": [],
            }
        };
    }

    static defaultProps = {};

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            }, function () {
                switch (this.state.activeTab) {
                    case "0":
                        this.handlePickDate(moment());
                        break;
                    case "1":
                        this.handlePickDate(moment());
                        break;
                    case "2":
                        this.handleWeekDate(moment());
                        break;
                    case "3":
                        this.handleMonthDate(moment());
                        break;
                    case "4":
                        this.handleCustomDateBegin(moment());
                        break;
                }
                // this.fetchReport(this.state.beginDate,this.state.endDate);
            });
        }
    }

    static propTypes = {
        requestUserProfile: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired
    };

    componentDidMount() {
        this.props.requestUserProfile();
        this.fetchReport(this.state.beginDate, this.state.endDate);
    }

    handlePickDate(date) {
        let b = moment(date);
        let e = moment(date);
        let sd = moment(b).startOf("day");
        let ed = moment(e).endOf("day");
        this.setState({
            beginDate: sd.format(),
            endDate: ed.format()
        });
        this.fetchReport(sd.format(), ed.format());
    }

    handleWeekDate(date) {
        let b = moment(date);
        let e = moment(date);
        let sd = moment(b).startOf("isoWeek");
        let ed = moment(e).endOf("isoWeek");
        this.setState({
            beginDate: sd.format(),
            endDate: ed.format()
        });
        this.fetchReport(sd.format(), ed.format());
    }

    handleMonthDate(date) {
        let b = moment(date);
        let e = moment(date);
        let sd = b.startOf("month");
        let ed = e.endOf("month");
        this.setState({
            beginDate: sd.format(),
            endDate: ed.format()
        });
        this.fetchReport(sd.format(), ed.format());
    }

    handleCustomDateBegin(date) {
        let b = moment(date);
        let sd = moment(b).startOf("day");
        this.setState({
            beginDate: sd.format(),
        });
        this.fetchReport(sd.format(), this.state.endDate);
    }

    handleCustomDateEnd(date) {
        let e = moment(date);
        let ed = moment(e).endOf("day");
        this.setState({
            endDate: ed.format()
        });
        this.fetchReport(this.state.beginDate, ed.format());
    }

    getTypeByText(txt) {
        return data.filter(
            function (data) {
                return data.txt == txt
            }
        );
    }

    async fetchReport(beginDate, endDate) {
        const data = await ReportsService.fetchReport(this.state.activeTab, beginDate, endDate);
        if (data.success) {
            this.setState({
                reports: data.res
            });
        }
    }

    render() {
        return (
            <div>
                <Container fluid className="animated fadeIn reports">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '0'})}
                                onClick={() => {
                                    this.toggle('0');
                                }}
                            >
                                General
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Día
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                Semana
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '3'})}
                                onClick={() => {
                                    this.toggle('3');
                                }}
                            >
                                Mes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '4'})}
                                onClick={() => {
                                    this.toggle('4');
                                }}
                            >
                                Personalizado
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab="1">
                        <TabPane tabId="1">
                            <Row className="mb-2">
                                <Col sm="8">
                                    {/*<h3>Totales
                                        {this.state.activeTab === "1" ? " Diarios" : null}
                                        {this.state.activeTab === "2" ? " Semana" : null}
                                        {this.state.activeTab === "3" ? " Mes" : null}
                                        {this.state.activeTab === "4" ? " Personalizado" : null}
                                    </h3>*/}
                                </Col>
                                <Col sm="4" className="mdate">
                                    {this.state.activeTab === "0" ?
                                        <Input type="date" name="date" id="exampleDate0" defaultValue={this.state.p1}
                                               placeholder="date placeholder"
                                               onChange={(e) => this.handlePickDate(e.target.value)}/> : null}
                                    {this.state.activeTab === "1" ?
                                        <Input type="date" name="date" id="exampleDate1" defaultValue={this.state.p1}
                                               placeholder="date placeholder"
                                               onChange={(e) => this.handlePickDate(e.target.value)}/> : null}
                                    {this.state.activeTab === "2" ?
                                        <Input type="week" name="date" id="exampleDate2" defaultValue={this.state.p1}
                                               placeholder="date placeholder"
                                               onChange={(e) => this.handleWeekDate(e.target.value)}/> : null}
                                    {this.state.activeTab === "3" ?
                                        <Input type="month" name="date" id="exampleDate3" defaultValue={this.state.p1}
                                               placeholder="date placeholder"
                                               onChange={(e) => this.handleMonthDate(e.target.value)}/> : null}
                                    {this.state.activeTab === "4" ?
                                        <Form>
                                            <FormGroup row>
                                                <Label for="exampleDate41" sm={2}>Desde</Label>
                                                <Col sm={10}>
                                                    <Input type="date" name="date" id="exampleDate41"
                                                           defaultValue={this.state.p1} placeholder="date placeholder"
                                                           onChange={(e) => this.handleCustomDateBegin(e.target.value)}/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleDate42" sm={2}>Hasta</Label>
                                                <Col sm={10}>
                                                    <Input type="date" name="date" id="exampleDate42"
                                                           defaultValue={this.state.p1} placeholder="date placeholder"
                                                           onChange={(e) => this.handleCustomDateEnd(e.target.value)}/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        : null}

                                </Col>
                            </Row>
                            <Row className="report-titles text-center mt-2 mb-2">
                                <Col>
                                    <h1><b>{this.state.reports.properties}</b> prop. publicadas</h1>
                                </Col>
                            </Row>
                            <Row className="mb-2 tiles">
                                <Link to={"/admin/dwellings/reports/detailed/onsale?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>En Venta</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.onsale}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/forrent?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse>
                                        <CardBody>
                                            <CardTitle>En Alquiler</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.forrent}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Row>
                            <Row className="report-titles text-center mt-4 mb-2">
                                <Col>
                                    <h1><b>{this.state.reports.notpublished}</b> prop. sin publicar</h1>
                                </Col> 
                            </Row>
                            <Row className="mb-2 tiles">
                                <Link to={"/admin/dwellings/reports/detailed/sold?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>Vendidas</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.sold}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/rented?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>Alquiladas</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.rented}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/unsubscribed?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>Suspendidas</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.unsubscribed}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/reserved?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>Reservadas</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.reserved}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/appraisals?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse className="mr-2">
                                        <CardBody>
                                            <CardTitle>Tasaciones</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.appraisals}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                                <Link to={"/admin/dwellings/reports/detailed/deleted?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate}>
                                    <Card body inverse>
                                        <CardBody>
                                            <CardTitle>Eliminadas</CardTitle>
                                        </CardBody>
                                        <hr/>
                                        <CardBody>
                                            <CardText>{this.state.reports.deleted}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Row>
                            {
                                (this.props.userProfile && ['admin', 'martillero'].includes(this.props.userProfile.role)) ?
                                    <Row className="mb-2">

                                        <Table hover bordered striped>
                                            <thead>
                                            <tr>
                                                <th>Inmobiliaria</th>
                                                <th>Propiedades</th>
                                                <th>Venta</th>
                                                <th>Alquiler</th>
                                                <th>No Publicadas</th>
                                                <th>Vendidas</th>
                                                <th>Alquiladas</th>
                                                <th>Suspendidas</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.reports.agencyData.map(agency => {
                                                const temp = JSON.stringify(agency.agency_data);
                                                const onsale = (temp.match(/"publicationType":"Venta"/g) || []).length;
                                                const forrent = (temp.match(/"publicationType":"Alquiler"/g) || []).length;
                                                const forsaleandrent = onsale + forrent;
                                                let sold = 0;
                                                let rented = 0;
                                                let unsubscribed = 0;
                                                let notpublished = 0;
                                                if (this.state.activeTab === "0") {
                                                    sold = (temp.match(/"occupationStatus":"Vendida"/g) || []).length;
                                                    rented = (temp.match(/"occupationStatus":"Alquilada"/g) || []).length;
                                                    unsubscribed = (temp.match(/"occupationStatus":"Suspendida"/g) || []).length;
                                                    notpublished = agency.agency_data.length - (temp.match(/"occupationStatus":"Disponible"/g) || []).length;
                                                } else {
                                                    const ad = agency.agency_data;
                                                    const bd = new Date(this.state.beginDate).getTime();
                                                    const ed = new Date(this.state.endDate).getTime();
                                                    for (let i in ad) {
                                                        let item = ad[i].occupationStatusHistory;
                                                        for (let j in item) {
                                                            let k = new Date(item[j].applyDate).getTime();
                                                            if (item[j].status === "Vendida" && k >= bd && k <= ed) {
                                                                sold++;
                                                            }
                                                            if (item[j].status === "Alquilada" && k >= bd && k <= ed) {
                                                                rented++;
                                                            }
                                                            if (item[j].status === "Suspendida" && k >= bd && k <= ed) {
                                                                unsubscribed++;
                                                            }
                                                            if (item[j].status !== "Disponible" && k >= bd && k <= ed) {
                                                                notpublished++;
                                                            }
                                                        }
                                                    }
                                                }
                                                return (
                                                    <tr key={agency._id}>
                                                        <td scope="row">{agency.name}</td>
                                                        <td>{agency.agency_data.length}</td>
                                                        <td>{onsale}</td>
                                                        <td>{forrent}</td>
                                                        <td>{notpublished}</td>
                                                        <td>{sold}</td>
                                                        <td>{rented}</td>
                                                        <td>{unsubscribed}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </Table>

                                    </Row>
                                    : null
                            }
                        </TabPane>
                    </TabContent>
                </Container>
            </div>
        );
    }
}

// export default connect(
//     state => ({reports: state.reports}),
//     dispatch => ({
//         requestLoadProperties: () => dispatch(requestLoadProperties())
//     })
// )(Reports);
//export default Reports;
export default connect(
    state => ({
        userProfile: state.user.userProfile
    }),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile())
    })
)(Reports);
