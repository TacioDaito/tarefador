# Tarefador

Tarefador é uma aplicação web desenvolvida em Laravel e Vue.js para gerenciamento de tarefas colaborativas. Usuários podem criar, editar, atribuir participantes e acompanhar o progresso de tarefas em tempo real, com autenticação e controle de permissões.

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Atribuição de participantes às tarefas
- Controle de permissões (admin, proprietário, participante)
- Interface moderna com PrimeVue e TailwindCSS
- Log de ações utilizando MongoDB

## Requisitos

- PHP >= 8.1 | Laravel >= 10.x | Vue >= 3.x
- Axios >= 1.x | Vite >= 6.x | Tailwind CSS >= 4.x
- PrimeVue >= 4.x | PrimeUIX >= 1.x | PrimeIcons
- Vue-router | Composer | Node.js e npm
- MySQL ou MariaDB (com XAMPP opcionalmente)
- MongoDB

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/TacioDaito/tarefador.git
   cd tarefador
   ```

2. **Instale as dependências do backend:**
   ```sh
   composer install
   ```

3. **Instale as dependências do frontend:**
   ```sh
   npm install
   ```

4. **Configure o arquivo `.env`:**
   - Copie o arquivo `.env.example` para `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edite as variáveis de ambiente conforme seu ambiente (banco de dados, MongoDB, etc).

5. **Gere a chave da aplicação:**
   ```sh
   php artisan key:generate
   ```

6. **Instale e configure os bancos de dados:**
    - MySQL:
        - [Recomendado] Baixe e instale o XAMPP com a opção MySQL.
    - MongoDB:
        - Baixe e instale o MongoDB Compass Community Server.
        - Crie uma conexão, um banco de dados com o nome `laravel` e uma coleção com o nome `action_logs`.
        - Baixe a extensão PHP para MongoDB correta neste endereço: [https://github.com/mongodb/mongo-php-driver/releases/](https://github.com/mongodb/mongo-php-driver/releases/).
        - Mova a extensão para a pasta `\ext` do PHP.
        - Abra o `php.ini` dentro da pasta do PHP e insira o nome da extensão na secção `Dynamic Extensions`.
        - Caso deseje, alterar os endereços e configurações de acordo com o seguinte guia: [https://laravel.com/docs/11.x/mongodb](https://laravel.com/docs/11.x/mongodb)

7. **Inicie os bancos de dados:**
    - Caso esteja utilizando o MySQL do XAMPP (recomendado localmente), inicie o XAMPP e o seu modulo MySQL.
    - Inicie o MongoDB Compass e a sua conexão.

8. **Execute as migrações do banco de dados relacional e rode o seeder:**
   ```sh
   php artisan migrate --seed
   ```
   - Todos os usuários criados pelo seeder tem senha `password`.

9. **Compile os assets do frontend:**
   ```sh
   npm run build
   ```
   Ou para desenvolvimento:
   ```sh
   npm run dev
   ```

10. **Inicie o servidor de desenvolvimento Laravel:**
   ```sh
   php artisan serve
   ```

## Uso

Acesse [http://localhost:8000](http://localhost:8000) para utilizar a aplicação.

---

## Design

As escolhas de ferramentas em sua grande maioria foram feitas para atender os requisitos especificados, com exceção de alguns pacotes JavaScript:

- PrimeVue:
Essa biblioteca de componentes Vue possui uma vasta gama de componentes próprios para o desenvolvimento rápido de novas aplicações, e por isso foi escolhida. A intenção foi agilizar o desenvolvimento sem comprometer a responsividade da aplicação à experiência do usuário. Apesar de ser bem útil, ainda não se tem uma comunidade grande utilizando essa biblioteca, o que acabou gerando alguns contratempos.

- Vue-router:
Foi usado para agilizar o controle do fluxo entre views e deixá-lo mais claro. O seu uso é bem direto e objetivo.

- Armazens de estado:
Não foram utilizados pacotes como o pinia para armazenamento, pois o escopo do projeto não foi grande o suficiente para justificar o seu uso. Foi utilizado um simples arquivo de estado de cliente apenas para controlar certas lógicas entre views.

- Laravel Sanctum SPA Auth:
Para a autenticação no back-end, foi escolhido o Laravel Sanctum. Conforme a sugestão da documentação, também foi escolhida a autenticação com cookies através da rota `sanctum/csrf-cookie`. A documentação do Laravel sugere isso para aplicações SPA utilizadas em um domínio específico.

---

## Problemas

Além dos contratempos mencionados com o PrimeVue, também ocorreram alguns problemas no desenvolvimento do frond-end relacionados a compartilhamento de estados e props. Na intenção de tornar o código mais limpo ao separar a lógica dos componentes de sua estrutura, foi necessário utilizar algumas soluções para fazer com que essa lógica se comunicasse com outros componentes. Em alguns casos, foram utilizados props e emitters para isso, em outros, foram estados. Isso acabou adicionando uma certa complexidade suportável, mas indesejável ao front-end.

Além disso, foi introduzido um erro onde, ao entrar em uma conta, sair e depois entrar em outra diferente, a autenticação não é feita com sucesso no back-end, mas sim no front-end. Isso faz com que as tarefas não sejam exibidas para o usuário, pois as chamadas do front-end retornam erro de autenticação. Isso provavelmente está relacionado à autenticação baseada em cookies do Laravel Sanctum. O erro desaparece ao realizar o recarregamento completo da página.

---

## Prévia

![Imagem Prévia](/preview.jpg)

---

Para mais detalhes, consulte a documentação dos frameworks utilizados:  
- [Laravel](https://laravel.com/docs/10.x)  
- [Vue.js](https://vuejs.org/)  
- [PrimeVue](https://primevue.org/introduction/)  
- [TailwindCSS](https://tailwindcss.com/)
