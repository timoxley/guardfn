var guard = require('../')

var user = {
  name: 'Tim Oxley',
  save: function() {
    // save routine
    console.log('Saved "%s"!', this.name)
  },
  validate: function() {
    return this.name.length < 10
  }
}

// always calls 'user.formatName' before 'user.save'
user.save = guard(user.save, user.validate)

user.save() // => Saved "Tim Oxley"!
user.name = 'Timothy Kevin Oxley'
user.save() // => undefined
