import {map} from 'lodash';
import Http from './http';
import {endpoint} from '../../config.json';


export default class ReportsService {
    static async fetchReport(viewOptions, beginDate, endDate) {
        const reports = await Http.post('api/reports/', { viewOptions: viewOptions, beginDate: beginDate, endDate: endDate });
        return reports;
    }
    static async fetchReportDetailed(page, filterBy, viewOptions, beginDate, endDate, agency = '') {
        const reports = await Http.post('api/reports/detailed/', { page: page, filterBy: filterBy, viewOptions: viewOptions, beginDate: beginDate, endDate: endDate, agency: agency });
        return reports;
    }
}
