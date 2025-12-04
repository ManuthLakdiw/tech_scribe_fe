import { format, isValid } from 'date-fns';

const formatDate = (dateInput: string | Date) => {

    if (!dateInput) return "";

    let dateObj: Date;

    if (typeof dateInput === 'string') {
        const normalizedDate = dateInput.replace(/[./]/g, '-');
        dateObj = new Date(normalizedDate);
    }
    else {
        dateObj = dateInput;
    }

    if (!isValid(dateObj)) {
        return "Invalid Date";
    }

    return format(dateObj, 'MMM d, yyyy');
};


export default formatDate;