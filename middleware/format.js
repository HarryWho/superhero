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

    if (difference == 0) return 100
    return ((fulldays) / (difference) * 100) - 100

  },
  truncate: function(str, len) {
    if (str.length <= len) return str;
    let subStr = str.substring(0, len)
    subStr = subStr.substring(0, subStr.lastIndexOf(' '))
    return subStr + "...";
  },
  stripTags: function(html) {
    return html.replace(/<[^>]+>/g, '');
  }
}