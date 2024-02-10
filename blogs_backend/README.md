# GETTING STARTED

**Run the following command to display a list of commonly used commands available.**
``` bash
./blogsBackend -help
```


# DEVELOPMENT ENVIRONMENT 

**To start development you must run the following command in the root directory.**
If the following is not run then nodemon will not auto restart and the development environment will not work correctly and you will have to restart the container to update any changes made.
``` bash 
npm install
```

**You can then build the docker development container.**
``` bash
./blogsBackend up:dev
```

**To restart the container without rebuilding it you can run the command.**
``` bash
./blogsBackend restart:dev 
```

**To remove the container you can run the command.**
``` bash
./blogsBackend down:dev
```



# Exercises
**Once the application is running, exercise 13.3 can fulfilled by running.**

``` bash
node cli.js
```

**If you want to complete exercise 13.3 without building the whole container you can run the following command to only build the db for the exercise.**

``` bash 
./blogsBackend exercise13.3-db:run
```

**After starting the container you then run the following command to complete the exercise.**

``` bash 
node cli.js
```

**After completing the exercise you can stop the container and remove the container and images with the folowing command.**

``` bash 
./blogsBackend exercise13.3-db:down
```





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