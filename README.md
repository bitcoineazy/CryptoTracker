# <br><b>[«CryptoTracker»](http://143.244.205.59/api/)</b> - трекер криптопортфеля

![cryptotracker_workflow](https://github.com/bitcoineazy/CryptoTracker/actions/workflows/cryptotracker_workflow.yml/badge.svg)
![Project website](https://img.shields.io/website-up-down-green-red/http/143.244.205.59.svg)

## Описание

- Проект <b>CryptoTracker</b> это удобный инструмент учета для хранения всех своих крипто-инвестиций в одном месте, пользователи могут проанализировать стоимость инвестиций, доходы и статистику по ним в виде графиков и диаграмм.

[![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=flat&logo=Django&logoColor=white&color=ff1709&labelColor=gray)](https://www.django-rest-framework.org/)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=React&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/Celery-%2337814A.svg?&style=flat&logo=Celery&logoColor=white" />
[![Nginx](https://img.shields.io/badge/Nginx-%23009639.svg?style=flat&logo=Nginx&logoColor=white)](https://nginx.org/ru/)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=flat&logo=Postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?style=flat&logo=Redis&logoColor=white)](https://redis.io/)
[![GitHub_Actions](https://img.shields.io/badge/GithubActions-%232671E5.svg?style=flat&logo=GithubActions&logoColor=white)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=flat&logo=Docker&logoColor=white)](https://www.docker.com/)

## Установка и запуск
Проект разбит на 7 docker-контейнеров:
- backend — бэкенд проекта
- frontend — фронтенд проекта
- celery — асинхронные периодические задачи для бэкенда
- celery-beat — планировщик задач для celer
- flower — админка для Celery
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
1. [Основная информация о проекте](https://docs.google.com/document/d/1uAo9AEyFQp9OS7pW8nWsjONwGxFhm0iNyN3ExQD0aMM)
2. [ТЗ (техническое задание к проекту)](https://docs.google.com/document/d/1brzGZPXWFxUncZA1nxC8m6WuJMndXy1ayGbnxd3g04U)
3. [Описание автоматизируемых функций](https://docs.google.com/document/d/1INT0S4TTg03zlc-QvNWq9smn-57PG0JOOYwngxOvhDE)
4. [Схема функциональной структуры автоматизируемой деятельности](https://docs.google.com/document/d/1q91wO5nlNoPGV8APYzggHGtBieRXXFbkYSavtPk5bd8)
5. [Описание программного обеспечения АС](https://docs.google.com/document/d/1N8bd2g0r8BV_nUNI_Cj2Y5bufMBc_LXSQsph7715P6s)
6. [Схема логической структуры БД](https://docs.google.com/document/d/1CuoIZcxkWvNPrK6kCHm5Z5p2tN7JPYcuRwC8NVAnoa8)
7. [Концепция ИС](https://docs.google.com/document/d/1e2T2Jslet7b_nb3WPSleWURQqHSkHrr4sR41SYgX9lk)
