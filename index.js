var meta = require('./meta.js')

console.log(meta.UWAPIKEY);

var UWaterlooAPI = require("uwaterloo-api")
var uwAPIClient = new UWaterlooAPI({
	API_KEY: meta.UWAPIKEY
})



exports.handler = (event, context) => {
	try {
		switch (event.request.type) {
			case "LaunchRequest":
				console.log("Lanuch Request");
				context.succeed(
					say("Welcome to UWaterloo")
				)
				break;
			case "IntentRequest":
				switch(event.request.intent.name) {
					case "getWeather":
						uwAPIClient.get('/weather/current', (error, response) => {
							context.succeed(
								say("The current temperature in the campus is: " + response.data.temperature_current_c + " celsius degree")
							)
						})
						break;
					case "getGRT":
						uwAPIClient.get('/weather/current', (error, response) => {
							context.succeed(
								say("The current temperature in the campus is: " + response.data.temperature_current_c + " celsius degree")
							)
						})
						break;
					default:
						break;
				}
				break;
			case "SessionEndedRequest":
				console.log("Session ended request");
				break;
			default:
				console.fail("INVALID REQUEST TYPE: " + event.request.type);
		}		
	} catch(error) {
		context.fail("Exception: " + error);
	}
}


/*
	The most basic function to let Alexa say something
*/
say = (speechContent) => {
	return {
		version: "1.0",
		sessionAttributes: {},
		response: {
			outputSpeech: {
				type: "PlainText",
				text: speechContent
			},
			shouldEndSession: true
		}
	}
}
