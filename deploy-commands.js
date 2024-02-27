// Import necessary modules and classes from 'discord.js'.
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Create an array to store command data for deployment.
const commands = [];

// Define the path to the commands directory.
const foldersPath = path.join(__dirname, 'commands');

// Get a list of command folders in the commands directory.
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each command folder.
for (const folder of commandFolders) 
{
    // Define the path to the current command folder.
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
            // Push the toJSON output of the command's data to the commands array for deployment.
            commands.push(command.data.toJSON());
        } 
        else 
        {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Create an instance of the REST module and set the bot's token.
const rest = new REST().setToken(token);

// Deploy the commands to the guild.
(async () => 
{
    try 
    {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Use the REST.put method to fully refresh all commands in the guild with the current set.
        const data = await rest.put
        (
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } 
    catch (error) 
    {
        // Catch and log any errors that may occur during deployment.
        console.error(error);
    }
}
)();
