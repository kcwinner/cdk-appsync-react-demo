# CDK Appsync Transformer React Demo

*All commands assume you have proper aws credentials*

A simple CDK & React example to deploy an AppSync API with Cognito as auth. Uses AWS Amplify schema directives to transform the graphql schema.

Deploys
* Cognito User Pool
* Cognito Identity Pool
* AppSync API
* DynamoDB Table(s)

## To deploy as is

1. Clone The Repository
```bash
git clone https://github.com/kcwinner/cdk-appsync-react-demo.git
cd cdk-appsync-react-demo
```

1. Initialize The Project
```bash
npx projen
```

1. Test And Deploy
```bash
npm run test
npm run deploy
```

1. Generate Exports && GraphQL Types
```
cd frontend
yarn run generate-exports
yarn run codegen
```

1. Run the frontend locally
```bash
yarn run dev
```

## References

* [projen](https://github.com/projen/projen)
* [cdk-appsync-transformer](https://github.com/kcwinner/cdk-appsync-transformer)
* [graphql-code-generator](https://graphql-code-generator.com/)
* [react-query](https://github.com/tannerlinsley/react-query)
