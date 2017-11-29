'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay-leoman');
var mkdirp = require('mkdirp');


module.exports = Generator.extend({
    prompting: function () {

        //Cumprimenta ao usuário.
        this.log(yosay(
            'Bem-vindo ao ' + chalk.red('L') + chalk.green('E') + 'OMAN - O gerador de código Java com Spring + MongoDB ou Postgres + Autenticacao - Desenvolvido por: ' + chalk.red('L') + 'eydson Tavares e ' + chalk.green('E') + 'merson Cantalice - Coordenado por: Daniel Abella ' + chalk.blue('UNIFACISA!')
        ));

        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'Nome do Projeto?',
            default: 'ProjectName'
        }, {
            type: 'input',
            name: 'artifactId',
            message: 'Nome do Artifact-id?',
            default: 'leoman-project'
        }, {
            type: 'input',
            name: 'packageName',
            message: 'Nome do Group-id?',
            default: 'br.com.project'
        }, {
            type: 'input',
            name: 'version',
            message: 'Versão do Projeto',
            default: '0.0.1-SNAPSHOT'
        }, {
            type: 'input',
            name: 'description',
            message: 'Descrição do Projeto?',
            default: 'project generate for leoman'
        }, {
            type: 'list',
            name: 'typecache',
            message: 'Qual gerenciamento de Cache deseja usar?',
            choices: ["EhCache", "Hazelcast", "Nenhum"],
            default: 'Nenhum'
        }, {
            type: 'list',
            name: 'database',
            message: 'Qual banco de dados deseja usar?',
            choices: ["MongoDB", "Mongo Embbeded", "Postgres"],
            default: 'MongoDB'
        }, {
            type: 'input',
            name: 'nameDatabase',
            message: 'Qual o nome do schema do banco de dados?',
            default: 'teste'
        }, {
            type: 'input',
            name: 'ip',
            message: 'Qual o ip do banco de dados?',
            default: 'localhost'
        }, {
            type: 'input',
            name: 'userDB',
            message: 'Qual o usuario do banco de dados?',
            default: 'admin'
        }, {
            type: 'input',
            name: 'porta',
            message: 'Qual a porta do banco de dados?',
            default: '27217'
        }, {
            type: 'input',
            name: 'passDB',
            message: 'Qual a senha do banco de dados?',
            default: 'admin'
        }];

        return this.prompt(prompts).then(function (props) {
            // Para acessar props use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function () {

        //Arquivos Java
        var options = {
            packageName: this.props.packageName,
            projectName: this.props.projectName,
            nameDatabase: this.props.nameDatabase,
            database: this.props.database,
            artifactId: this.props.artifactId,
            version: this.props.version,
            description: this.props.description,
            typecache: this.props.typecache,
            ip: this.props.ip,
            userDB: this.props.userDB,
            porta: this.props.porta,
            passDB: this.props.passDB
        };

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

        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath(this.props.projectName + '/pom.xml'),
            options
        );

        // CACHE configuracao do gerenciaento de cache

        // configuracao EhCache
        if (this.props.typecache === "EhCache") {

            this.fs.copyTpl(
                this.templatePath('src/main/java/___App.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/' + this.props.projectName + 'App.java'),
                options
            );

            this.fs.copy(
                this.templatePath('src/main/resources/ehcache.xml'),
                this.destinationPath(this.props.projectName + '/src/main/resources/ehcache.xml')
            );

            // configuracao Hazelcast
        } else if (this.props.typecache === "Hazelcast") {

            this.fs.copyTpl(
                this.templatePath('src/main/java/__App.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/' + this.props.projectName + 'App.java'),
                options
            );

            // configuracao sem gerenciamento de cache
        } else {

            this.fs.copyTpl(
                this.templatePath('src/main/java/_App.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/' + this.props.projectName + 'App.java'),
                options
            );

        }

        // config - carga inicial

        if (this.props.database === "Postgres") {
            this.fs.copyTpl(
                this.templatePath('src/main/java/config/__InitialCharge.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/InitialCharge.java'),
                options
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('src/main/java/config/_InitialCharge.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/InitialCharge.java'),
                options
            );
        }

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



        if (this.props.database === "MongoDB" || this.props.database === "Mongo Embbeded") {

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

            // entity - EntityGeneric

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/_EntityGeneric.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/EntityGeneric.java'),
                options
            );

            // entity - RoleAccess

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/_RoleAccess.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/RoleAccess.java'),
                options
            );

            // entity - UserAccess

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/_UserAccess.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/UserAccess.java'),
                options
            );

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

            // service - configuracao RoleService

            this.fs.copyTpl(
                this.templatePath('src/main/java/service/_RoleService.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/RoleService.java'),
                options
            );


            // service - configuracao UserService

            this.fs.copyTpl(
                this.templatePath('src/main/java/service/_UserService.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/UserService.java'),
                options
            );


            // configuracao especifica do Mongo Embbeded

            if (this.props.database === "Mongo Embbeded") {
                this.fs.copyTpl(
                    this.templatePath('src/main/java/config/_MongoConfig.java'),
                    this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/config/MongoConfig.java'),
                    options
                );

            }
        } else {

            // controller - configuracao RoleController

            this.fs.copyTpl(
                this.templatePath('src/main/java/controller/__RoleController.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/controller/RoleController.java'),
                options
            );

            // controller - configuracao UserController

            this.fs.copyTpl(
                this.templatePath('src/main/java/controller/__UserController.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/controller/UserController.java'),
                options
            );

            // entity - EntityGeneric

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/__EntityGeneric.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/EntityGeneric.java'),
                options
            );

            // entity - RoleAccess

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/__RoleAccess.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/RoleAccess.java'),
                options
            );

            // entity - UserAccess

            this.fs.copyTpl(
                this.templatePath('src/main/java/entity/__UserAccess.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/entity/UserAccess.java'),
                options
            );

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

            // service - configuracao RoleService

            this.fs.copyTpl(
                this.templatePath('src/main/java/service/__RoleService.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/RoleService.java'),
                options
            );


            // service - configuracao UserService

            this.fs.copyTpl(
                this.templatePath('src/main/java/service/__UserService.java'),
                this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/UserService.java'),
                options
            );

        }

        // service - configuracao MyUserDetailsService

        this.fs.copyTpl(
            this.templatePath('src/main/java/service/_MyUserDetailsService.java'),
            this.destinationPath(this.props.projectName + '/src/main/java/' + packagePath + '/service/MyUserDetailsService.java'),
            options
        );

        if (this.props.database == "MongoDB") {
            // resources - configuracao application.properties
            this.fs.copyTpl(
                this.templatePath('src/main/resources/application.properties'),
                this.destinationPath(this.props.projectName + '/src/main/resources/application.properties'),
                options
            );
        }

        if (this.props.database == "Postgres") {
            // resources - configuracao application.properties
            this.fs.copyTpl(
                this.templatePath('src/main/resources/_application.properties'),
                this.destinationPath(this.props.projectName + '/src/main/resources/application.properties'),
                options
            );
        }

        mkdirp.sync(this.props.projectName + '/src/main/resources/static/');
        mkdirp.sync(this.props.projectName + '/src/main/resources/templates/');

    },


});