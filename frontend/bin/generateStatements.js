const path = require('path');
const fs = require('fs-extra');
const { generate } = require('amplify-graphql-docs-generator');

generateStatements();

async function generateStatements() {
    const outputPath = path.join(__dirname, '..', './src/graphql/');

    const schemaPath = path.join(__dirname, '..', 'schema.graphql');
    const language = 'typescript';

    try {
        fs.ensureDirSync(outputPath);
        generate(schemaPath, outputPath, {
            separateFiles: true,
            language,
            maxDepth: 5
        });
    } catch(err) {
        console.error(err)
    }
}