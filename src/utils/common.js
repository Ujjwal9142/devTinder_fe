import moment from "moment";

export function getAge(dob) {
  return moment().diff(moment(dob, "YYYY-MM-DD"), "years");
}

export const genericErrorMessage = "Something went wrong";
