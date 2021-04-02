let data = {
  name: "Danilo Augusto",
  avatar: "https://github.com/daniloamsilva.png",
  monthlyBudget: 3000,
  daysPerWeek: 5,
  hoursPerDay: 5,
  vacationPerYear: 4,
  valueHour: 80
}

module.exports = {
  get() {
    return data;
  },

  update(dataUpdated) {
    data = dataUpdated;
  }
}