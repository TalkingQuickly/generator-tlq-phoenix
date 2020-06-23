'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camelcase');
const snakeCase = require("snake-case");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`This will generate a live view controller, view module and template`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'liveViewName',
        message: 'What should the liveview be called? For DashboardViewLive enter Dashboard'
      }
    ];
    
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const baseModule = camelCase(this.appname, {pascalCase: true})
    const basePath = snakeCase.snakeCase(this.appname)
    const viewNamePascal = camelCase(this.props.liveViewName, {pascalCase: true})
    const viewPath = snakeCase.snakeCase(this.props.liveViewName)
    const templateVars = { baseModule: baseModule, viewNamePascal: viewNamePascal, viewNameSnake: basePath}

    this.fs.copyTpl(
      this.templatePath('liveview_controller.ex'),
      this.destinationPath(`lib/${basePath}_web/live/${viewPath}_live/${viewPath}_live.ex`),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('liveview_view.ex'),
      this.destinationPath(`lib/${basePath}_web/views/${viewPath}.ex`),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('liveview_template.html.leex'),
      this.destinationPath(`lib/${basePath}_web/templates/${viewPath}/${basePath}.html.leex`),
      templateVars
    );

    this.log(
      `Now add: \`live "/path", ${viewNamePascal}Live\` to your router`
    )
  }

  install() {
    // this.installDependencies();
  }
};
