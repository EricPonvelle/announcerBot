# Overview
This bot was commissioned to announce that a selected user it the current champion of a Discord server that has enabled the bot. To properly use the tool, a champion role needs to be created and established, and if champion history is desired as well as a leaderboard, users must configure a MongoDB cluster.

> **NOTE**: The history tracking is done based on XP. As someone loses the champion status, their XP reduced by 999 XP. This means that John Smith, the first champion, has 1,000XP as champion. When he loses the championship, he now has 1XP. If he wins and loses the championship again, his XP will be set to 2XP, and so forth.

The use case for this bot required only four basic commands plus a leaderboard. Contributions and improvements are welcomed!

# Prerequisites
To run the bot, you will need to have NodeJS installed on your local system. It is recommended to get some sort of code editor as well to customize the bot for your application:
1. https://nodejs.org/en/ - Install the "Recommended For Most Users" option. Ensure that NodeJS is added to the system 'PATH' variable. To confirm installation, in a command line, enter:

    `node --version` 

    If Node is installed, a version number will display.  
1. https://code.visualstudio.com/ 

# Configuration

The following sections detail the elements of setting up the AnnouncerBot in your Discord server.

## How to set up the Discord bot
1. Navigate to https://discord.com/developers/applications.
1. Log into your Discord account.
1. Create a new application.

    ![](/assets/Discord1.png)
1. The "Create an Application" dialog will display. Simply supply a name for the bot. In this case, announcerBot is used.

    ![](/assets/Discord2.png)

1. Once the application is created, select "Bot" on the left-hand navigation panel. On this page, select "Add Bot," and then select "Yes, do it!"

    ![](/assets/Discord3.png)

    > **NOTE**: Discord does not allow users to delete bots. Once created, it can only be uninvited.

1. On the added Bot's page, select the "Copy" option under the "Token" section. Paste this token into the config.js 

    ![](/assets/Discord4.png)

1. Before closing the bot configurations, under the "Privileged Gateway Intents" section, 0ensure that both options--"Presence Intent" and "Server Members Intent"--are enabled.

    ![](/assets/Discord5.png)

The bot is now ready to be invited to your Discord server.

## How to invite your Discord bot to your server

1. From the Developer Application site, click the "General Information" option from the left-hand navigation. 

    ![](/assets/Discord6.png)

1. Copy the "CLINET ID" key that appears under the name and description of the application with the "Copy" button.

    ![](/assets/Discord7.png)

1. Navigate to the Discord Permissions Calculator site--https://discordapi.com/permissions.html.

1. Near the bottom of this page, paste in the copied Client ID.

    ![](/assets/Discord8.png)

1. Select the permissions for the bot. Since this bot manages roles, it will at least need the "Manage Roles" permissions as well as a status that is higher than the roles it manages. Once done, select the link at the bottom. 

    ![](/assets/Discord9.png)

A "Connect to Discord" dialog will appear. Add the bot to the desired server. The bot can now be seen in your channel, though offline.

If you do not want a leaderboard, continue to the "Starting your bot" section. Otherwise, read the section on connecting to a MongoDB cluster.

## How to set up your Mongo Database for Leaderboards

As mentioned, a database is only necessary for the leaderboard and champion history tracking.

1. Navigate to https://www.mongodb.com/. Create or log into your account.

    ![](/assets/Discord10.png)

1. Select the "New Project" button. 

    ![](/assets/Discord11.png)

1. Create the new a new project as desired. Once the project is created, select the "Create a New Cluster" button.

    ![](/assets/Discord12.png)

1. Select the options as desired. AWS and a server region that is as close to you as possible are recommended. 

    ![](/assets/Discord13.png)

1. MongoDB allows for a free single project/cluster. Select this option then click the "Create Cluster" option.

1. Once created, select the "CONNECT" option on your created cluster.

    ![](/assets/Discord14.png)

1. Selecting this will prompt you to provide information on the host server. On the "Connect to ClusterX" dialgo, select "Add Your Current IP" then accept the entry. After, create a DB user.

    ![](/assets/Discord15.png)

   > **NOTE**: The entered password will be required for the next steps. 

1. On the next step, click "Connect your application."

    ![](/assets/Discord16.png)

1. In this step, copy the connection string in Step 2, and past this into the config.js "mongoPath" field.

    ![](/assets/Discord17.png)
    
    ![](/assets/Discord18.png)

    > **NOTE**: That the `<password>` field in the string should be replaced with the set password created previously.

Once the config.js is saved, your bot is ready to be started.


## Starting your bot
To start the bot, in the source directory, run start.bat. A command prompt should show saying "Connected to Discord." If you configured a Mongo database for the leaderboard, a "Connected to Mongo" message will appear.

The bot is ready for use.

# Using the bot

Initially, the bot has four commands. These are the defaults for the bot.

* `?start` - This command starts the leaderboard and begins the bot tracking. Every time the command is issued, a new instance of the leaderboard appears. The leaderboard does update as new champions are selected.
* `?stop` - This command stops the bot from tracking the champion.
* `?championrole` - This command takes a role value as the current champion. When a user is set to the champion, they should receive this role. For example, `?championrole @Champion` sets the current champion to the Champion user role. *This is a required operation.*
* `?andnew` - This command will set the current champion as whomever is tagged. The current champion will receive 1,000XP, pushing them to the top of the leaderboard. Previous champions will lose 999XP every time. For example, a person who has lost the champion role 3 times, would appear on the leaderboard with only 3XP. If they gain the champion role after this, they will be set to 1,003XP. The command requires a non-champion to be tagged-- `?andnew @JohnSmith` would set the user John Smith as champion.

   > **NOTE**: The champion history can be reset by purging the collections in MongoDB.