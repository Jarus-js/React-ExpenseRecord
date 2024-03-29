import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment,'day') :true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day'): true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1; // -1 i.e a comes first 1 i.e b comes first
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

export default getVisibleExpenses;
