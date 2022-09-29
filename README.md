# Daily Achievements

### _More than a todo list_

## Description

Daily Achievements is more than a todo list. You can create rewards and link them to your todos. Once all of the required todos are completed, your reward is unlocked.

## Features
- Add, edit, and delete todos
- Add, edit, and delete rewards
- Link and unlink todos to the chosen reward
- View which todos are completed
- View which rewards and unlocked
- Create an account and sign in
- Change the color theme

## Tech
- [TypeScript]
- [React]
- [Redux]
- [SASS]
- [MySQL]
- [Node.js]
- [Express.js]
- [Passport.js]

[Express.js]: <https://expressjs.com/>
[MySQL]: <https://www.mysql.com/>
[Node.js]: <https://nodejs.org/en/>
[Passport.js]: <https://www.passportjs.org/>
[React]: <https://reactjs.org/>
[Redux]: <https://redux.js.org/>
[SASS]: <https://sass-lang.com/>
[TypeScript]: <https://www.typescriptlang.org/>

## Installation

1. Clone repo ``` git clone https://github.com/mikelee/daily-achievements.git ```

2. Go to root of project

3. Install packages ``` npm i ```

4. Start server ``` node server.js ```

5. Start app ```npm run dev ```

## How To Use

### Sign In
- Navigate to /
- Click "Sign Up" or "Sign In"
- Enter credentials

### To Dos
- Click "Add To Do" to create new blank to do
- Click on the input to give the to do a name
- Click the box on the left side of the to do to toggle it completed or not. A checkmark signifies that it is completed
- Hover over a to do and click the X button on the right to delete it

### Rewards
- Click "Add Reward" to create new blank reward. The reward's name is on the left side. The to dos you must complete to unlock the reward are on the right side, called Requirements
- Click on the the input to add a name
- Hover over a reward and click the X button on the bottom right to delete it

### Requirements
- Click on the + button on the right of a reward to add a requirement. This will bring you to the list of todos you can select as Requirements
- Requirements that are selected for the reward you are adding to have a dark colored checkbox. Unselected requirements have a light colored checkbox. You can still see which to dos are completed or not by looking for the checkmark
- When you are done selecting requirements for the reward, click "Done" above the to dos on the right side. Now you can check and uncheck the to dos again
- On the reward you added the requirements to, you will see the requirements on the right
- Requirements that have been completed are marked with a checkmark on the left side of the requirement
- Hover over a requirement and click the X button on the right side of it to delete the requirement

### Change Color Theme
- Click on the menu on the top right
- Click color theme
- Click on the color that you want to change the color theme to

### Logout
- Click on the menu on the top right
- Click "Logout"
- You will be displayed with a page saying that you have successfully logged out