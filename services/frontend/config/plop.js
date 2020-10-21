const path = require('path')
const inquirer = require('inquirer')

inquirer.registerPrompt('path', require('inquirer-fuzzy-path'))

const paths = {
  root: path.resolve(__dirname, '../'),
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

  plop.setGenerator('component', {
    description: 'Generate component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name'
      },
      {
        type: 'input',
        name: 'file',
        default: ({name}) => name,
        message: 'Component file name'
      },
      {
        type: 'path',
        name: 'path',
        message: 'Where need to place',
        default: 'components/',
        itemType: 'directory',
        rootPath: 'sources',
        depthLimit: 5,
        excludeFilter: nodePath => nodePath.startsWith('.'),
      },
      {
        type: 'confirm',
        name: 'includeStyle',
        message: 'Include style file?',
        default: true
      }
    ],
    actions: data => {
      return [
        {
          type: 'add',
          path: path.join(paths.root, '{{path}}/{{dashCase file}}.tsx'),
          skipIfExists: true,
          templateFile: paths.template('component.hbs')
        },
        data.includeStyle && {
          type: 'add',
          path: path.join(paths.root, '{{path}}/{{dashCase file}}.less'),
        }
      ].filter(Boolean)
    }
  })

};
