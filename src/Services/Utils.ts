export class Utils {

    static lowerCaseAndCapitalizeFirstLetter(text: string) {
        text = text.toLowerCase();
        return text[0].toUpperCase() + text.slice(1);
    }

    static formatDate(date: Date) {
        const newDate = new Date(date);
        
        const day = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate();
        const month = (newDate.getMonth()+1) < 10 ? ('0' + (newDate.getMonth() + 1)) : newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        return day + '/' + month + '/' + year;
    } 
}

