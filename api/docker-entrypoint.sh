#!/bin/sh
set -e

# Determine environment (default: local/dev)
ENV=${APP_ENV:-local}

# Create .env from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

# Install Composer dependencies if vendor is missing (e.g. fresh clone)
if [ ! -d vendor ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist
fi

# Generate app key if APP_KEY is not set in .env
if ! grep -q "^APP_KEY=" .env || [ -z "$(grep "^APP_KEY=" .env | cut -d= -f2-)" ]; then
    echo "Generating application key..."
    php artisan key:generate
fi

# Run migrations with seed
echo "Running migrations and seeders..."
php artisan migrate --seed --force

# Clear caches
echo "Clearing caches..."
php artisan optimize:clear

if [ "$ENV" = "prod" ]; then
    echo "Optimizing for production..."
    php artisan optimize
fi

# Start php-fpm
echo "Starting PHP-FPM..."
exec php-fpm
