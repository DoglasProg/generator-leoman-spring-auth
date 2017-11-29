# generator-leoman-spring-auth
>Cria o esqueleto de um API REST desenvolvido com o Spring Boot, que usa o OAUTH2 para proteger a API

**Nota:**  Criamos este gerador com base neste exemplo
(https://github.com/jlmonteagudo/generator-spring-rest-jwt) de José Luis Monteagudo. Obrigado José Luis.

## Instalação

Primeiro, instale [Yeoman] (http://yeoman.io) e gerador-leoman-spring-auth usando [npm] (https://www.npmjs.com/) (assumimos que você pré-instalado [node.js] (https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-leoman-spring-auth
```

Em seguida, gere seu novo projeto:

```bash
yo generator-leoman-spring-auth
```

## Uso

Depois de criar seu projeto, você pode obter um token de acesso para as seguintes contas:

```
Admin - admin:123
User - user:123
Anonymous 
```

Existem três endpoints:

```
/oauth 
/user 
/role 

```

Se você quiser obter um token , você deve enviar uma solicitação POST para o endpoints:
```
{
    post Authorization = Basic Auth cliente - 123 http://localhost:8080/oauth/token?grant_type=password&username=admin&password=123

    get token Authorization = No Auth Headers Authorization - Bearer <token>
}
```

## Criando novos endpoints

Se você quiser criar novos endpoints, você pode executar o seguinte comando dentro da pasta do projeto:

```bash
yo leoman-spring-auth:resource
```

Isso gerará uma Entidade básica, um Repositório, um Serviço e um Controlador REST com operações CRUD.

## License

UNIFACISA © [Leydson Tavares](https://github.com/LeydsonTavares)

UNIFACISA © [Emerson Cantalice](https://github.com/emersoncantalice)
