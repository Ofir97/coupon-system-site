export class Utils {

    static lowerCaseAndCapitalizeFirstLetter(text: string) {
        text = text.toLowerCase();
        return text[0].toUpperCase() + text.slice(1);
    }

    static convertUTCToDate(date: Date) {
        const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
        const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
        const year = date.getFullYear();

        return year + '-' + month + '-' + day;
    }
}

