const { AwsCdkTypeScriptApp, web, NodePackageManager } = require('projen');

const cdkProject = new AwsCdkTypeScriptApp({
  name: 'cdk-appsync-next-demo',
  packageManager: NodePackageManager.NPM,

  cdkVersion: '1.77.0',
  cdkDependencies: [
  ],
  deps: [

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
  outdir: 'frontend'
})

nextProject.synth();