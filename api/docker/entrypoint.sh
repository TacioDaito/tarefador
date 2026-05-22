#!/bin/sh
set -e

# Determine environment (default: local/dev)
ENV=${APP_ENV:-local}

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
