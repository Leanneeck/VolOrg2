const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Implementing Algolia
// const algoliasearch = require('algoliasearch');
// const ALGOLIA_ID = config().app_id;
// const ALGOLIA_ADMIN_KEY = config().admin_key;
// const ALGOLIA_SEARCH_KEY = config().search_key;
// const ALGOLIA_INDEX_NAME = 'profiles';
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
//
// index.search({ query: 'query string' }, (err, { hits } = {}) => {
//     if (err) {
//         console.log(err);
//         console.log(err.debugData);
//         return;
//     }
//
//     console.log(hits);
// });
// Done implementing Algolia API

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if ( context.auth.token.admin !== true ) {
        return { error: 'only admins can add other admins'}
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

//Angolia: update index each time a profile is created

// Update the search index every time a profile is posted.
// exports.onNoteCreated = functions.firestore.document('profiles/{profileId}').onCreate((snap, context) => {
//     // Get the note document
//     const note = snap.data();
//
//     // Add an 'objectID' field which Algolia requires
//     note.objectID = context.params.noteId;
//
//     // Write to the algolia index
//     const index = client.initIndex(profiles);
//     return index.saveObject(profile);
// });

// Once your data is indexed, you can use any of Algolia's integrations for iOS, Android, or Web to search through the data.
// var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
// var index = client.initIndex('profiles');

// Perform an Algolia search:
// https://www.algolia.com/doc/api-reference/api-methods/search/
// index
//     .search({
//         query
//     })
//     .then(function(responses) {
//         // Response from Algolia:
//         // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
//         console.log(responses.hits);
//     });