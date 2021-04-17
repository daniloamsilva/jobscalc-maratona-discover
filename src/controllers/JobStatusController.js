const Job = require('../models/Job');

module.exports = {
  async update(request, response) {
    const jobId = request.params.id

    const updatedJob = {
      id: jobId,
      name: request.body.name,
      totalHours: request.body['total-hours'],
      dailyHours: request.body['daily-hours'],
      status: 'done',
    };

    await Job.update(updatedJob);

    response.redirect('/');
  }
}