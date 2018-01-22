## Tecnologias utilizadas
- Ionic Framework
- MySQL
- Laravel
- CORS Everywhere

## Executando a aplicação

Como a API e o App ao rodarem localmente provocam CORS problems, utilizei a extensão CORS Everywhere para o firefox que permite que requisições CORS ocorram. Desta forma, não foi necessário instalar a dependência de  cors para laravel.

É natural que ao colocar a API em um servidor externo, não ocorra CORS, e por tanto, tal aplicação seria desnecessária.

Se você for rodar o aplicativo no browser, o CORS Everywhere ou outra extensão semelhante se faz necessário.

Se você quiser rodar o aplicativo no celular, precisará colocar a API em um servidor real, ou executar ações para que o cors seja tratado entre o seu celular e o seu computador.


#### Crie a base de dados
Crie uma base de dados MySQL para a aplicação. Sugiro que a base se chame "tasks".

#### Clone e execute a API
Realize o `git clone` da api, e modifique o arquivo `.env` colocando suas credenciais do banco de dados para a API.

Para rodar a api em Laravel, tendo as tecnologias descritas na seção "Laravel" e o banco de dados configurado, basta navegar até a pasta da API e executar os comandos:
```
composer install
php artisan migrate
php artisan passport:install
php artisan serve
```
#### Clone e execute o App

Realize o `git clone` do app, em seguida navegue até a pasta do app e, no arquivo src/index.html, substitua o texto 'localhost:8000' na variável APP_WS pelo endereço e porta do servidor que está executando a API, ou deixe como está, caso vá rodar no localhost:8000.

Em seguida, execute os comandos:
```
$ npm install
$ ionic serve
```
O comando `ionic serve` vai executar a aplicação em um navegador.

#### FIM

Agora você pode se cadastrar como quiser e realizar login utilizando o e-mail e a senha que cadastrou. Não esqueça de utilizar uma ferramenta para driblar o CORS.

## LARAVEL
php artisan -V

    Laravel Framework 5.5.32
laravel -v

    Laravel Installer 1.5.0


## IONIC INFO

cli packages: (/home/jp/.npm-global/lib/node_modules)

    @ionic/cli-utils  : 1.19.1
    ionic (Ionic CLI) : 3.19.1

global packages:

    cordova (Cordova CLI) : 8.0.0

local packages:

    @ionic/app-scripts : 3.1.8
    Cordova Platforms  : android 7.0.0
    Ionic Framework    : ionic-angular 3.9.2

System:

    Android SDK Tools : 25.2.5
    Node              : v9.3.0
    npm               : 5.5.1
    OS                : Linux 4.9

Environment Variables:

    ANDROID_HOME : /home/linuxbrew/.linuxbrew/Cellar/android-sdk/24.4.1_1

Misc:

    backend : pro
