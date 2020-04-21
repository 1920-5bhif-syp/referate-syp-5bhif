# Referat Docker

# What is Docker - what is a container?

- Containers are just processes
- They are limited to what resources they can access
- Containers exit when the process stops

**Benefits:**

- Storage efficient
- fast
- lightweight

![Referat%20Docker/Screenshot_2019-12-11_at_22.53.23.png](Referat%20Docker/Screenshot_2019-12-11_at_22.53.23.png)

# Terminal

- $ docker
    - returns list of commands
    - old: all commands were shown
    - new: grouped commands
    - docker container run == docker run
        - for backwards compatibility
    - docker container ls == docker ps
- **$docker version** and **$ docker info** to check if docker works

# Image vs Container

- An Image is the application we want to run
- A container is an instance of that image, running as a process
- Images can be sourced from registries, the default registry is called **Docker Hub**

# Containers

$ docker container run —publish 8080:80 nginx

Now it runs nginx, we can see the logs of it in the console

1. Downloaded nginx from the Docker Hub
2. Started a container from the image
3. Opened port 8080 on the localhost
4. routed traffic to the container

## Shell inside containers

docker container run -it

docker container exec -it *bash*

# Networks

commands:

- $ docker network ls
- $ docker network inspect
- $ docker network create
- $ docker network connect
- $ docker network disconnect
- $ docker container run ... —network ..

## DNS

How to let containers in a network talk to each other?

Letting them talk via IP Address is actually an **anti Pattern**

- Docker networks have a built in DNS
- % docker container exec -it my_nginx ping new_nginx
- They can talk to each other via their container names

On the default network, **bridge** oder **docker0,** the DNS is disabled. To let containers talk to each other, you must tell them explicitly, by linking them.

% docker container run ... —link [other_containers]

# Images

- App binaries and dependencies
- Metadata about the image data and how to run the image
- Not a complete OS - so no kernel, kernel modules, etc
    - Host provides the kernel
- Can be a very small file

## Docker Hub

- https://hub.docker.com
- Versions of images actually have tags

    ![Referat%20Docker/Screenshot_2019-12-08_at_19.07.59.png](Referat%20Docker/Screenshot_2019-12-08_at_19.07.59.png)

    - Every bullet is 1 version, that can be referred to by any of the tags
    - docker pull nginx:mainline == docker pull nginx:latest
