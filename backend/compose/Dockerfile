FROM python:latest

ENV PYTHONUNBUFFERED 1

RUN echo hello

# Requirements have to be pulled and installed here, otherwise caching won't work
COPY ./requirements /requirements
RUN pip install --upgrade pip
RUN pip install -r /requirements/local.txt

COPY ./compose/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./compose/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
