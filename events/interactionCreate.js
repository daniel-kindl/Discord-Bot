// Import the Events enumeration from the 'discord.js' library.
const { Events } = require('discord.js');

// Export a module containing an event handler for the 'InteractionCreate' event.
module.exports = {
    // Set the event name to 'InteractionCreate'.
    name: Events.InteractionCreate,

    // Define the asynchronous execute function that will be called when the 'InteractionCreate' event is emitted.
    async execute(interaction) 
    {
        // Check if the interaction is a chat input command.
        if (!interaction.isChatInputCommand()) return;

        // Get the command associated with the interaction's command name.
        const command = interaction.client.commands.get(interaction.commandName);

        // Check if the command is not found.
        if (!command) 
        {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try 
        {
            // Execute the command's logic with the interaction.
            await command.execute(interaction);
        } 
        catch (error) 
        {
            // Log the error to the console.
            console.error(error);

            // Handle the error by sending an ephemeral message to the user.
            if (interaction.replied || interaction.deferred) 
            {
                // If a response was already sent or deferred, use followUp.
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } 
            else 
            {
                // If no response was sent or deferred, use reply.
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
