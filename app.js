const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});


app.post("/",function(req, res){    

        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const email = req.body.eMail;

        var data = {
            members: [{
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
            ]
        };
        var jsonData = JSON.stringify(data);
        const url = "https://us10.api.mailchimp.com/3.0/lists/8525d7f146";
        const options = {
            method:"POST",
            auth:"coderAlbi:b16f1ae102bc209c01be249ed3aea020-us10"
        }
        const request =https.request(url,options,function(response){
            if (response.statusCode ===200){
                res.sendFile(__dirname +"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html")
            }
             response.on("data",function(data){
                 console.log(JSON.parse(data));
             })
        })
// request.write(jsonData);
request.end();

            
        
});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("This app is running on port 3000");
})


//ApiKey
//b16f1ae102bc209c01be249ed3aea020-us10



//List Id
//8525d7f146