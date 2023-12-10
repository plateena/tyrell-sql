import { Client } from '@elastic/elasticsearch';
import fs from 'fs/promises';
import { fieldNamesArray } from './elastic/mappings.js';

class ElasticsearchSearch {
    /**
     * Creates an instance of ElasticsearchSearch.
     * @param {string} [indexName='jobs'] - The name of the Elasticsearch index.
     */
    constructor(indexName = 'jobs') {
        this.elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'elasticsearch';
        this.elasticsearchPort = process.env.ELASTICSEARCH_PORT || 9200;
        this.indexName = indexName;
        this.client = new Client({ node: `http://${this.elasticsearchHost}:${this.elasticsearchPort}` });
    }

    /**
     * Search Elasticsearch index.
     * @param {string} query - The search query.
     * @param {string[]} fields - Array of field names to search.
     * @param {string} outputFilePath - The path to the JSON file where results will be saved.
     * @returns {Promise<Object>} - Resolves with the search results.
     */
    async searchIndex(query, fields, outputFilePath) {
        try {
            const shouldClauses = fields.map(fieldName => ({
                wildcard: {
                    [fieldName]: `*${query}*`,
                },
            }));

            console.time('Query Time');
            const result = await this.client.search({
                index: this.indexName,
                body: {
                    query: {
                        bool: {
                            should: shouldClauses
                        }
                    },
                    sort: [
                        { ['Jobs__sort_order']: { order: 'desc' } },
                        { ['Jobs__id']: { order: 'desc' } }
                    ],
                    size: 50,
                    from: 0,
                },
            });
            console.timeEnd('Query Time');

            // Extract _source field from each result
            const sourceFields = result.hits.hits.map(hit => hit._source);
            // Write _source fields to a JSON file
            await fs.writeFile(outputFilePath, JSON.stringify(sourceFields, null, 2));

            console.log('Results written to:', outputFilePath);
            console.log('Total hits results:', result.hits.total.value);

            return result.hits;
        } catch (error) {
            console.error('Error searching Elasticsearch index:', error.message || error);
            throw error;
        }
    }
}

/**
 * Main function to execute Elasticsearch search from the command line.
 */
async function main() {
    // Create an instance of ElasticsearchSearch
    const searchClient = new ElasticsearchSearch();

    // Retrieve the search query from the command line arguments
    const searchQuery = process.argv[2];

    if (!searchQuery) {
        console.error('Please provide a search query as a command line argument.');
        process.exit(1);
    }

    console.log(`Searching Elasticsearch for: ${searchQuery}`);

    // Replace 'OutputFilePath' with the desired output file path
    const outputFilePath = '/result/rs_query_elasticsearch.json';

    try {
        // Execute the Elasticsearch search and write results to a file
        const results = await searchClient.searchIndex(searchQuery, fieldNamesArray, outputFilePath);
        console.log('Search and write to file completed.');
    } catch (error) {
        console.error('Error in search and write to file:', error.message || error);
    }
}

// Call the main function
main();
