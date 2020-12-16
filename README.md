# CDK Appsync Transformer Next Demo

Built on top of [@dabit3's](https://twitter.com/dabit3) [Full stack with Next.js, Amplify, & CDK example](https://github.com/dabit3/amplify-with-cdk).

## To deploy as is

1. Clone The Repository
```bash
git clone https://github.com/kcwinner/cdk-appsync-next-demo.git
cd cdk-appsync-next-demo
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

1. Generate Exports
```
node frontend/bin/generateExports.js
```

1. Run the frontend locally
```bash
cd frontend
npm run dev
```

## References

* [Full stack with Next.js, Amplify, & CDK example by Nader Dabit](https://github.com/dabit3/amplify-with-cdk)
* [cdk-appsync-transformer](https://github.com/kcwinner/cdk-appsync-transformer)