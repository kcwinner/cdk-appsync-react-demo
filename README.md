# CDK Appsync Transformer React Demo

*All commands assume you have proper aws credentials*

A simple CDK & React example to deploy an AppSync API with Cognito as auth. Uses [AWS Amplify schema directives](https://docs.amplify.aws/cli/graphql-transformer/directives) to transform the graphql schema.

* Checkout the [blog post](https://kennethwinner.com/2020/12/22/react-query-appsync/)
* Watch the [demo/walkthrough](https://youtu.be/JOYsv_KyNBk)

## What's in the box

### AWS Resources
* Cognito User Pool
* Cognito Identity Pool
* AppSync API
  * AppSync Resolvers
  * AppSync Datasources
* DynamoDB Table
* IAM Roles

### Schema

* Posts - uses @model and @auth directives to declare a simple dynamodb backed type
* Todos - uses @http directive to grab todos from https://jsonplaceholder.typicode.com/

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

* [cdk-appsync-transformer](https://github.com/kcwinner/cdk-appsync-transformer)
* [graphql-code-generator](https://graphql-code-generator.com/)
* [react-query](https://github.com/tannerlinsley/react-query)
* [projen](https://github.com/projen/projen)
* [blog post](https://kennethwinner.com/2020/12/22/react-query-appsync/)
* [video](https://youtu.be/JOYsv_KyNBk)