- Official images are the only ones that are referred to just by their name, without the username in the "path", *nginx* vs *jwilder/nginx-proxy*
- Under explore, you can see all the official images
    - [https://hub.docker.com/search?q=&type=image&image_filter=official](https://hub.docker.com/search?q=&type=image&image_filter=official)
    - [https://github.com/docker-library/official-images/tree/master/library](https://github.com/docker-library/official-images/tree/master/library)

## Image Layers

Images work in layers, so images build on images. → layered

some images use common base images, the benefit of docker is, that it stores the image only once, even if an image is used multiple times, even if there's multiple containers of the same image.

When however one container *changes* the source files of the image, then docker copies it into the container and uses the file of the container. This concept is called **copy on write.**

% docker history image

this command shows all the layers of an image, so all the "images" an image is made of, and also shows when they were first stored / last modified on the system

Images are made up of file system changes and metadata about them.

Images are referred to by:

- Repository (username/repository if unofficial)
- Tag (a pointer to a specific image commit, a mix of branch and version)
- ID

When pulling the same image under two different tags, in **% docker image ls** they will show up twice, but with the same image id

## Dockerfiles

Dockerfiles are files, that describe how images are being built.

Building images from dockerfiles can be done with the command:
docker image build -f some-dockerfile
-f is to specify a file that is not named "Dockerfile"

### Commands

**FROM**

- which image to build onto
- is required in every file

One of the main reasons to use some small linux based operating system as a base image, is because of their built in package managers.

**ENV**

- Setting environment variables of an image
- Why environment variables?
    - Because they work on every OS and in every config
- All subsequent lines are able to use the variable

**RUN**

- Executing shell commands
- Usually, the commands that are RUN, are concatenated using \ and &&
- Why concatenate with &&?
- Because every command is it's own layer in the dockerfile
    - saves time and space
- Proper way to log: do not log into a log-file in the container
    - Docker handles logging for us, as long as logs are in stdout and stderr

**EXPOSE**

- expose ports to the docker virtual network
- -p is still necessary!

**WORKDIR**

- the cd command in a dockerfile, changes the directory
- is like RUN cd ....
- WORKDIR is the best practice, as it makes it obvious what is happening

**COPY**

- copy files from the local machine into the docker image

**CMD**

- required
- Final command that will be run, every time a new container from an image is started, or a stopped container is restarted

### Running Docker Builds

% docker image build -t customnginx .

-t [tag] is for the name / a tag of an image

- Each step is a line of the file
- Steps have unique hashes, that docker caches, so the next time we run a build and the line and its above ones haven't changed, it doesn't need to build that step again
    - This is what makes docker special! Because this makes it fast!

*Example:* When changing the last line of an example file, see how fast the build is! It says: *using cache* for all the above steps!

TIP! Put the things that change the least,  on top of the Dockerfile, and the things that change the most at the bottom!

# Container lifetime and Persistence

Key concepts:

- immutable
- ephemeral

Containers usually are ***unchanging*** and ***temporary, disposable***

***"immutable infrastructure"*** - only re-deploy containers, and never change the containers... is an ideal scenario

Ideally, the subject of concerns should be separated in containers!

- Containers shouldn't contain unique data mixed in with the application binaries
- Separation of concerns
- The benefit of this, is that we can upgrade our app (therefore recycle our container), and our unique data is still where it needs to be

Unique Data = Persistent Data

How docker solves it:

- Data / Docker Volumes
- Bind Mounts

## Data Volumes

Dockerfile command! **VOLUME**

VOLUME /path/to/directory/in/container

- This directory can now be accessed from inside the container, like it were in the container
- Data in this directory is not stored in the container tho

Volumes outlive containers, so when a container is destroyed, the volume still lives

Command to view all volumes: % docker volume ls

Inspect a volume: % docker volume inspect [volumename]

### Named Volumes

Volumes are named with not-user-friendly hashes by docker

% docker container run ...... -v name_of_volume:/path/to/directory

## Bind Mounts

Maps a host file or directory to a container file or directory

Bind mounts can't be specified in the Dockerfile, they must be in *container run*

% ... run -v /Users/leon/stuff:/path/in/container

They have to be full paths!

Tip! use: ... run -v $(pwd)/...:/...
to get to the directory where the shell is atm

Bind mounts are mostly useful in development

Example: running nginx, using bash, seeing what's in mounted folder

# Docker Compose

It's a combination of a command line tool and a configuration file

- Configure relationships between containers
- Save our *% docker container run ...* settings in an easy-to-read file
- Start whole development environments with just one command
- Contains of 2 parts
    - The YAML-file
        - containers
        - volumes
        - networks
        - ...
    - CLI tool docker-compose used for local dev/test automation with the yaml file

## docker-compose.yml

- YAML files can be used with the docker-compose command for local docker automation
- In docker swarm you can directly integrate YAML files in the production environment
- Kind of replaces shell scripts that automate docker run commands
- There are different versions. The version of YAML is specified at the top of the file, like: *version '3.1'*
    - 3.1 is the recommended version
    - other options are 1 and 2

## Compose commands - CLI

- On linux it has to be downloaded separately
- not a production grade tool
- ideal for local development
- Commands
    - % docker-compose up
    - % docker-compose down
        - will clean up after you, remove containers, etc
- Creates network on it's own!

### Using Compose to Build

- Build images at runtime
- *docker-compose build* will force rebuild
- *docker-compose up* will only build when nothing is found in cache
- *docker-compose up —build* will also rebuild, always