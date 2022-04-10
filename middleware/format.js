const moment = require('moment')
module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format)
  },
  dateDifference: function(date) {
    const dateNow = moment(Date.now())
    const dueDate = moment(date)
    const difference = dateNow.diff(dueDate, 'days')
    if (difference == 0) return -dateNow.diff(dueDate, 'hours') + ' hours'
    return -difference + ' days'
  },
  getPercentage: function(startDate, dueDate) {
    const dateNow = moment(Date.now())
    const fulldays = moment(startDate).diff(dueDate, 'days')
    const difference = dateNow.diff(dueDate, 'days')

    console.log(-difference / (-fulldays) * 100)
    if (difference == 0) return 100
    return 100 - Math.round(-difference / (-fulldays) * 100)

  }
}