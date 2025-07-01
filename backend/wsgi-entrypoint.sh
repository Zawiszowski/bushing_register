#!/bin/sh

until cd /bushing_register/backend
do
    echo "Waiting for server volume..."
    sleep 2
done

until python3 manage.py makemigrations
do
    echo "Waiting for db to be ready..."
    sleep 2
done

until python3 manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --timeout 90