import '@aws-cdk/assert/jest';
import { App } from '@aws-cdk/core';
import { DemoStack } from '../src/lib/demo-stack';

test('Resources Test', () => {
  const app = new App();
  const stack = new DemoStack(app, 'test');

  // Loops through all of our tables and
  const tableData = stack.appsyncTransformer.outputs.cdkTables;
  expect(tableData).toBeTruthy();

  for (const [tableName] of Object.entries(tableData!)) {
    expect(stack.appsyncTransformer.nestedAppsyncStack).toHaveResource('AWS::AppSync::DataSource', {
      Name: tableName,
      Type: 'AMAZON_DYNAMODB',
    });
  }
});