# Tarefador

Tarefador é uma aplicação web para gerenciamento de tarefas colaborativas. Usuários podem criar, editar, atribuir participantes e acompanhar o progresso de tarefas em tempo real, com autenticação e controle de permissões.

## Arquitetura

O projeto é dividido em duas partes independentes:

- **Backend API** (Laravel) - na raiz do repositório
- **Frontend SPA** (Vue 3 + PrimeVue) - no diretório `spa/`

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Atribuição de participantes às tarefas
- Controle de permissões (admin, proprietário, participante)
- Interface moderna com PrimeVue e TailwindCSS
- Log de ações utilizando MongoDB

## Requisitos

- PHP >= 8.1 | Laravel >= 10.x
- Composer
- Node.js e npm
- MySQL ou MariaDB
- MongoDB

## Instalação (Backend)

```sh
git clone https://github.com/TacioDaito/tarefador.git
cd tarefador
composer install
cp .env.example .env
php artisan key:generate
```

Configure o banco de dados no arquivo `.env`:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

MONGODB_URI="mongodb://localhost:27017"
MONGODB_DATABASE="laravel"

```

Execute as migrações e seeders:

```sh
php artisan migrate --seed
```

Inicie o servidor da API:

```sh
php artisan serve
```

A API estara disponivel em http://localhost:8000.

## Instalação (Frontend)

```sh
cd spa
npm install
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

O frontend estara disponivel em http://tarefador.localhost:3000.

Para build de producao:

```sh
npm run build
```

## Uso

Acesse [http://tarefador.localhost:3000](http://tarefador.localhost:3000) para utilizar a aplicacao.
O backend deve estar rodando em [http://tarefador.localhost/api](http://tarefador.localhost/api) simultaneamente.

---

## Design

As escolhas de ferramentas em sua grande maioria foram feitas para atender os requisitos especificados, com excecao de alguns pacotes JavaScript:

- **PrimeVue**: Biblioteca de componentes Vue com vasta gama de componentes proprios para o desenvolvimento rapido de novas aplicacoes. A intencao foi agilizar o desenvolvimento sem comprometer a responsividade da aplicacao a experiencia do usuario.

- **Vue-router**: Usado para agilizar o controle do fluxo entre views.

- **Laravel Sanctum SPA Auth**: Autenticacao com cookies atraves da rota `sanctum/csrf-cookie`. O frontend desacoplado se comunica com a API via CORS, com credenciais habilitadas.

---

## Problemas Conhecidos

- Ao trocar de conta (logout + login com credenciais diferentes), a autenticacao pode falhar no backend, exibindo apenas o estado autenticado no frontend sem carregar as tarefas. O erro desaparece ao recarregar a pagina.

---

## Documentacao da API

A documentacao da API e gerada atraves do pacote Scribe. Acesse [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) com o servidor rodando.

Mais informacoes: [https://scribe.knuckles.wtf/laravel/](https://scribe.knuckles.wtf/laravel/)

---

Para mais detalhes, consulte a documentacao dos frameworks utilizados:
- [Laravel](https://laravel.com/docs/10.x)
- [Vue.js](https://vuejs.org/)
- [PrimeVue](https://primevue.org/introduction/)
- [TailwindCSS](https://tailwindcss.com/)
