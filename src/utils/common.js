import moment from "moment";

export function getAge(dob) {
  return moment().diff(moment(dob, "YYYY-MM-DD"), "years");
}

export const genericErrorMessage = "Something went wrong";

export const genderOptions = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
  {
    name: "Other",
    value: "other",
  },
];
