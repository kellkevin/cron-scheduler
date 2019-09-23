const express = require('express');
const cron = require('node-cron');
const port = 3003;
const app = express();


function schedule(cronPattern,task) {
    // Validate the pattern
    var validateCronPattern = new Promise((resolve, reject)=> {
        if(cron.validate(cronPattern) === true) {
            resolve(true);
            
        }else {
            reject(new Error("Pattern is not correct"));
        }
        
    });
        validateCronPattern.then(function(result){
            // schedule task
            cron.schedule(cronPattern, ()=> {
                task();
            });
            // Run the server if it's all good to go
            app.get("/", (req, res) => {
                res.send("Index Route");
            });

            app.listen(port, ()=> console.log(`Server: PORT ${port} online!`));
        }).catch(function(error){
            console.log("ERROR: " + error );
        });
}


schedule("*/10 * * * * *", () => {
    console.log("every 10 seconds, I will run");
});