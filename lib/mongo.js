const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

mongolass.plugin('addCreatedAt', {
  afterFind: function(results) {
    results.forEach(function(item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function(results) {
    if(results) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return results
  }
})

exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true }
})
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一