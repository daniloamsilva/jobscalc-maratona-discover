module.exports = {
  remainingDays(job) {
    const remainingDays = (job.totalHours / job.dailyHours).toFixed();

    const createDate = new Date(job.created_at);
    const dueDay = createDate.getDate() + Number(remainingDays);
    const dueDateInMs = createDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();

    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

    return dayDiff;
  },
  calculateBudget(job, valueHour) {
    return valueHour * job.totalHours
  }
}