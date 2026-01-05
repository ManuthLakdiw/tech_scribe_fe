import { format, isValid } from 'date-fns';

const formatDate = (dateInput: string | Date | undefined | null) => {
    if (!dateInput) return "";

    let dateObj: Date;

    if (typeof dateInput === 'string') {
        dateObj = new Date(dateInput);

        if (!isValid(dateObj)) {
            const normalizedDate = dateInput.replace(/[./]/g, '-');
            dateObj = new Date(normalizedDate);
        }
    } else {
        dateObj = dateInput;
    }

    if (!isValid(dateObj)) {
        console.error("Date formatting error:", dateInput);
        return "Invalid Date";
    }

    return format(dateObj, 'MMM d, yyyy');
};

export default formatDate;