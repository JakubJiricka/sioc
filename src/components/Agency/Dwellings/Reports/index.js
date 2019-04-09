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
            })
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
                                {/*<Col sm="8">
                                    <h4>Totales
                                        {this.state.activeTab === "1" ? " Diarios" : null}
                                        {this.state.activeTab === "2" ? " Semana" : null}
                                        {this.state.activeTab === "3" ? " Mes" : null}
                                        {this.state.activeTab === "4" ? " Personalizado" : null}
                                    </h4>
                                </Col>*/}
                                <div style={{width: '100%'}} className="mdate">
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
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="exampleDate41">Desde</Label>
                                                        
                                                            <Input type="date" name="date" id="exampleDate41"
                                                                   defaultValue={this.state.p1} placeholder="date placeholder"
                                                                   onChange={(e) => this.handleCustomDateBegin(e.target.value)}/>
                                                        
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="exampleDate42">Hasta</Label>
                                                        
                                                            <Input type="date" name="date" id="exampleDate42"
                                                                   defaultValue={this.state.p1} placeholder="date placeholder"
                                                                   onChange={(e) => this.handleCustomDateEnd(e.target.value)}/>
                                                        
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        : null}
                                </div>
                            </Row>
                            {this.state.reports.agencyData.map(agency => {
                                    if (agency.name == this.props.userProfile.agency) {
                                        let onsale = 0;
                                        let forrent = 0;
                                        let forsaleandrent = 0;
                                        agency.agency_data.map(dwelling => {
                                            if (dwelling.publicationType == 'Venta' && dwelling.occupationStatus == 'Disponible') {
                                                onsale +=1;
                                            }
                                            if (dwelling.publicationType == 'Alquiler' && dwelling.occupationStatus == 'Disponible') {
                                                forrent +=1;
                                            }
                                        });
                                        forsaleandrent = onsale + forrent;
                                        const temp = JSON.stringify(agency.agency_data);
                                        let sold = 0;
                                        let rented = 0;
                                        let unsubscribed = 0;
                                        let reserved = 0;
                                        let appraisals = 0;
                                        let notpublished = 0;
                                        let deleted = 0;
                                        if (this.state.activeTab === "0") {
                                            sold = (temp.match(/"occupationStatus":"Vendida"/g) || []).length;
                                            rented = (temp.match(/"occupationStatus":"Alquilada"/g) || []).length;
                                            unsubscribed = (temp.match(/"occupationStatus":"Suspendida"/g) || []).length;
                                            reserved = (temp.match(/"occupationStatus":"Reservada"/g) || []).length;
                                            appraisals = (temp.match(/"occupationStatus":"Tasaciones"/g) || []).length;
                                            notpublished = agency.agency_data.length - (temp.match(/"occupationStatus":"Disponible"/g) || []).length;
                                            deleted = (temp.match(/"occupationStatus":"Eliminada"/g) || []).length;
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
                                                    if (item[j].status === "Reservada" && k >= bd && k <= ed) {
                                                        reserved++;
                                                    }
                                                    if (item[j].status === "Tasaciones" && k >= bd && k <= ed) {
                                                        appraisals++;
                                                    }
                                                    if (item[j].status !== "Disponible" && k >= bd && k <= ed) {
                                                        notpublished++;
                                                    }
                                                    if (item[j].status === "Eliminada" && k >= bd && k <= ed) {
                                                        deleted++;
                                                    }
                                                }
                                            }
                                        }
                                        return (
                                            <div key={agency._id}>
                                                <Row className="report-titles text-center mt-2 mb-2">
                                                    <Col>
                                                        <h1><b>{forsaleandrent}</b> prop. publicadas</h1>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2 tiles">
                                                    <Link to={"/agency/dwellings/reports/detailed/onsale?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>En Venta</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{onsale}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/forrent?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse>
                                                            <CardBody>
                                                                <CardTitle>En Alquiler</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{forrent}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                </Row>
                                                <Row className="report-titles text-center mt-4 mb-2">
                                                    <Col>
                                                        <h1><b>{notpublished}</b> prop. sin publicar</h1>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2 tiles">
                                                    <Link to={"/agency/dwellings/reports/detailed/sold?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>Vendidas</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{sold}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/rented?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>Alquiladas</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{rented}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/unsubscribed?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>Suspendidas</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{unsubscribed}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/reserved?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>Reservadas</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{this.state.reports.reserved}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/appraisals?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse className="mr-2">
                                                            <CardBody>
                                                                <CardTitle>Tasaciones</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{this.state.reports.appraisals}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                    <Link to={"/agency/dwellings/reports/detailed/deleted?tab="+this.state.activeTab+"&from="+this.state.beginDate+"&to="+this.state.endDate+"&agency="+agency._id}>
                                                        <Card body inverse>
                                                            <CardBody>
                                                                <CardTitle>Eliminadas</CardTitle>
                                                            </CardBody>
                                                            <CardBody>
                                                                <CardText>{this.state.reports.deleted}</CardText>
                                                            </CardBody>
                                                        </Card>
                                                    </Link>
                                                </Row>
                                            </div>
                                        )
                                    }
                                }
                            )}
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
