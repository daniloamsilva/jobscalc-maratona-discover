const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(request, response) {
    return response.render('job');
  },

  save(request, response) {
    const lastId = Job.get()[Job.get().length - 1]?.id || 0;

    Job.get().push({
      id: lastId + 1,
      name: request.body.name,
      dailyHours: Number(request.body['daily-hours']),
      totalHours: Number(request.body['total-hours']),
      created_at: Date.now()
    });
    
    return response.redirect('/');
  },

  show(request, response) {
    const jobId = request.params.id;

    const job = Job.get().find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return response.send('Job not found!');
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get().valueHour);

    return response.render('job-edit', { job })
  },

  update(request, response) {
    const jobId = request.params.id;

    const job = Job.get().find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return response.send('Job not found!');
    }

    const updatedJob = {
      ...job,
      name: request.body.name,
      totalHours: request.body['total-hours'],
      dailyHours: request.body['daily-hours'],
    };

    const jobsUpdated = Job.get().map(job => {
      if (Number(job.id) === Number(updatedJob.id)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(jobsUpdated);

    response.redirect('/job/' + job.id);
  },

  delete(request, response) {
    const jobId = request.params.id;

    Job.delete(jobId);

    response.redirect('/');
  }
}