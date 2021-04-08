const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      monthlyBudget: data.monthly_budget,
      daysPerWeek: data.days_per_week,
      hoursPerDay: data.hours_per_day,
      vacationPerYear: data.vacation_per_year,
      valueHour: data.value_hour
    };
  },

  async update(dataUpdated) {
    const db = await Database();

    await db.run(`UPDATE profile SET
      name = "${dataUpdated.name}",
      avatar = "${dataUpdated.avatar}",
      monthly_budget = ${dataUpdated.monthlyBudget},
      days_per_week = ${dataUpdated.daysPerWeek},
      hours_per_day = ${dataUpdated.hoursPerDay},
      vacation_per_year = ${dataUpdated.vacationPerYear},
      value_hour = ${dataUpdated.valueHour}
    `);

    await db.close();
  }
}