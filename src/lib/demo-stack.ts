import { AuthorizationType, UserPoolDefaultAction } from '@aws-cdk/aws-appsync';
import { CfnIdentityPool, CfnIdentityPoolRoleAttachment, UserPool, UserPoolClient } from '@aws-cdk/aws-cognito';
import { Effect, PolicyStatement, Role, WebIdentityPrincipal } from '@aws-cdk/aws-iam';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';

import { AppSyncTransformer } from 'cdk-appsync-transformer';

export class DemoStack extends Stack {
  public readonly appsyncTransformer: AppSyncTransformer;

  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'demo-user-pool', {
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: true,
        },
        phoneNumber: {
          mutable: true,
          required: true,
        },
      },
      signInAliases: {
        username: true,
      },
    });

    const userPoolClient = new UserPoolClient(this, 'demo-user-pool-client', {
      userPool,
      generateSecret: false,
    });

    const identityPool = new CfnIdentityPool(this, id, {
      identityPoolName: 'demo-identity-pool',
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        },
      ],
      allowUnauthenticatedIdentities: true,
    });

    const unAuthPrincipal = new WebIdentityPrincipal('cognito-identity.amazonaws.com')
      .withConditions({
        'StringEquals': { 'cognito-identity.amazonaws.com:aud': `${identityPool.ref}` },
        'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },
      });

    const unauthRole = new Role(this, 'demo-identity-unauth-role', {
      assumedBy: unAuthPrincipal,
    });

    new CfnIdentityPoolRoleAttachment(this, `${id}-role-map`, {
      identityPoolId: identityPool.ref,
      roles: {
        unauthenticated: unauthRole.roleArn,
      },
    });

    this.appsyncTransformer = new AppSyncTransformer(this, 'demo-appsync-example', {
      schemaPath: './schema.graphql',
      apiName: 'demo-appsync-api',
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
            defaultAction: UserPoolDefaultAction.ALLOW,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.IAM,
          },
        ],
      },
    });

    // Add allowed queries to the unauthorized identity pool role
    unauthRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'appsync:GraphQL',
        ],
        resources: [
          // Queries
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appsyncTransformer.appsyncAPI.apiId}/types/Query/fields/listPosts`,
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appsyncTransformer.appsyncAPI.apiId}/types/Query/fields/getPost`,
        ],
      }),
    );

    // Outputs
    new CfnOutput(this, 'awsUserPoolId', {
      description: 'userPoolID value for amplify exports',
      value: userPool.userPoolId,
    });

    new CfnOutput(this, 'awsUserPoolWebClientId', {
      description: 'userPoolClientID value for amplify exports',
      value: userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, 'awsIdentityPoolId', {
      description: 'identityPoolID value for amplify exports',
      value: identityPool.ref,
    });

    new CfnOutput(this, 'awsAppsyncAuthenticationType', {
      value: AuthorizationType.IAM,
    });
  }
}