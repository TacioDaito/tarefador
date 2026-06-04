# Tarefador

> Nuxt 4 SPA with Laravel 13 API for collaborative task management. Users can create an account, authenticate, create tasks, or join existing tasks, organizing workflow for small businesses.

---

### Tech Stack

| Category | Tools and Frameworks |
| :--- | :--- |
| **Frontend** | Nuxt 4 (Vue 3), PrimeVue 4, TailwindCSS v4, PrimeIcons |
| **Backend** | Laravel 13 (PHP 8.4+), Laravel Sanctum (SPA auth via cookies), PHP-FPM |
| **Database** | MySQL 8.0 (primary), MongoDB 7 (action logs), Redis (cache and sessions) |
| **Infrastructure** | Docker, Docker Compose, Nginx (reverse proxy), Makefile for orchestration |

---

### Folder Structure

```text
tarefador/
├── api/                  # Laravel 13 backend API
│   ├── app/
│   │   ├── Http/Controllers/   # Auth, Task, User controllers
│   │   ├── Models/             # Task, User, ActionLog models
│   │   ├── Services/           # TaskService, LogService
│   │   └── Policies/           # TaskPolicy
│   ├── config/                 # Database, Sanctum, Scribe config
│   ├── database/
│   │   ├── migrations/         # Users, tasks, personal access tokens
│   │   └── seeders/            # DatabaseSeeder, TaskSeeder
│   ├── routes/
│   │   └── api.php             # API route definitions
│   └── tests/                  # PHPUnit feature and unit tests
├── spa/                  # Nuxt 4 frontend SPA
│   ├── app/
│   │   ├── components/         # NavBar, TaskPanel
│   │   ├── composables/        # useAuthState, useTaskAction, etc.
│   │   ├── pages/              # index, login, signup, dashboard, tasks
│   │   └── assets/css/         # Main CSS with Tailwind
│   └── nuxt.config.js          # Nuxt configuration
├── docker-compose.yml          # Base Docker Compose
├── docker-compose.dev.yml      # Dev overrides
├── docker-compose.prod.yml     # Production overrides
├── nginx.conf                  # Reverse proxy configuration
├── Makefile                    # Orchestration commands
└── .env.example                # Environment variable template
```

---

### Prerequisites

The following dependencies are required to build and run the project:

* **Runtime Environment:** PHP 8.4+ (via Docker), Node.js (via Docker)
* **Package Management:** Composer (via Docker), npm (via Docker)
* **Virtualization:** Docker and Docker Compose

---

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TacioDaito/tarefador.git
   cd tarefador
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   Choose MySQL's password and rootpassword.

3. **Initialize Containers:**
   ```bash
   make build-up        # Development
   make build-up env=prod  # Production
   ```

4. **Access the App:**
    You can access the app in the [http://tarefador.localhost](http://tarefador.localhost) URL.

5. **Stopping Containers:**
   ```bash
   make down    # Stop containers
   make down-volumes    # Remove volumes
   ```


---

### Testing

Ensure the integrity of the codebase by running the automated test suite:

```bash
# Execute all API tests
docker compose exec api php artisan test

# Generate coverage report
docker compose exec api php artisan test --coverage
```

---

### Design Decisions

- **PrimeVue**: Component library for rapid UI development with Vue, providing a wide range of pre-built components without compromising responsiveness or user experience.
- **Laravel Sanctum SPA Auth**: Cookie-based authentication via `sanctum/csrf-cookie` endpoint. The decoupled SPA communicates with the API through CORS with credentials enabled.
- **MongoDB for Action Logs**: Task action history is stored in MongoDB, keeping the MySQL primary database lean while enabling flexible querying of audit trails.
- **Docker Compose Orchestration**: All services (Nginx, SPA, API, MySQL, MongoDB, Redis) are containerized and orchestrated with Docker Compose for consistent development and production environments.

---

### Known Issues

- When switching accounts (logout + login with different credentials), authentication may fail on the backend, showing an authenticated state on the frontend without loading tasks. Reloading the page resolves the issue.

---

### API Documentation

API documentation is auto-generated via Scribe. Access it at [http://tarefador.localhost/api/docs](http://tarefador.localhost/api/docs) with the server running.

More information: [https://scribe.knuckles.wtf/laravel/](https://scribe.knuckles.wtf/laravel/)