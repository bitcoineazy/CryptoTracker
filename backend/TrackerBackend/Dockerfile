FROM python:3.9
WORKDIR /code
COPY requirements.txt /code
RUN pip3 install -r requirements.txt
COPY . /code
CMD gunicorn TrackerBackend.wsgi:application --bind 0.0.0.0:8000