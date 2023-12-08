import { Client } from '@elastic/elasticsearch';

// Instantiate an Elasticsearch client
const client = new Client({ node: 'http://elasticsearch:9200' }); // Replace with your Elasticsearch server URL

// Define your Elasticsearch query
const elasticsearchQuery = {
    index: 'jobs', // Replace with your actual index name
    body: {
        query: {
            bool: {
                should: [
                    { match: { 'Jobs.name': '*search string*' } },
                    { match: { 'JobTypes.name': '*search string*' } },
                    // Add more match conditions for other fields as needed
                ],
                minimum_should_match: 1,
            },
        },
    },
};

// Perform the Elasticsearch query
const performElasticsearchQuery = async () => {
    try {
        const { body } = await client.search(elasticsearchQuery);

        // Process the results
        const hits = body.hits.hits;
        console.log('Elasticsearch Query Results:', hits);
    } catch (error) {
        console.error('Error performing Elasticsearch query:', error);
    }
};

// Execute the Elasticsearch query
performElasticsearchQuery();
