// Replace with your own values
const searchClient = algoliasearch(
    '70J2AE55B5',
    'eb2df24656fe6456fc62419029b0935c' // search only API key, not admin API key
);

const search = instantsearch({
    indexName: 'contacts',
    searchClient,
    routing: true,
});

search.addWidget(
    instantsearch.widgets.configure({
        hitsPerPage: 10,
    })
);

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for contacts',
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: document.getElementById('hit-template').innerHTML,
            empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
        },
    })
);

search.start();
