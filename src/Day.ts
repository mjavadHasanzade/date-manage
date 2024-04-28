class Day {

    Date: Date;
    date: number;
    day: string;
    dayNumber: number;
    shortDay: string;
    year: number;
    shortYear: number;
    month: string;
    monthShort: string;
    timeStamp: number;
    week: number;
    monthNumber: number;

    constructor(date: Date | null = null, lang = 'default') {

        date = date ?? new Date();

        this.Date = date;
        this.date = date.getDate();
        this.day = date.toLocaleString(lang, { weekday: "long" });
        this.dayNumber = date.getDay() + 1
        this.shortDay = date.toLocaleString(lang, { weekday: "short" });
        this.year = date.getFullYear();
        this.shortYear = Number(
            date.toLocaleString(lang, { year: "2-digit" })
        );
        this.month = date.toLocaleString(lang, { month: "long" });
        this.monthShort = date.toLocaleString(lang, { month: "short" });
        this.timeStamp = date.getTime();
        this.week = getWeekNumber(date)
        this.monthNumber = date.getMonth() + 1;
    }

    get isToday(): boolean {
        return this.isEqualTo(new Date())
    }

    isEqualTo(date: Day | Date): boolean {
        date = date instanceof Day ? date.Date : date;

        return date.getDate() === this.date &&
            date.getMonth() === this.monthNumber - 1 &&
            date.getFullYear() === this.year
    }

    format(formatedStr: string) {
        return formatedStr.replace(/\bYYYY\b/, String(this.year))
            .replace(/\bYY\b/, String(this.shortYear))
            .replace(/\bMMMM\b/, String(this.month))
            .replace(/\bMMM\b/, String(this.monthShort))
            .replace(/\bMM\b/, String(this.monthNumber.toString().padStart(2, '0')))
            .replace(/\bM\b/, String(this.monthNumber))
            .replace(/\bDDDD\b/, String(this.day))
            .replace(/\bDDD\b/, String(this.shortDay))
            .replace(/\bDD\b/, String(this.date.toString().padStart(2, '0')))
            .replace(/\bD\b/, String(this.date))
            .replace(/\bWW\b/, String(this.week.toString().padStart(2, '0')))
            .replace(/\bW\b/, String(this.week))
    }

}
const getWeekNumber = (date: Date) => {
    const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfTheYear = (date.getTime() - firstDayOfTheYear.getTime()) / (24 * 60 * 60 * 1000); // all in milliseconds / one day in milliseconds
    return Math.ceil((pastDaysOfTheYear + firstDayOfTheYear.getDay() + 1) / 7);
}

export default Day;