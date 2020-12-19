import { App } from '@aws-cdk/core';
import { DemoStack } from './lib/demo-stack';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new DemoStack(app, 'cdk-appsync-next-demo', { env: devEnv });

app.synth();