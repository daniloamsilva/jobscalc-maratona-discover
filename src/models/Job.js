const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database();

    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();
    
    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      dailyHours: job.daily_hours,
      totalHours: job.total_hours,
      status: job.status,
      created_at: job.created_at
    }));
  },

  async update(updatedJob) {
    const db = await Database();

    if (updatedJob.status){
      await db.run(`UPDATE jobs SET
        status = "${updatedJob.status}"
      WHERE id = ${updatedJob.id}
      `)
    } else {
      await db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob.dailyHours},
        total_hours = ${updatedJob.totalHours}
      WHERE id = ${updatedJob.id}
      `)
    }

    await db.close();
  },

  async delete(jobId) {
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${jobId}`);

    await db.close();
  },

  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      status,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob.dailyHours},
      ${newJob.totalHours},
      'progress',
      ${newJob.created_at}
    )`);

    await db.close();
  }
}