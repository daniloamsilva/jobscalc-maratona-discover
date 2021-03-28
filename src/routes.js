const express = require('express');
const router = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Danilo Augusto",
  avatar: "https://github.com/daniloamsilva.png",
  monthlyBudget: 3000,
  daysPerWeek: 5,
  hoursPerDay: 5,
  vacationPerYear: 4
}

router.get('/', (request, response) => {
  return response.render(views + 'index');
});

router.get('/job', (request, response) => {
  return response.render(views + 'job');
});

router.get('/job/edit', (request, response) => {
  return response.render(views + 'job-edit');
});

router.get('/profile', (request, response) => {
  return response.render(views + 'profile', { profile });
});

module.exports = router;
