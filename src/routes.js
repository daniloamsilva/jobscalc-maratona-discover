const express = require('express');
const router = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Danilo Augusto",
    avatar: "https://github.com/daniloamsilva.png",
    monthlyBudget: 3000,
    daysPerWeek: 5,
    hoursPerDay: 5,
    vacationPerYear: 4,
    valueHour: 80
  },

  controllers: {
    index(request, response) {
      return response.render(views + 'profile', { profile: Profile.data })
    },

    update(request, response) {
      console.log('estamos aqui');
      const data = request.body;

      const weeksPerYear = 52;

      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      const valueHour = data['monthly-budget'] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...data,
        monthlyBudget: data['monthly-budget'],
        daysPerWeek: data['days-per-week'],
        hoursPerDay: data['hours-per-day'],
        vacationPerYear: data['vacation-per-year'],
        valueHour
      };

      return response.redirect('/profile');
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      dailyHours: 2,
      totalHours: 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      dailyHours: 3,
      totalHours: 47,
      created_at: Date.now(),
    }
  ],

  controllers: {
    index(request, response) {
      const updatedJobs = Job.data.map(job => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data.valueHour)
        }
      })


      return response.render(views + 'index', { jobs: updatedJobs });
    },

    create(request, response) {
      return response.render(views + 'job');
    },

    save(request, response) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: request.body.name,
        dailyHours: request.body['daily-hours'],
        totalHours: request.body['total-hours'],
        created_at: Date.now()
      });
      return response.redirect('/');
    },

    show(request, response) {
      const jobId = request.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send('Job not found!');
      }

      job.budget = Job.services.calculateBudget(job, Profile.data.valueHour);

      return response.render(views + 'job-edit', { job })
    },

    update(request, response) {
      const jobId = request.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send('Job not found!');
      }

      const updatedJob = {
        ...job,
        name: request.body.name,
        totalHours: request.body['total-hours'],
        dailyHours: request.body['daily-hours'],
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)){
          job = updatedJob;
        }

        return job;
      })

      response.redirect('/job/' + job.id);
    },

    delete(request, response) {
      const jobId = request.params.id;

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

      response.redirect('/');
    }
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job.totalHours / job.dailyHours).toFixed();

      const createDate = new Date(job.created_at);
      const dueDay = createDate.getDate() + Number(remainingDays);
      const dueDateInMs = createDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    },
    calculateBudget(job, valueHour) {
      return valueHour * job.totalHours
    }
  }
}

router.get('/', Job.controllers.index);
router.get('/job', Job.controllers.create);
router.post('/job', Job.controllers.save);
router.get('/job/:id', Job.controllers.show);
router.post('/job/:id', Job.controllers.update);
router.post('/job/delete/:id', Job.controllers.delete);
router.get('/profile', Profile.controllers.index);
router.post('/profile', Profile.controllers.update);

module.exports = router;
