require('dotenv').config();

const axios = require('axios');

class AdoClient {

    constructor() {

        this.organization =
            process.env.ADO_ORG_URL;

        this.project =
            process.env.ADO_PROJECT;

        this.pat =
            process.env.ADO_PAT;

        this.client =
            axios.create({

                baseURL:
                    this.organization,

                headers: {

                    Authorization:
                        `Basic ${Buffer
                            .from(`:${this.pat}`)
                            .toString('base64')}`,

                    'Content-Type':
                        'application/json'
                }
            });
    }

    async getWorkItem(id) {

        const response =
            await this.client.get(

                `/${this.project}/_apis/wit/workitems/${id}?api-version=7.1`
            );

        return response.data;
    }
}

module.exports = AdoClient;