import Moment from "react-moment";
import moment from "moment";

export function getDuration(timeA, timeB) {
  var startTime = moment(timeA, "YYYY-MM-DD HH:mm:ss");
  var endTime = moment(timeB, "YYYY-MM-DD HH:mm:ss");
  var duration = moment.duration(endTime.diff(startTime));
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes()) - hours * 60;

  return `${hours}J ${minutes}m`;
}
