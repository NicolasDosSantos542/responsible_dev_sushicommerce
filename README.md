# responsible_dev_sushicommerce

#----------------------------------------------------------------------------#
#---------------------------- LAUNCH INSTRUCTION ----------------------------#
#----------------------------------------------------------------------------#

# GO TO FRONT APP
```bash
  cd  sushi-commerce-front
```

# LAUNCH BUILD
```bash
    npm run build
```

# COME BACK TO responsible_dev_sushicommerce or open new terminal from it
```bash
    cd ..
```

# RUN DOCKER COMPOSE
```bash
  docker-compose up
```

# GO TO CONTAINER responsible_dev_sushicommerce-sushi-api-1 in shell (terminal) to have cli command and run
```bash
    node fakers/product.faker.js
```

# WAIT END AND GO TO
```bash
    https://localhost
```

#----------------------------------------------------------------------------#
#---------------------------- DESTROY INSTRUCTION ---------------------------#
#----------------------------------------------------------------------------#


#
```bash
    docker-compose down -v
```

#
```bash
    docker image ls
```

# DESTROY ONE IMAGE FOR TAKE CHANGE WHERE 3eb5371bb4f1 is THE ID OF THE IMAGE 
# EXAMPLE responsible_dev_sushicommerce_sushi-front
```bash
    docker image rm 3eb5371bb4f1
```
#-----------------------------------------------------------------------------------------------#
    #!!!!!!!!!!!!!!!! ONLY IF YOU WANT TO DESTROY ALL IMAGES !!!!!!!!!!!!!!!
    #!!!!!!!!!!!!!!!! ATTENTION TO THE LIMIT OF DL BY DAY IN DOCKER DON'T DO IT ALL THE TIME !!!!!
```bash
    docker-compose down --rmi all
```
#-----------------------------------------------------------------------------------------------#
# YOU CAN DO LAUNCH INSTRUCTION AGAIN IF YOU WANT TO RESTART
