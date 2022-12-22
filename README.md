# <br><b>[«CryptoTracker»](http://143.244.205.59/api/)</b> - трекер криптопортфеля

![cryptotracker_workflow](https://github.com/bitcoineazy/CryptoTracker/actions/workflows/cryptotracker_workflow.yml/badge.svg)
![Project website](https://img.shields.io/website-up-down-green-red/http/143.244.205.59.svg)

## Описание

- Проект <b>CryptoTracker</b> это удобный инструмент учета для хранения всех своих крипто-инвестиций в одном месте, пользователи могут проанализировать стоимость инвестиций, доходы и статистику по ним в виде графиков и диаграмм.

[![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)](https://www.django-rest-framework.org/)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/celery-%2337814A.svg?&style=for-the-badge&logo=celery&logoColor=white" />
[![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/ru/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![GitHub_Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Установка и запуск
Проект разбит на 6 docker-контейнеров:
- backend — бэкенд проекта
- frontend — фронтенд проекта
- celery — асинхронные периодические задачи для бэкенда
- celery-beat — планировщик задач для celery
- postgres — образ базы данных PostgreSQL
- nginx — web-сервер nginx

1. Склонировать репозиторий: ```git clone https://github.com/bitcoineazy/CryptoTracker.git```
2. Установить: [docker](https://www.docker.com/get-started), [docker-compose](https://docs.docker.com/compose/install/):
```sudo apt install docker && sudo apt install docker-compose```
3. Создать .env файл в директории <b>infrastructure</b> со значениями: 
```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```
4. Перейти в директорию <b>infrastructure</b> cобрать проект и запустить: ```sudo docker-compose up --build -d``` 
5. Собрать базу данных на основе ресурсов: ```sudo docker-compose exec backend python manage.py makemigrations && sudo docker-compose exec backend python manage.py migrate```
6. Загрузить готовую бд: ```sudo docker-compose exec backend python3 manage.py loaddata assets_admin_db.json```
7. Создать профиль администратора: ```sudo docker-compose exec backend python manage.py createsuperuser```
8. Собрать статику: ```sudo docker-compose exec backend python manage.py collectstatic``` 

Для сборки и использования своего контейнера backend:
1. В директории backend/TrackerBackend - ```sudo docker build -t username/container .```
2. Запушить образ на свой dockerhub - ```sudo docker push username/container```
3. Модифицировать поле backend image в infrastructure/docker-compose.yml на свой контейнер

Для загрузки данных и редактирования файлов контейнера
1. ```sudo docker exec -u 0 -it {id_контейнера из docker ps} /bin/sh```

## Доступ к сервису (локальный)

- Описание API-эндоинтов: [127.0.0.1:80/api/](http://127.0.0.1:80/api/)
- Django админка [127.0.0.1:80/admin/](http://127.0.0.1:80/admin/)
- Flower админка для Celery [127.0.0.1:5566/](http://127.0.0.1:5566/)

## Документация и документы
