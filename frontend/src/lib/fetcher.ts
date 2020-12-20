import { API as AmplifyAPI, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';

let instance: API | undefined = undefined;

export function amplifyFetcher<TData, TVariables>(query: string, variables?: TVariables) {
    return async (): Promise<TData> => {
        console.log('VARIABLES:', variables);

        const api = API.getInstance();
        const response = await api.query(query, variables);
        return response.data;
    }
}

export class API {
    protected isSignedIn: boolean = false;

    constructor() {
        this.isSignedIn = false;
    }

    static getInstance(): API {
        if (!instance) instance = new API();
        return instance;
    }

    static updateIsSignedIn(signedIn: boolean): void {
        if (!instance) instance = new API();
        instance.isSignedIn = signedIn;
    }

    public async query(query: string, variables?: any) {
        const operation = {
            authMode: this.isSignedIn ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM,
            ...graphqlOperation(query, variables)
        }

        return await AmplifyAPI.graphql(operation) as GraphQLResult<any>;
    }
}