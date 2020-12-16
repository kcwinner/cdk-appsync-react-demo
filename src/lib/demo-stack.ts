import { CfnOutput, Construct, Duration, Expiration, Stack, StackProps } from '@aws-cdk/core';
import { AuthorizationType, UserPoolDefaultAction } from '@aws-cdk/aws-appsync';
import { UserPool, UserPoolClient } from '@aws-cdk/aws-cognito';

import { AppSyncTransformer } from 'cdk-appsync-transformer';

export class DemoStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'demo-user-pool');

    const userPoolClient = new UserPoolClient(this, 'demo-user-pool-client', {
      userPool,
      generateSecret: false
    });

    const appsyncTransformer = new AppSyncTransformer(this, 'demo-appsync-example', {
      schemaPath: './schema.graphql',
      apiName: 'demo-appsync-api',
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365))
          }
        },
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
              defaultAction: UserPoolDefaultAction.ALLOW
            }
          }
        ]
      }
    });

    // Outputs
    new CfnOutput(this, 'aws_user_pools_web_client_id', {
      exportName: 'awsUserPoolsWebClientId',
      value: userPoolClient.userPoolClientId
    });

    new CfnOutput(this, 'aws_appsync_apiKey', {
      exportName: 'awsAppsyncApiKey',
      value: appsyncTransformer.appsyncAPI.apiKey || ''
    });

    new CfnOutput(this, "aws_appsync_authenticationType", {
      exportName: 'awsAppsyncAuthenticationType',
      value: AuthorizationType.API_KEY
    });
  }
}