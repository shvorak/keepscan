const path = require('path')

const paths = {
  source: path.resolve(__dirname, '../sources'),

  template: name => path.resolve(__dirname, 'plop', name)
}

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('feature', {
    description: 'Feature generation template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name'
      }
    ], // array of inquirer prompts
    actions: []  // array of actions
  });

  plop.setGenerator('entity', {
    description: 'Entity generation template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Entity name'
      },
      {
        type: "checkbox",
        name: "parts",
        message: "Choice entity actions",
        choices: [
          "actions",
          "reducer",
          "queries",
          "schema",
          "specs",
        ]
      }
    ],
    actions: [
      {
        type: "add",
        path: path.join(paths.source, 'entities/{{name}}/actions.ts'),
        skip: data => data.parts.includes('actions'),
        skipIfExists: true,
        templateFile: paths.template('actions.ts')
      },
      {
        type: "add",
        path: path.join(paths.source, 'entities/{{name}}/reducer.ts'),
        skip: data => data.parts.includes('reducer'),
        skipIfExists: true,
        templateFile: paths.template('reducer.ts')
      }
    ]
  });
};
