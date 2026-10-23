
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput =
            'Welcome to What If Something Happens, your emergency preparedness assistant. You can say, give me emergency guidance, or how can I prepare for an emergency. If someone is in immediate danger, call 911 now in the United States.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask for emergency preparedness guidance.')
            .getResponse();
    }
};

const EmergencyHelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope)
            === 'EmergencyHelpIntent';
    },
    handle(handlerInput) {
        const speakOutput =
            'Your safety comes first. If this is an immediate emergency in the United States, call 911 now. Do not wait for this skill to help. For general preparedness, keep a first aid kit, drinking water, a flashlight, essential medicines, and emergency contacts ready. Learn your local emergency exits and make a plan with your household. If you have accessibility needs, plan how you will receive alerts and get assistance. Would you like more preparedness tips?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask for emergency preparedness tips.')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope)
            === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput =
            'Say, give me emergency guidance, to hear basic preparedness tips. If someone is in immediate danger in the United States, call 911.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask for emergency guidance.')
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'IntentRequest'
            && (
                Alexa.getIntentName(handlerInput.requestEnvelope)
                    === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope)
                    === 'AMAZON.StopIntent'
            );
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Stay safe. Goodbye.')
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope)
            === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput =
            'Sorry, I did not understand. You can ask for emergency guidance. If someone is in immediate danger, call 911 in the United States.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask for emergency guidance.')
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope)
            === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak('Sorry, something went wrong. Please try again. If this is an emergency, call 911 in the United States.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        EmergencyHelpIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('what-if-something-happens/v1.0')
    .lambda();
