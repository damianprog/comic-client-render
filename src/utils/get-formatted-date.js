const GetFormattedDate = (date, options) => {
  const parsedDate = new Date(date);
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default GetFormattedDate;
