const getWeekDates = (selectedDate = new Date()) => {
  // Create date object in local timezone
  const current = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );
  const week = [];

  // Find Monday
  const first =
    current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);
  current.setDate(first);

  // Generate array of dates
  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    date.setDate(current.getDate() + i);
    week.push(date);
  }

  return week;
};

export default getWeekDates;
