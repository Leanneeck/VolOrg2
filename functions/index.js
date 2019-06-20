const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Implementing Algolia
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = config().app_id;
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
// const ALGOLIA_INDEX_NAME = 'profiles';
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// Done implementing Algolia

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if ( context.auth.token.admin !== true ) {
        return { error: 'only admins can add other admins, sucker'}
    }
    // get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });
});