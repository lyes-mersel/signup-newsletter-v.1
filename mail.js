const mailchimp = require("@mailchimp/mailchimp_marketing");
const id = require(__dirname + "/IDs.js");


// Establish a connection with MailChamp
exports.connect = () => {
    mailchimp.setConfig({
        apiKey: id.mailApiKey,
        server: "us17",
    });
}

// Add a new user to the mail list
exports.addUserToMailList = (userfirstName, userLastName, userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const subscribingUser = {
                firstName: userfirstName,
                lastName: userLastName,
                email: userEmail
            };
            const response = await mailchimp.lists.addListMember(id.mailListId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
            });
            resolve();
        } catch (e) {
            error = JSON.parse(e.response.text);
            reject(error);
        }
    })
}
