import moment from 'moment';
import 'moment/locale/es';

export default class DateUtilsService {
    static DATE_FORMAT = 'DD/MM/YYYY';

    static formatDate(input) {
        if (!input) {
            return '';
        }
        return moment(input).format(DateUtilsService.DATE_FORMAT);
    }
}
