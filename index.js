var meta = require('./meta.js')

console.log(meta.UWAPIKEY);

var UWaterlooAPI = require("uwaterloo-api")
var uwAPIClient = new UWaterlooAPI({
	API_KEY: meta.UWAPIKEY
})



exports.handler = (event, context) => {
	
	try {
		// New Session
		if (event.session.new) {
			console.log("new session");
		}

		switch (event.request.type) {
			case "LaunchRequest":
				console.log("Lanuch Request");
				context.succeed(
					generateResponse(
						{},
						buildSpeechletResponse("Welcome to UWaterloo", true)
					)
				)
				break;
			case "IntentRequest":
				switch(event.request.intent.name) {
					case "getWeather":
						uwAPIClient.get('/weather/current', (error, response) => {
							context.succeed(
								generateResponse(
									{},
									buildSpeechletResponse("The current temperature is: " + response.data.temperature_current_c, true)
								)
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

buildSpeechletResponse = (outputText, shouldEndSession) => {
	return {
		outputSpeech: {
			type: "PlainText",
			text: outputText
		},
		shouldEndSession: shouldEndSession
	}
}

generateResponse = (sessionAttributes, speeechletResponse) => {
	return {
		version: "1.0",
		sessionAttributes: sessionAttributes,
		response: speeechletResponse
	}
}