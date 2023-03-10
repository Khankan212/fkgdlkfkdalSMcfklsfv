require("dotenv").config();

let getHomePage = (req, res) => {
    return res.send("Xin chao")
};

let postWebhook = (req, res) => {
    let body = req.body;

    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    // Send a 200 OK response if this is a page webhook
    if (body.object === "page") {
        body.entry.forEach(function (entry){
            let webhook_event = entry.messaging[0];
            console.log(webhook.event);
        })
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    console.log(VERIFY_TOKEN)

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === config.verifyToken) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }

};

module.exports = {
    getHomePage: getHomePage,// key: value
    getWebhook: getWebhook,
    postWebhook: postWebhook,
}