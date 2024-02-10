FROM postgres

COPY /postgres-data/*.sql /docker-entrypoint-initdb.d/
