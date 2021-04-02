const Profile = require('../models/Profile');

module.exports = {
  index(request, response) {
    return response.render('profile', { profile: Profile.get() })
  },

  update(request, response) {
    const data = request.body;

    const weeksPerYear = 52;

    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data['monthly-budget'] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      monthlyBudget: data['monthly-budget'],
      daysPerWeek: data['days-per-week'],
      hoursPerDay: data['hours-per-day'],
      vacationPerYear: data['vacation-per-year'],
      valueHour
    });

    return response.redirect('/profile');
  }
}