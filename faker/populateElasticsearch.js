import { Client } from '@elastic/elasticsearch';
import fs from 'fs/promises';
import Database from './db.js';
import { dbConfig } from './dbConfig.js';

class DataPopulator {
    constructor() {
        this.db = new Database(dbConfig);
        this.elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'elasticsearch';
        this.elasticsearchPort = process.env.ELASTICSEARCH_PORT || 9200;
        this.sqlFilePath = process.env.SQL_FILE_PATH || '/dumps/populate.sql';
        this.indexName = 'jobs';
        this.client = new Client({ node: `http://${this.elasticsearchHost}:${this.elasticsearchPort}` });
    }

    /**
     * Read the contents of an SQL file.
     * @param {string} filePath - Path to the SQL file.
     * @returns {Promise<string>} - Resolves with the cleaned SQL query.
     */
    async readSQLFile(filePath) {
        try {
            const sqlQuery = await fs.readFile(filePath, 'utf-8');
            // Remove line breaks and extra white spaces
            const cleanedSQLQuery = sqlQuery.replace(/\s+/g, ' ').trim();
            return cleanedSQLQuery;
        } catch (error) {
            console.error('Error reading SQL file:', error);
            throw error;
        }
    }

    /**
     * Fetch data from MySQL database.
     * @returns {Promise<Array>} - Resolves with the fetched data.
     */
    async fetchDataFromMySQL() {
        try {
            await this.db.connect();

            // Specify the path to your SQL file
            const sqlQuery = await this.readSQLFile(this.sqlFilePath);

            // Execute the given SQL query
            const [rows, fields] = await this.db.query(sqlQuery);

            return rows;
        } catch (error) {
            console.error('Error fetching data from MySQL:', error);
            throw error;
        }
    }

    /**
     * Index data into Elasticsearch.
     * @param {Array} data - Data to be indexed.
     * @returns {Promise<void>}
     */
    async indexDataIntoElasticsearch(data) {
        try {
            // Check if the Elasticsearch index already exists
            const indexExists = await this.client.indices.exists({ index: this.indexName });

            if (indexExists) {
                await this.client.indices.delete({ index: this.indexName })
            }
            // If the index does not exist, create it with mappings
            await this.client.indices.create({
                index: this.indexName,
                body: {
                    mappings: {
                        properties: {
                            // Define Elasticsearch mapping properties based on your data model
                            "Jobs__id": { "type": "integer" },
                            "Jobs__name": { "type": "text" },
                            "Jobs__media_id": { "type": "integer" },
                            "Jobs__job_category_id": { "type": "integer" },
                            "Jobs__job_type_id": { "type": "integer" },
                            "Jobs__description": { "type": "text" },
                            "Jobs__detail": { "type": "text" },
                            "Jobs__business_skill": { "type": "text" },
                            "Jobs__knowledge": { "type": "text" },
                            "Jobs__location": { "type": "text" },
                            "Jobs__activity": { "type": "text" },
                            "Jobs__academic_degree_doctor": { "type": "integer" },
                            "Jobs__academic_degree_master": { "type": "integer" },
                            "Jobs__academic_degree_professional": { "type": "integer" },
                            "Jobs__academic_degree_bachelor": { "type": "integer" },
                            "Jobs__salary_statistic_group": { "type": "text" },
                            "Jobs__salary_range_first_year": { "type": "float" },
                            "Jobs__salary_range_average": { "type": "float" },
                            "Jobs__salary_range_remarks": { "type": "text" },
                            "Jobs__restriction": { "type": "text" },
                            "Jobs__estimated_total_workers": { "type": "integer" },
                            "Jobs__remarks": { "type": "text" },
                            "Jobs__url": { "type": "keyword" },
                            "Jobs__seo_description": { "type": "text" },
                            "Jobs__seo_keywords": { "type": "text" },
                            "Jobs__sort_order": { "type": "integer" },
                            "Jobs__publish_status": { "type": "integer" },
                            "Jobs__version": { "type": "integer" },
                            "Jobs__created_by": { "type": "integer" },
                            "Jobs__created": { "type": "date" },
                            "Jobs__modified": { "type": "date" },
                            "Jobs__deleted": { "type": "date" },
                            "JobCategories__id": { "type": "integer" },
                            "JobCategories__name": { "type": "text" },
                            "JobCategories__sort_order": { "type": "integer" },
                            "JobCategories__created_by": { "type": "integer" },
                            "JobCategories__created": { "type": "date" },
                            "JobCategories__modified": { "type": "date" },
                            "JobCategories__deleted": { "type": "date" },
                            "JobTypes__id": { "type": "integer" },
                            "JobTypes__name": { "type": "text" },
                            "JobTypes__job_category_id": { "type": "integer" },
                            "JobTypes__sort_order": { "type": "integer" },
                            "JobTypes__created_by": { "type": "integer" },
                            "JobTypes__created": { "type": "date" },
                            "JobTypes__modified": { "type": "date" },
                            "JobTypes__deleted": { "type": "date" }
                        },
                    },
                },
            });

            // Index data into Elasticsearch
            const operations = data.flatMap(doc => [
                { index: { _index: this.indexName } },
                doc,
            ]);

            const bulkResponse = await this.client.bulk({ refresh: true, operations })

            if (bulkResponse.errors) {
                const erroredDocuments = []
                // The items array has the same order of the dataset we just indexed.
                // The presence of the `error` key indicates that the operation
                // that we did for the document has failed.
                bulkResponse.items.forEach((action, i) => {
                    const operation = Object.keys(action)[0]
                    if (action[operation].error) {
                        erroredDocuments.push({
                            // If the status is 429 it means that you can retry the document,
                            // otherwise it's very likely a mapping error, and you should
                            // fix the document before to try it again.
                            status: action[operation].status,
                            error: action[operation].error,
                            operation: operations[i * 2],
                            document: operations[i * 2 + 1]
                        })
                    }
                })
                console.log(erroredDocuments)
            }

            const count = await this.client.count({ index: this.indexName })
            console.log(count)
        } catch (error) {
            console.error('Error indexing data into Elasticsearch:', error);
            throw error;
        }
    }

    /**
     * Populate Elasticsearch with data fetched from MySQL.
     * @returns {Promise<void>}
     */
    async populateElasticsearch() {
        try {
            const data = await this.fetchDataFromMySQL();
            await this.indexDataIntoElasticsearch(data);
        } catch (error) {
            console.error('Error during data population:', error);
        }
    }
}

// Create an instance of DataPopulator and start the population process
const dataPopulator = new DataPopulator();
dataPopulator.populateElasticsearch();
