# Lovely Stay CLI

This is a project for a back-end position at [Lovely Stay](https://www.lovelystay.com/pt), which have some rules inteded to be followed and used as guidelines.

There is a [Miro board](https://miro.com/app/board/uXjVK9L85mQ=/?share_link_id=645726484115) created for this project and where you can follow the main rules and main idea behind the whole project.

Guidelines for tools used in this project

- [Husky](https://typicode.github.io/husky/how-to.html)
- [Typescript-eslint](https://typescript-eslint.io/rules/)
- [Vitest](https://vitest.dev/guide/)

#### Note

This project has a VSCode workspace file (`lovelystaycli.code-workspace`), where it has several configurations and extensions already configured exactly for this project. If you feel comfortable, prefer to use this workspace rather than just opening the folder.

### Quick disclaimer

Since this is only a CLI for a test for a job position, I didn't took care of how many request would run in a small time window so, this is the reason for not using `octokit` package (and also because [Github only allows 60 unauthenticated requests per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-unauthenticated-users)). Since this would run only a few times and not for real production, I don't need to take care about how many requests will have in a small time window. But, knowing the fact this is for a job position, I need to take care about other things that are already handled in the project as it follows.

Besides this readme file here, you use the docs. Navigate to `src/docs` folder, and open the `index.html` file there. You will see more information for each function and its usage / params.

---

# Rules

Your goal is to develop a command-line application using NodeJS + TypeScript + PostgreSQL, whose goals are:

- [x] 1. Fetch information about a given GitHub user (passed as a command-line argument) using the [GitHub API](https://docs.github.com/en/rest), and store it on one or more database tables - the mandatory fields are:

  - [x] Name
  - [x] Location
  - [x] bonus points for additional fields;

- [x] 2. Using a different command-line option, it:

  - [x] should be possible to
    - [x] fetch and display all users already on the database (showing them on the command line);

- [x] 3. Improving on the previous requirement, it should also

  - [x] be possible to list users only from a given location (again, using a command-line option);

- [x] 4. Finally, the application should also query:

  - [x] the programming languages this user seems to know/have repositories with, and store them on the database as well
    - [x] allowing to query a user per location
    - [x] and/or programming languages;

There are some mandatory requirements:

- [x] You must use:

  - [x] NodeJS
  - [x] TypeScript
  - [x] PostgreSQL;

- [x] You should setup the database using migrations, if possible (preferably using SQL, but not mandatory) - feel free to use external tools or libraries for this purpose;

- [x] Code should be split into database functions and general processing functions, when possible;

- [x] For database access, you must use this library: https://github.com/vitaly-t/pg-promise
- [x] For the processing (business logic) functions you should use either native ES6 functions or the library https://ramdajs.com/docs/ (or both);
- [ ] All async functions must be composable, meaning you can call them in sequence without asynchronicity issues;
- [x] You shall have one main function and you should avoid process.exit() calls to the bare minimum;
- [x] You must not use classes, as it is not justified for such a small app (we use almost no classes on our code);
- [x] Your code must be safe, assume all input strings as insecure and avoid SQL injections;
- [x] Each line shall not exceed 80 characters (bonus points if you include/follow some eslint rules), and it should use 2 spaces instead of tabs;
- [x] Your code must be uploaded to GitHub, GitLab, or bitbucket, and you shall present it as a Pull Request over your very first commit;
- [x] And finally, very important, don't forget to include a proper ReadMe.md, that documents your application and tells us how to use it.

> #### Also, bonus points if you include relevant tests on your submission.

---

# Tools to use this application

- Be sure you have NodeJS installed on your system running the command `node -v` on your terminal. If it tells you NodeJS is not installed, open the [NodeJS website](https://nodejs.org/en/download/prebuilt-installer), download and install according to the instructions to your operational system. Try again to run the command `node -v`. In case you still get the same message saying NodeJS is not installed, please restart your computer and try again.

- As long it is required to this application to have a PostgreSQL database, I could choose between using Docker or an online service like AWS or Render. For the sake of simplicity, Docker has been the one selected to deliver this task. In order to build the Docker container in your machine, please make sure you have Docker installed by running in your terminal the command `docker`. If it returns you do not have it installed, please install it accordingly to your current operational system in [this link](https://www.docker.com/products/docker-desktop/).

- As long we will use `Yarn` during the usage of this application, we need to install it. Navigate to [Yarn website](https://classic.yarnpkg.com/en/docs/install) and install it accordingly to your operational system.

- We also will use `GIT` in this application, so you also need to install it. Navigate to [Git SCM website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and install it accordingly to your operational system.

After installing all these tools, please be sure all of them are working properly. If not, please restart your machine and/or reinstall them.

# How to run

Now, you can either

- download the zip file from this package by simply clicking in the green button <div style="width: 100%;">
  <img src="./code.svg" style="width: 100%;" alt="< > Code">
  </div>. on your top right, unzip it in any desired folder you have admin rights

</br>

OR
</br>

- use the command `git clone https://github.com/fabriziodidthis/lovelystaycli.git` in a folder you have admin rights. Before doing this, make sure you have it installed on your computer running the command `git`. We will follow this approach for the sake of simplicity.

> Note: if you are using a Windows version prior 11, do this process in a folder as close as possible to the root folder due [Windows characters limit for folders](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=registry). The limit is 260 characters for a folder path, which can be easily reached with packages.

You are almost there.

Now you have all necessary tools installed and running and the project already cloned / unzipped in your machine, you will need to build and run the Docker container in order to create the Postgres database in your computer. But, before running any other command, you will need to duplicate the file `.env.example` and rename it to just `.env` and fill all the empty strings after the `=` sign and add all the required information. You can copy the info below and paste over the information copied from here into the `.env` file.

```js
# PostgreSQL related
POSTGRES_DB='lovelystay'
POSTGRES_PASSWORD='lovelystaypasswordultrasecret'
POSTGRES_USER='lovelystayusername'
POSTGRES_HOST='localhost'
POSTGRES_DIALECT='postgres'
```

Now you have all the information needed to create your container. To do this, you can simply head over to your terminal and run the command `yarn docker:build` and wait until the process finishes. You will see a message like this in your terminal

```bash
lovelystay-database  | 2024-07-01 16:12:19.189 UTC [1] LOG:  database system is ready to accept connections
lovelystay-adminer   | [Mon Jul  1 16:12:19 2024] PHP 7.4.33 Development Server (http://[::]:8080) started
```

If you see this image, you successfully built your Docker container and it is now up and running. If not, open your Docker Desktop dashboard and be sure both containers (`Adminer` and `PostgreSQL`) are up and running.

You can use `Adminer`, a web based database management, to see all the data in the database. To use this platform, you can open your preferred browser and navigate to `http://localhost:8080` and log-in using the information provided in the `.env` file. The requested information are

- `SYSTEM` - Here you will select the option `PostgreSQL`, since it is the database used in this application
- `SERVER` - This is the database container name, where you can see in the `docker-compose.yml`. In this case, `database` is the name.
- `Username` - Here you will insert the username provided in the `.env` file, in the `POSTGRES_USER=` variable
- `Password` - Here you will insert the password provided in the `.env` file, in the `POSTGRES_PASSWORD=` variable
- `Database` - Here you will insert the database name provided in the `.env` file, in the `POSTGRES_DB=` variable

Finally, if you reached to this point successfully, this means you have the application running in your machine. Now, let's use it. Head over to your terminal and use with the following terminal commands from the sequence below:

- `yarn` - to install all the necessary packages to run the application
- `yarn migration:run` - to create the table and columns required in the database
- `yarn lovely` - to run the application, you need to choose one of the following options below:
  - `-f [username]` - to fetch and save any valid GitHub username and see the data related to it.
  - `-s [username]` - to fetch any valid Github username data from GitHub API and show it in the console
  - `-w [username]` - Show user information from the database. Since all usernames are saved all lower case, you can just search for `-w [username]` instead of whatever how the username is in the Github.
  - `-l` - to retrieve all the information already saved in the database
  - `-g [location] ` - Retrieve users from location (when informed in the Github user profile). This option needs to be used between quotes if the city has spaces or special characters. So, the command will be `lovely -g 'New York'` instead of `-g New York`. Since the location is saved all lower case, you can just use `lovely -g 'new york'` and you are good to go.
  - `-la [language]` - Retrieve users from programming language (when informed)
  - `-pdf [username]` - Retrieve user information saved on the database and create a PDF file with all this information

### How to create migrations?

Notice that in the `package.json` file there is a script called `entity:create`. Notice that also have a variable `name` on it. This `name` will be the model name, in the `entities` file. So, to run this script is pretty simple. You only need to add this variable before the command. So, it will be something like:

```bash
name=Users yarn entity:create
```

In this way, you can easily create an entity to be used right after. If you want to create just a migration, you can simply run

```bash
name=Users yarn migration:create
```

And the migration will be created using the template alread known for TypeORM.

Both migration and models will be created in the designed folders in the `data-source.ts` file in `src/database/config` folder.

### Data validation

One of the rules stated to this project is to 'avoid SQL injections'. Fair enough. Searching for Github policy regarding username normalization, I found [this article](https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/iam-configuration-reference/username-considerations-for-external-authentication#about-username-normalization) where it says `Usernames for user accounts on GitHub can only contain alphanumeric characters and dashes (-).`. So, following this logic, the data sanitization will happen in the time for the username input using a regex.

And for the length, [this documentation](https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/iam-configuration-reference/username-considerations-for-external-authentication#resolving-username-problems) here says I can only have an username with 39 characters long.

So, to sum up, basically the rules are

- It must start with an alphanumeric character
- It can contain lowercase letters, digits, and dashes
- A dash cannot be the last character
- The total length of the username must be between 1 and 39 characters (1 character for the first [a-z\d] and up to 38 for the part in the non-capturing group).

Since I couldn't find relevant documentation for this same rule for `Free, Pro & Teams`, I will assume these rules works for all levels, regardless if there are any other rule. Having knowledge of all these rules, there is the `usernameValidator` file in `src/helpers` folder, to enforce these rules, data sanitization and to assert the username provided in the CLI. There is this same rule in the same but in the file `githubUsername`, but this one only works in the entities due its implementation for TypeORM `classs-validator` decorators.

### Reasons for each package

Since I had the option to choose between any tool to help me in this time, the libs selected are:

- **TypeORM** - Just a simple choice for using with Typescript. Since one of the rules is to use `pg-promise`, I would only use TypeORM to create migrations and models (as long `pg-promise` [doesn't support](https://github.com/vitaly-t/pg-promise/issues/84#issuecomment-177518743) any of these needs), so TypeORM here will be working only for migration and models but data manipulation.

- **Husky** - needless to say its usage. Keep a good linting in the commit messages, run tests and much more before pushing it's always a good choice.

- **Vitest** - One of the best tools today to the test runner.

- **Commander** - One of the simplest libs to create CLI applications. `Inquirer` is also being used in this project to prompt user with questions along the application usage.

- **Adminer** - The simplest database management. Just in case for some reason, a full visualization might be needed in some case for any reason. No particular reason was given to add this tool to the project. The credentials needed to access the dashboard are extracted from the `.env` file in the root folder.

# **ATTENTION**

There is a yarn script called `docker:del`. This command will DELETE ALL YOUR DOCKER CONTAINERS IN YOUR MACHINE RIGHT AWAY. Use it ONLY if you are completely sure of what you are doing and TO NOT DELETE EVERY SINGLE CONTAINER YOU MAY HAVE.

Use it with caution.

# Known technical debts

1 - When searching for a specific language using the flag `-la`, break the languages columns after each comma to not be a big single line. But if you prefer, you can export the user info to a PDF file using the flag `-pdf [username]` for now.
