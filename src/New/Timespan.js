import moment from "moment";
const timespan = (start, end) => moment(end).diff(moment(start), "hours");

export default timespan;