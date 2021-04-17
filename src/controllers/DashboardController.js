const Job = require('../models/Job');
const Profile = require('../models/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  async index(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const statusCount = {
      progress: 0,
      done: 0,
      'period-ended': 0,
      total: jobs.length
    };

    let freeHours = profile.hoursPerDay;
    
    const updatedJobs = jobs.map(job => {
      let remaining = 0;
      
      if(job.status !== 'done'){
        remaining = JobUtils.remainingDays(job);
        job.status = remaining <= 0 ? 'period-ended' : 'progress';
      }

      statusCount[job.status] += 1;
      freeHours -= job.status !== 'done' ? job.dailyHours : 0;

      return {
        ...job,
        remaining,
        budget: JobUtils.calculateBudget(job, profile.valueHour)
      }
    });

    return response.render('index', { jobs: updatedJobs, profile, statusCount, freeHours });
  },
};