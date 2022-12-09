from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.management import call_command

logger = get_task_logger(__name__)


@shared_task
def update_portfolio_assets():
    call_command("update_portfolio_assets", )


@shared_task
def update_categories():
    call_command("update_categories", )

@shared_task
def update_global_metrics():
    call_command("update_global_metrics", )