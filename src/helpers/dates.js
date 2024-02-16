import { parse, format} from "date-fns";
import es from 'date-fns/locale/es'

export function convertDate (strDate) {
    const newDate = parse(strDate, 'dd/mm/yyyy', new Date());
    return format(newDate, 'yyyy/mm/dd');
}

export function displayDate (date) {
    const formattedDate = format(date, 'PPPP', {locale: es});
    return formattedDate;
}