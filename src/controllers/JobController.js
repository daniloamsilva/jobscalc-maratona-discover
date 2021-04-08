const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(request, response) {
    return response.render('job');
  },

  async save(request, response) {
    await Job.create({
      name: request.body.name,
      dailyHours: Number(request.body['daily-hours']),
      totalHours: Number(request.body['total-hours']),
      created_at: Date.now()
    });
    
    return response.redirect('/');
  },

  async show(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = request.params.id;

    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return response.send('Job not found!');
    }

    job.budget = JobUtils.calculateBudget(job, profile.valueHour);

    return response.render('job-edit', { job })
  },

  async update(request, response) {
    const jobId = request.params.id

    const updatedJob = {
      id: jobId,
      name: request.body.name,
      totalHours: request.body['total-hours'],
      dailyHours: request.body['daily-hours'],
    };

    await Job.update(updatedJob);

    response.redirect('/job/' + jobId);
  },

  async delete(request, response) {
    const jobId = request.params.id;

    await Job.delete(jobId);

    return response.redirect('/');
  }
}