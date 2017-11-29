'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay-leoman');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Bem-vindo, aqui é possivel gerar CRUDS básicos com o ' + chalk.red('L') + chalk.green('E') + 'OMAN' + '. Certifique de estar dentro no diretorio raiz do projeto!'
    ));

    var prompts = [{
      type: 'input',
      name: 'resourceName',
      message: 'Resource Name?',
      default: 'ResourceName'
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Package Name?',
      default: 'com.project.resource'
    }, {
      type: 'list',
      name: 'database',
      message: 'Qual banco de dados usado na aplicacao?',
      choices: ["MongoDB", "Mongo Embbeded", "Postgres"],
      default: 'MongoDB'
    }, {
      type: 'confirm',
      message: 'Criar metodo GET?',
      name: 'criarGET',
      default: true
    }, {
      type: 'confirm',
      message: 'Criar metodo POST?',
      name: 'criarPOST',
      default: true
    }, {
      type: 'confirm',
      message: 'Criar metodo PUT?',
      name: 'criarPUT',
      default: true
    }, {
      type: 'confirm',
      message: 'Criar metodo DELETE?',
      name: 'criarDELETE',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    var packagePath = this.props.packageName.replace(/\./g, '/');
    var lowerResourceName = this.props.resourceName.charAt(0).toLowerCase() + this.props.resourceName.slice(1);
    var options = {
      packageName: this.props.packageName,
      resourceName: this.props.resourceName,
      lowerResourceName: lowerResourceName,
      criarGET: this.props.criarGET,
      criarPOST: this.props.criarPOST,
      criarPUT: this.props.criarPUT,
      database: this.props.database,
      criarDELETE: this.props.criarDELETE
    };


    if (this.props.database == 'Postgres') {

      this.fs.copyTpl(
        this.templatePath('__Resource.java'),
        this.destinationPath('src/main/java/' + packagePath + '/entity/' + this.props.resourceName + '.java'),
        options
      );

      this.fs.copyTpl(
        this.templatePath('__ResourceRepository.java'),
        this.destinationPath('src/main/java/' + packagePath + '/repository/' + this.props.resourceName + 'Repository.java'),
        options
      );

      this.fs.copyTpl(
        this.templatePath('__ResourceRestController.java'),
        this.destinationPath('src/main/java/' + packagePath + '/controller/' + this.props.resourceName + 'Controller.java'),
        options
      );
      
    } else {
        this.fs.copyTpl(
          this.templatePath('_Resource.java'),
          this.destinationPath('src/main/java/' + packagePath + '/entity/' + this.props.resourceName + '.java'),
          options
        );
  
        this.fs.copyTpl(
          this.templatePath('_ResourceRepository.java'),
          this.destinationPath('src/main/java/' + packagePath + '/repository/' + this.props.resourceName + 'Repository.java'),
          options
        );
  
        this.fs.copyTpl(
          this.templatePath('_ResourceRestController.java'),
          this.destinationPath('src/main/java/' + packagePath + '/controller/' + this.props.resourceName + 'Controller.java'),
          options
        );
      
    }

    this.fs.copyTpl(
      this.templatePath('_ResourceService.java'),
      this.destinationPath('src/main/java/' + packagePath + '/service/' + this.props.resourceName + 'Service.java'),
      options
    );

  }

});
