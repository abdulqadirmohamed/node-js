
const fs = require('fs')
const {people, ages} = require('./people')
const { error } = require('console')

console.log(people, ages)

// window.oncontextmenu = function(){
//     return false
// }

// Reading file
fs.readFile('./docs/blog.txt', (error, data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data.toString())
    }
})

// Writing file
// Directories
// Deleting files