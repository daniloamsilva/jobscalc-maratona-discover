const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  index(request, response) {
    const statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length
    };

    const profile = Profile.get();
    let freeHours = profile.hoursPerDay;
    
    const updatedJobs = Job.get().map(job => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      statusCount[status] += 1;
      freeHours -= status === 'progress' ? job.dailyHours : 0;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get().valueHour)
      }
    });

    return response.render('index', { jobs: updatedJobs, profile, statusCount, freeHours });
  },
}