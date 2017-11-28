'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');


module.exports = Generator.extend({
    prompting: function() {

        //Cumprimenta ao usuário.
        this.log(yosay(
            'Bem-vindo ao ' + chalk.red('L') +  chalk.green('E') + 'OMAN - O gerador de código Java Spring + MongoDB ou PostGres com Autenticacao - Desenvolvido por: ' + chalk.red('L') + 'eydson Tavares e '+ chalk.green('E') + 'merson Cantalice - UNIFACISA!'
        ));

        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'Nome do Projeto?',
            default: 'ProjectName'
        }, {
            type: 'input',
            name: 'packageName',
            message: 'Nome do Pacote?',
            default: 'com.project'
        }, {
            type: 'list',
            name: 'database',
            message: 'Qual banco de dados deseja usar?',
            choices: [ "MongoDB", "Postgres" ],
            default: 'MongoDB'
        }, {
            type: 'input',
            name: 'nameDatabase',
            message: 'Qual o nome do schema do banco de dados?',
            default: 'teste'
        }];

        return this.prompt(prompts).then(function(props) {
            // Para acessar props use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function() {

        var packagePath = this.props.packageName.replace(/\./g, '/');

        // Arquivos root do projeto
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath(this.props.projectName + '/.gitignore')
        );


        this.fs.copy(
            this.templatePath('mvnw'),
            this.destinationPath(this.props.projectName + '/mvnw')
        );

        this.fs.copy(
            this.templatePath('mvnw.cmd'),
            this.destinationPath(this.props.projectName + '/mvnw.cmd')
        );

        this.fs.copy(
            this.templatePath('pom.xml'),
            this.destinationPath(this.props.projectName + '/pom.xml')
        );


        //java files
        var options = { packageName: this.props.packageName,
                        projectName: this.props.projectName,
                        nameDatabase: this.props.nameDatabase,
                        database: this.props.database};

        this.fs.copyTpl(
            this.templatePath('src/main/java/_App.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/' + this.props.projectName + 'App.java'),
            options
        );

        // config - carga inicial
        this.fs.copyTpl(
            this.templatePath('src/main/java/config/_InitialCharge.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/InitialCharge.java'),
            options
        );

        // config - configuracao auth2
        this.fs.copyTpl(
            this.templatePath('src/main/java/config/_OAuth2ServerConfiguration.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/OAuth2ServerConfiguration.java'),
            options
        );

        // config - configuracao web security
        this.fs.copyTpl(
            this.templatePath('src/main/java/config/_WebSecurityConfiguration.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/WebSecurityConfiguration.java'),
            options
        );

        // controller - configuracao IndexController

        this.fs.copyTpl(
            this.templatePath('src/main/java/controller/_IndexController.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/controller/IndexController.java'),
            options
        );

        // controller - configuracao RoleController

        this.fs.copyTpl(
            this.templatePath('src/main/java/controller/_RoleController.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/controller/RoleController.java'),
            options
        );

        // controller - configuracao UserController

        this.fs.copyTpl(
            this.templatePath('src/main/java/controller/_UserController.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/controller/UserController.java'),
            options
        );


        // entity - configuracao EntityGeneric

        this.fs.copyTpl(
            this.templatePath('src/main/java/entity/_EntityGeneric.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/EntityGeneric.java'),
            options
        );

        // entity - configuracao RoleAccess

        this.fs.copyTpl(
            this.templatePath('src/main/java/entity/_RoleAccess.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/RoleAccess.java'),
            options
        );

        // entity - configuracao UserAccess

        this.fs.copyTpl(
            this.templatePath('src/main/java/entity/_UserAccess.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/UserAccess.java'),
            options
        );


        // repository - configuracao Repository

        //this.fs.copyTpl(
          //  this.templatePath('src/main/java/repository/_Repository.java'),
          //  this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/repository/Repository.java'),
           // options
        //);

        if (this.props.database == "MongoDB") {
            // repository - configuracao RoleRepository
            this.fs.copyTpl(
                this.templatePath('src/main/java/repository/_RoleRepository.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/repository/RoleRepository.java'),
                options
            );
            
            // repository - configuracao UserRepository
            this.fs.copyTpl(
                this.templatePath('src/main/java/repository/_UserRepository.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/repository/UserRepository.java'),
                options
            );
        } else {
            // repository - configuracao RoleRepository
            this.fs.copyTpl(
                this.templatePath('src/main/java/repository/__RoleRepository.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/repository/RoleRepository.java'),
                options
            );

            // repository - configuracao UserRepository
            this.fs.copyTpl(
                this.templatePath('src/main/java/repository/__UserRepository.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/repository/UserRepository.java'),
                options
            );
        }

        // service - configuracao MyUserDetailsService

        this.fs.copyTpl(
            this.templatePath('src/main/java/service/_MyUserDetailsService.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/MyUserDetailsService.java'),
            options
        );

        // service - configuracao RoleService

        this.fs.copyTpl(
            this.templatePath('src/main/java/service/_RoleService.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/RoleService.java'),
            options
        );

        // service - configuracao Service

        //this.fs.copyTpl(
          //  this.templatePath('src/main/java/service/_Service.java'),
           // this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/Service.java'),
           // options
        //);

        // service - configuracao UserService

        this.fs.copyTpl(
            this.templatePath('src/main/java/service/_UserService.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/UserService.java'),
            options
        );

        //resource files

        this.fs.copyTpl(
            this.templatePath('src/main/resources/'),
            this.destinationPath(this.props.projectName + '/src/main/resources/'),
            options
        );


        if (this.props.database == "MongoDB") {
            // resources - configuracao application.properties
            this.fs.copyTpl(
                this.templatePath('src/main/resources/application.properties'),
                this.destinationPath(this.props.projectName + '/src/main/resources/' + packagePath + '/resources/application.properties'),
                options
            );
        } else {
            // resources - configuracao application.properties
            this.fs.copyTpl(
                this.templatePath('src/main/resources/_application.properties'),
                this.destinationPath(this.props.projectName + '/src/main/resources/' + packagePath + '/resources/application.properties'),
                options
            );
        }

        mkdirp.sync(this.props.projectName + '/src/main/resources/static/');
        mkdirp.sync(this.props.projectName + '/src/main/resources/templates/');


        //webapp

        // this.fs.copyTpl(
        //     this.templatePath('src/main/webapp/'),
        //     this.destinationPath(this.props.projectName + '/src/main/webapp/'),
        //     options
        // );

        //test files

        // this.fs.copyTpl(
        //     this.templatePath('src/main/test/'),
        //     this.destinationPath(this.props.projectName + '/src/main/test/'),
        //     options
        // );



    },


});