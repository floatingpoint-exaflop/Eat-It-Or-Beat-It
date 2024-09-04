# Group Project Three: Everybody Eats!
A collaborative project using the MERN stack and the FatSecret API to create a website where users can create a secure account and login to search for and build meal and recipe plans, ready to use in the kitchen! This work was completed by Lothy Gresser, Jonathan Grommesh, Tanner Johnson, Nash Peterson, &amp; Tim Scallon.

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Credits](#credits)
  - [Questions](#questions)

  ## Description
  Everybody Eats! But some of us have a healthier or less healthy relationship with food - perhaps the only addictive substance truly needed to stay alive. This website will allow securely registered users to learn more about the foods they eat and make better decisions on their next grocery run or kitchen adventure. Whether you're a nutrition guru already or just getting back into the swing of things, Everybody Eats offers the tools to succeed nutritionally!

  ### Homepage/Landing
  ![image](./screenshots/.png)
  ### User 
  ![image](./screenshots/.png)
  ### User 
  ![image](./screenshots/.png)
  ### User
  ![image](./screenshots/.png)
  ### User 
  ![image](./screenshots/.png)


  ## Installation
  To install this project after copying down the repo, you will first need to run `npm install` (-y for default settings) on the project root, which should grant you access to the necessary libraries listed in the package.json file(s).

  ## Usage
  1. To use this project, ensure you have [Postgres](https://www.postgresql.org/download/) and the node packages installed as specified in the Installation section above.
  2. Open a terminal on the db folder and run psql postgres.
  3. Rename the `.env` file and fill in the appropriate info, keeping the db as dungeon_db.
  3. In Postgres, run `\i schema.db` to build the db.
  4. Open a separate terminal on the project root and run `node ./seed/seedData.js` to seed the db.
  5. On that same node terminal, run `npm run dev` - the server will boot and the site can be explored locally!

  [You can also run from our deployed application on Render!](url)

  ## Contributing
  If you want to contribute to this project - particularly if you want to work with us on expanding our database, normalizing it more, or getting our equipment setup more game-accurate for interface with a future game engine, see our contact info in the Questions section below (Nash owns the repo, but all five of the devs have essentially admin access to it). Don’t hesitate to reach out!

  ## Tests
  This project can and should be tested using localhost and nodemon for the simplest way to both work with and visualize the data and its relationships. Pgadmin4 would also work well to see the tabluation, but it cannot call routes - only can use sql. The site itself also works and can be used from the link above.
  
  ## Credits


  ## Questions
  ### For Lothy:
  - [My Github!](https://github.com/JonGrom)
  - [Email Me](mailto:grommeshjonathan@gmail.com?subject=Hello!)
  ### For Jonathan:
  - [My Github!](https://github.com/JonGrom)
  - [Email Me](mailto:grommeshjonathan@gmail.com?subject=Hello!)
  ### For Tanner:
  - [My Github!](https://github.com/tjjohnson76)
  - [Email Me](mailto:tannerjohnson08@gmail.com?subject=Hello!)
  ### For Nash:
  - [My Github!](https://github.com/TeutonicTed)
  - [Email Me](mailto:npeters021@gmail.com?subject=Hello!)
  ### For Tim:
  - [My Github!](https://www.github.com/floatingpoint-exaflop)
  - [Email Me](mailto:timscallon1@gmail.com?subject=Hello!)

  ## License
  [![Image showing badge for MIT License.](https://img.shields.io/badge/License-MIT_License-blue)](https://mit-license.org/)
  
  This project is using the MIT License. Please click the badge icon for more information, or refer directly to the LICENSE in the repo.