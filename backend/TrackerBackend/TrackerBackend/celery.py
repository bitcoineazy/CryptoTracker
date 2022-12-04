import os

from celery import Celery
from celery.schedules import crontab
import TrackerBackend.tasks



# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TrackerBackend.settings')

app = Celery('TrackerBackend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'add-every-30-seconds': {
        'task': 'TrackerBackend.tasks.update_portfolio_assets',
        "schedule": 5.0,
    },
    "update_categories": {
        "task": "TrackerBackend.tasks.update_categories",
        "schedule": 5.0,
    }
}
app.conf.timezone = 'UTC'

# CELERY_BEAT_SCHEDULE = {
#     "sample_task": {
#         "task": "TrackerBackend.tasks.sample_task",
#         "schedule": crontab(minute="*/1"),
#     },
#     "send_my_custom_command": {
#         "task": "TrackerBackend.tasks.send_my_custom_command",
#         "schedule": crontab(hour="*/1"),
#     },
# }
# @app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#     # Calls test('hello') every 10 seconds.
#     sender.add_periodic_task(10.0, test.s('hello'), name='add every 10')
#
#     # Calls test('world') every 30 seconds
#     sender.add_periodic_task(30.0, test.s('world'), expires=10)
#
#     # Executes every Monday morning at 7:30 a.m.
#     sender.add_periodic_task(
#         crontab(hour=7, minute=30, day_of_week=1),
#         test.s('Happy Mondays!'),
#     )
#
# @app.task
# def test(arg):
#     print(arg)
#
#
# @app.task
# def add(x, y):
#     z = x + y
#     print(z)
