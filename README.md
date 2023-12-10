# SQL Performance Enhancement for Login Tests

## Overview

This repository focuses on optimizing login test performance using a `schema.sql` file for query structure. Docker is employed to set up a Node.js app and Elasticsearch, while a Node.js faker populates data into MySQL.

To expedite queries, Elasticsearch is the preferred choice for its rapid storage, search, and analysis of vast data sets in near real-time.

One effective strategy for accelerating queries involves indexing. A dedicated SQL file, `dumps/create-index.sql`, has been created to establish the necessary indexes, contributing to faster query execution.

## Prerequisites

- Docker and Docker Compose

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:plateena/tyrell-sql.git
    ```

2. **Navigate to the project directory and run Docker Compose:**

    ```bash
    cd tyrell-sql
    docker-compose build
    docker-compose up -d
    ```

3. **Access Elasticsearch at:**

    [http://localhost:9200](http://localhost:9200)

4. **Command Line Option:**

    ```bash
    docker exec -it tyrell-app node ./elastic <search word>
    ```

## Usage

1. **Fill MySQL with data:**

     Utilize existing data or generate new data using the provided `schema.sql` in the `dumps` directory. Alternatively, run:

    ```bash
    docker exec -it tyrell-app node ./generateData.js <number of data (multiplied by 1000)>
    ```

2. **MySQL Connection:**

    Connect to MySQL using the provided credentials. The schema is available in the `dumps` directory.

    ```env
    MYSQL_ROOT_PASSWORD: secret
    MYSQL_DATABASE: tyrell_jobs
    MYSQL_USER: tyrellroot
    MYSQL_PASSWORD: secret
    MYSQL_PORT: 33060
    ```

3. **Elasticsearch Query:**

    To transfer data from MySQL to Elasticsearch, run:

    ```bash
    docker exec -it tyrell-app node ./populateElasticsearch.js
    ```

    This command performs the following actions:
    - Clears existing Elasticsearch data.
    - Queries MySQL for new data.
    - Indexes the retrieved data as `jobs`.

    Check the count of stored data at [http://localhost:9200/jobs/_count](http://localhost:9200/jobs/_count).

    ### Running a Specific Query

    Execute a specific query for precise results:

    ```bash
    docker exec -it tyrell-app node ./elastic <search words>
    ```

    For example:

    ```bash
    docker exec --it tyrell-app node ./elastic manager
    ```

    Displaying the following output:

    ```bash
    Searching Elasticsearch for: manager
    Query Time: 161.718ms
    Results written to: /result/rs_query_elasticsearch.json
    Total hits results: 467
    Search and write to file completed.
    ```

4. **Running MySQL Queries:**

    Execute MySQL queries using the dedicated app. Create an SQL file in the 'dumps' directory, then run:

    ```bash
    docker exec --it tyrell-app node ./app.js <your-sql-file-name-with-extension>
    ```

    For a quick test using the default SQL file, run:

    ```bash
    docker exec --it tyrell-app node ./app.js original.sql <optional search string (%manager%)>
    ```

    Expect a sample output:

    ```bash
    Querying......
    Query Time: 447.679ms
    Searching for: manager
    Query results count (limit 50): 50
    ```

    To enhance speed, run the `create-index.sql` file:

    ```bash
    docker exec --it tyrell-app node ./app.js create-index.sql
    ```

    Then rerun the original query to observe improved performance.

## Cleanup

To stop and clean up Docker containers, run:

```bash
docker-compose down
