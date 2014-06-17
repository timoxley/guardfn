# guardfn

#### Conditionally execute a function

## Example

```js
var guard = require('guardfn')

var user = {
  name: 'Tim Oxley',
  save: function() {
    // save routine
    console.log('Saved "%s"!', this.name)
  },
  validate: function() {
    return name.length < 10
  }
}

// always calls 'user.formatName' before 'user.save'
user.save = guard(user.save, user.validate)

user.save() // => Saved "Tim Oxley"!
user.name = 'Timothy Kevin Oxley'
user.save() // => undefined

```
## API Facts

* `guardfn` returns a new Function.
* Function will only execute if guard function returns truthy value
* Original arguments will be passed as regular arguments to the guard function.
* Original `this` context is maintained.

## License

MIT
