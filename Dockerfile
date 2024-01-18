FROM postgres

ENV POSTGRES_PASSWORD=tubecity31

RUN echo "CREATE DATABASE skyscan;" > /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432

CMD ["postgres"]