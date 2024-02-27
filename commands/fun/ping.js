// Import the SlashCommandBuilder class from the 'discord.js' library.
const { SlashCommandBuilder } = require('discord.js');

// Export a module containing a slash command.
module.exports = 
{
    // Use the SlashCommandBuilder to define the properties of the slash command.
    data: new SlashCommandBuilder()
        .setName('ping') // Set the command name to 'ping'.
        .setDescription('Replies with Pong!'), // Set the command description.

    // Define the execute function that will be called when the command is invoked.
    async execute(interaction) 
    {
        // Send a reply 'Pong!' to the interaction.
        await interaction.reply('Pong!');
    },
};
