FROM python:3.5

ENV PYTHONUNBUFFERED 1


COPY ./requirements /requirements
RUN pip install -r /requirements/local.txt


COPY ./compose/start.sh /start.sh
RUN sed -i 's/\r//' /start.sh
RUN chmod +x /start.sh


WORKDIR ./app


EXPOSE 8000
