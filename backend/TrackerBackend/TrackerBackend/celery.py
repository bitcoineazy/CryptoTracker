import os

from celery import Celery
from celery.schedules import crontab
import TrackerBackend.tasks


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TrackerBackend.settings')

app = Celery('TrackerBackend')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "update_top_250_assets": {
        "task": 'TrackerBackend.tasks.update_top_250_assets',
        "schedule": 60.0,
    },
    'update_assets_in_portfolio': {
        'task': 'TrackerBackend.tasks.update_portfolio_assets',
        "schedule": 300.0,
    },
    "update_portfolio_statistics": {
        "task": "TrackerBackend.tasks.update_portfolio_statistics",
        "schedule": 15.0,
    },
    "update_portfolio_historical_graph": {
        "task": "TrackerBackend.tasks.update_portfolio_historical_graph",
        "schedule": 30.0,
    },
    "update_categories": {
        "task": "TrackerBackend.tasks.update_categories",
        "schedule": 300.0,
    },
    "update_global_metrics": {
        "task": "TrackerBackend.tasks.update_global_metrics",
        "schedule": 300.0,
    }
}

app.conf.timezone = 'UTC'
