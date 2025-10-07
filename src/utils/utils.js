import moment from "moment";

const formatDate = (value, format = "DD/MM/YYYY") => {
  return value ? moment.utc(value).local(true).format(format) : "-";
};

const formatEmptyRow = (row, column, prop) => prop || "-";

const formatListToCard = (row, column, prop) =>
  prop
    .map((item, index) => (index !== prop.length - 1 ? item + ", " : item))
    .join("");

export default {
  formatDate,
  formatEmptyRow,
  formatListToCard,
};
