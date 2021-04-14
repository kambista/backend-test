export const difInMinutes = (start: Date, end: Date) => {
    return Math.round((end.getTime() - start.getTime()) / 60000);
};