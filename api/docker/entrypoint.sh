#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
max_tries=30
try=0
until php artisan db:show --no-ansi > /dev/null 2>&1 || [ $try -ge $max_tries ]; do
    try=$((try + 1))
    sleep 1
done

if [ $try -ge $max_tries ]; then
    echo "MySQL did not become ready in time. Continuing anyway..."
fi

# Run migrations with seed
echo "Running migrations and seeders..."
php artisan migrate --seed --force

# Start php-fpm
echo "Starting PHP-FPM..."
exec php-fpm
