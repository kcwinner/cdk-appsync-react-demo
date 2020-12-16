const fs = require('fs');
const path = require('path');

const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation();

const REGION = process.env.REGION || 'us-east-2'

const STACK_NAME = `cdk-appsync-next-demo`;

const appsyncGraphQLURLOutputKey = 'appsyncGraphQLEndpointOutput';
const userPoolIdOutputKey = 'awsUserPoolId';
const userPoolClientOutputKey = 'awsUserPoolWebClientId';
const appsyncApiKeyOutputKey = 'awsAppsyncApiKey';
const authenticationTypeOutputKey = 'awsAppsyncAuthenticationType';

let awsmobile = {
    aws_project_region: REGION,
    aws_appsync_graphqlEndpoint: '',
    aws_appsync_region: REGION,
    aws_appsync_authenticationType: 'API_KEY',
    aws_cognito_region: REGION,
    aws_user_pools_id: '',
    aws_user_pools_web_client_id: '',
    // aws_cognito_identity_pool_id: ''
};

main();

async function main() {
    const exportFileName = 'aws-exports.js';
    console.log('Generating aws-exports.js')

    var describeStackParams = {
        StackName: STACK_NAME
    };
    const stackResponse = await cloudformation.describeStacks(describeStackParams).promise()
    const stack = stackResponse.Stacks[0];

    const appsyncGraphQLEndpoint = stack.Outputs.find(output => {
        return output.OutputKey === appsyncGraphQLURLOutputKey
    })

    const userPoolId = stack.Outputs.find(output => {
        return output.OutputKey === userPoolIdOutputKey
    })

    const userPoolWebClientId = stack.Outputs.find(output => {
        return output.OutputKey === userPoolClientOutputKey
    })

    const appSyncApiKey = stack.Outputs.find(output => {
        return output.OutputKey === appsyncApiKeyOutputKey
    })

    const authenticationType = stack.Outputs.find(output => {
        return output.OutputKey === authenticationTypeOutputKey
    })

    awsmobile.aws_appsync_graphqlEndpoint = appsyncGraphQLEndpoint.OutputValue;
    awsmobile.aws_appsync_apiKey = appSyncApiKey.OutputValue;
    awsmobile.aws_appsync_authenticationType = authenticationType.OutputValue;
    awsmobile.aws_user_pools_id = userPoolId.OutputValue;
    awsmobile.aws_user_pools_web_client_id = userPoolWebClientId.OutputValue;

    let awsExportsPath = path.join(__dirname, '..', 'src', exportFileName);

    let data = `const awsmobile = ${JSON.stringify(awsmobile, null, 4)}
    
    export default awsmobile;`.replace(/^    export default awsmobile/gm, 'export default awsmobile');

    fs.writeFileSync(awsExportsPath, data);
    console.log(`Wrote exports to ${awsExportsPath}`);
}