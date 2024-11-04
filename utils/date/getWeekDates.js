const getWeekDates = (selectedDate = new Date()) => {
  const current = new Date(selectedDate); // Create a new date object to avoid mutations
  const week = [];

  // Find Monday (1) of current week
  const first =
    current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);

  // Set to first day of week
  current.setDate(first);

  // Generate array of dates for the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    date.setDate(current.getDate() + i);
    week.push(date);
  }

  return week;
};

export default getWeekDates;
