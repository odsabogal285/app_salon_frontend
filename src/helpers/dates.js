import { parse, format} from "date-fns";

export function convertDate (strDate) {
    const newDate = parse(strDate, 'dd/mm/yyyy', new Date());
    return format(newDate, 'yyyy/mm/dd');
}