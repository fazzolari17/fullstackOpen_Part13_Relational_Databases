Exercise 13.3 is done by building the docker conrtainer for the database with the command 

  - ./blogsBackend exrcise13.3-db:run

and oncde the container is built and runnning you will run 

  - node main.js

now the exercise will be satisfied.
Once complete you can remove the container with one last command.

  - ./blogsBackend exrcise13.3-db:down

--------------------------------
----- TO RUN THE MAIN FILE -----
--------------------------------

You will need docker compose and run from the root of the directory 

  - ./blogsBackend up:dev   // for a dev environment 
  - ./blogsBackend up       // for a production environment 

from a browser you can access the program from localhost:3005/api/health to check that the program is running.