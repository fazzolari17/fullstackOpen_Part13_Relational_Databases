FROM postgres

COPY /postgres-data/exercise13-init.sql /docker-entrypoint-initdb.d/
