import { parse, format} from "date-fns";
import es from 'date-fns/locale/es'

export function convertDate (strDate) {
    const newDate = parse(strDate, 'dd/mm/yyyy', new Date());
    return format(newDate, 'yyyy/mm/dd');
}

export function displayDate (date) {
    const date2 = parse(date, 'yyyy-MM-dd', new Date(), { timeZone: 'UTC' });
    return format(date2, 'PPPP', {locale: es});
}