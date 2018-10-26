var levelup = require('levelup')
var leveldown = require('leveldown')



export default class LevelInstance{
    constructor(modelName){
        // 1) Create our store
        var db = levelup(leveldown('./leveldata/'))

        // 2) Put a key & value
        db.put('name', 'levelup', function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error

        // 3) Fetch by key
        db.get('name', function (err, value) {
            if (err) return console.log('Ooops!', err) // likely the key was not found

            // Ta da!
            console.log('name=' + value)
        })
        })
    }
}