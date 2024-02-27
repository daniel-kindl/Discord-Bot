// Import the Events enumeration from the 'discord.js' library.
const { Events } = require('discord.js');

// Export a module containing an event handler for the 'ClientReady' event.
module.exports = 
{
    // Set the event name to 'ClientReady'.
    name: Events.ClientReady,
    // Set 'once' to true, indicating that this event handler should only run once when the event occurs.
    once: true,

    // Define the execute function that will be called when the 'ClientReady' event is emitted.
    execute(client) 
    {
        // Log a message indicating that the bot is ready, including its tag.
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
