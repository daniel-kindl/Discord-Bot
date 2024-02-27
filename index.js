//* MAIN FILE

// Require the fs (file system) module for file operations.
const fs = require('node:fs');

// Require the path module for working with file paths.
const path = require('node:path');

// Require necessary classes and modules from Discord.js library.
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Require the bot token from the configuration file.
const { token } = require('./config.json');

// Create a new Discord client instance.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//* COMMANDS
// Create a Collection to store and efficiently retrieve commands.
client.commands = new Collection();

// Define the path to the commands directory.
const foldersPath = path.join(__dirname, 'commands');

// Get a list of folders in the commands directory.
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each folder in the commands directory.
for (const folder of commandFolders) 
{
  const commandsPath = path.join(foldersPath, folder);

  // Get a list of command files in the current folder.
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  // Loop through each command file in the current folder.
  for (const file of commandFiles) 
  {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Check if the required properties 'data' and 'execute' exist in the command module.
    if ('data' in command && 'execute' in command) 
	{
      // Set a new item in the Collection with the command name as the key and the command module as the value.
      client.commands.set(command.data.name, command);
    } 
	else 
	{
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

//* EVENTS
// Define the path to the events directory.
const eventsPath = path.join(__dirname, 'events');

// Get a list of event files in the events directory.
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Loop through each event file in the events directory.
for (const file of eventFiles) 
{
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  // Check if the event should be executed once or on every occurrence.
  if (event.once) 
  {
    // Register the event to be executed once.
    client.once(event.name, (...args) => event.execute(...args));
  } 
  else 
  {
    // Register the event to be executed on every occurrence.
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord with the provided bot token.
client.login(token);