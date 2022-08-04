const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.post("/", function (req, res) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};
	const jsonData = JSON.stringify(data);

	const url = "https://us13.api.mailchimp.com/3.0/lists/7955ae3531";
	const options = {
		method: "POST",
		auth: "naruto1:e12f5d2e3c958681232f60f352eea07a-us13",
	};
	const request = https.request(url, options, function (response) {
		if (response.statusCode == 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.listen(process.env.PORT || 3000, function () {
	console.log("server is up and running");
});
