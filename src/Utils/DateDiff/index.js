import moment from 'moment';
export default (date, anotherDate = null) => {
    let createdTime = moment(date, 'YYYY-MM-DD hh:mm:ss');
    let dateNow = anotherDate ?? moment().startOf('YYYY-MM-DD hh:mm:ss');
    let current = moment.duration(createdTime.diff(dateNow));
    let orderedTime = current.asMinutes() < -59 ? (current.asHours() < -23 ? `${Math.floor(Math.abs(current.asDays()))} day` : `${Math.floor(Math.abs(current.asHours()))} hour`) : `${Math.floor(Math.abs(current.asMinutes()))} min`
    return orderedTime;
}