export const dateToStr = (date) =>
  new Date(date).toLocaleDateString(`en`, {
    month: `short`,
    day: `numeric`,
    year: `numeric`,
  })
