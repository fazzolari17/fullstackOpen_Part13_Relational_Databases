Exercise 13.3 is done by building the docker container for the database with the command 

  - ./blogsBackend exrcise13.3-db:run

and oncde the container is built and runnning you will run 

  - node cli.js

now the exercise will be satisfied.
Once complete you can remove the container with one last command.

  - ./blogsBackend exrcise13.3-db:down

This will not work if the main docker container has been built and is running this is only to satisfy the exercise without building the main application. If the main application is running the you will only need to run 

  - node cli.js

--------------------------------
----- TO RUN THE MAIN FILE -----
--------------------------------

You will need docker compose and run from the root of the directory 

  - ./blogsBackend up:dev   // for a dev environment 
  - ./blogsBackend up       // for a production environment 

from a browser you can access the program from localhost:3005/api/health to check that the program is running.