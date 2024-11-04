const formatMonth = (date) => {
  return date.toLocaleString("default", { month: "long" });
};

export default formatMonth;
