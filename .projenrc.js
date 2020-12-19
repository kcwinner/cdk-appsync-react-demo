const { AwsCdkTypeScriptApp, web, NodePackageManager } = require('projen');

const cdkProject = new AwsCdkTypeScriptApp({
  name: 'cdk-appsync-react-demo',
  packageManager: NodePackageManager.NPM,

  cdkVersion: '1.79.0',
  cdkDependencies: [
    '@aws-cdk/aws-appsync',
    '@aws-cdk/aws-cognito',
    '@aws-cdk/aws-iam',
    '@aws-cdk/core',
  ],
  deps: [
    'cdk-appsync-transformer',
  ],

  gitignore: [
    'appsync/',
  ],

  // Disable GitHub
  mergify: false,
  buildWorkflow: false,
  releaseWorkflow: false,
  rebuildBot: false,
  dependabot: false,
  pullRequestTemplate: false,
});

cdkProject.synth();

const reactProject = new web.ReactTypeScriptProject({
  name: 'cdk-appsync-react-demo-frontend',
  parent: cdkProject,
  outdir: 'frontend',

  deps: [
    '@aws-amplify/auth',
    '@aws-amplify/ui-components',
    '@aws-amplify/ui-react',
    'aws-amplify',
    'react-query@^2', // there is a PR out for @graphql-codegen/typescript-react-query to support v3
    'react-router',
    'react-router-dom',
  ],
  devDeps: [
    '@graphql-codegen/cli',
    '@graphql-codegen/typescript',
    '@graphql-codegen/typescript-operations',
    '@graphql-codegen/typescript-react-query',
    'amplify-graphql-docs-generator',
    'aws-sdk@^2',
    'graphql',
  ],

  gitignore: [
    'aws-exports.js',
  ],

  tsconfig: {
    compilerOptions: {
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      forceConsistentCasingInFileNames: false,
      module: 'esnext',
      moduleResolution: 'node',
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
    },
  },

  // Disable GitHub
  mergify: false,
  buildWorkflow: false,
  releaseWorkflow: false,
  rebuildBot: false,
  dependabot: false,
  pullRequestTemplate: false,
});

reactProject.addTask('dev', {
  description: 'Runs the application locally',
  exec: 'react-scripts start',
});

reactProject.addTask('generate-exports', {
  description: 'Generates aws-exports.js',
  exec: 'node bin/generateExports.js',
});

reactProject.addTask('copy-schema', {
  exec: 'cp ../appsync/schema.graphql ./schema.graphql',
});

reactProject.addTask('generate-statements', {
  exec: 'node bin/generateStatements.js',
});

reactProject.addTask('codegen', {
  description: 'Copies the backend schema and generates frontend code',
  exec: 'yarn run copy-schema && yarn run generate-statements && graphql-codegen --config codegen.yml && rm schema.graphql',
});

reactProject.synth();