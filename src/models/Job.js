let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    dailyHours: 2,
    totalHours: 2,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    dailyHours: 3,
    totalHours: 47,
    created_at: Date.now(),
  }
];

module.exports = {
  get() {
    return data;
  },

  update(jobsUpdated) {
    data = jobsUpdated;
  },

  delete(jobId) {
    data = data.filter(job => Number(job.id) !== Number(jobId));
  }
}