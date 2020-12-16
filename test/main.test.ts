import '@aws-cdk/assert/jest';
import { App } from '@aws-cdk/core';
import { DemoStack } from '../src/lib/demo-stack';

test('Resources Test', () => {
  const app = new App();
  const stack = new DemoStack(app, 'test');

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
});