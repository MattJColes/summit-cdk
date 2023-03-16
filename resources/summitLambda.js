const { TranslateClient, TranslateTextCommand } = require('@aws-sdk/client-translate');

exports.handler = async function(event) {
    let sendText = '';
    let responseText = '';
    if (event.body) {
        let body = JSON.parse(event.body)
        if (body.text) {
            sendText = body.text;
        }
    }

    const translateClient = new TranslateClient({region: 'ap-southeast-2'});
    const parameters = {
        SourceLanguageCode: 'en',
        TargetLanguageCode: 'ja',
        Text: sendText
    };
    const translateCommand = new TranslateTextCommand(parameters);

    try {
        const data = await translateClient.send(translateCommand);
        responseText = data['TranslatedText'];
    } catch (error) {
        responseText = error['message']
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(responseText),
    };
    return response;
};


/*
curl -X POST \
  'https://z0akhae58k.execute-api.ap-southeast-2.amazonaws.com/prod/' \
  -H 'content-type: application/json' \
  -d '{ "text": "Hi there" }'
*/