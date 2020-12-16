const { AwsCdkTypeScriptApp, web, NodePackageManager } = require('projen');

const cdkProject = new AwsCdkTypeScriptApp({
  name: 'cdk-appsync-next-demo',
  packageManager: NodePackageManager.NPM,

  cdkVersion: '1.77.0',
  cdkDependencies: [
    '@aws-cdk/aws-appsync',
    '@aws-cdk/aws-cognito',
    '@aws-cdk/core'
  ],
  deps: [
    'cdk-appsync-transformer'
  ],

  gitignore: [
    'appsync/'
  ],

  // Disable GitHub
  mergify: false,
  buildWorkflow: false,
  releaseWorkflow: false,
  rebuildBot: false,
  dependabot: false,
  pullRequestTemplate: false
});

cdkProject.synth();

const nextProject = new web.NextJsTypeScriptProject({
  name: 'cdk-appsync-next-demo-frontend',
  parent: cdkProject,
  outdir: 'frontend',

  // Disable GitHub
  mergify: false,
  buildWorkflow: false,
  releaseWorkflow: false,
  rebuildBot: false,
  dependabot: false,
  pullRequestTemplate: false
})

nextProject.synth();