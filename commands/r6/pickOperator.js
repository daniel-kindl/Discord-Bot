// Import the SlashCommandBuilder class from the 'discord.js' library.
const { SlashCommandBuilder } = require('discord.js');

// Export a module containing a slash command.
module.exports = 
{
    // Use the SlashCommandBuilder to define the properties of the slash command.
    data: new SlashCommandBuilder()
        .setName('operator-pick') // Set the command name.
        .setDescription('Pick random operator') // Set the command description.

        .addStringOption(option =>
			option
            .setName('option')
            .setDescription('Option for operator selection')
			.setRequired(true)
            .addChoices(
                { name: 'All', value: 'allOps' },
                { name: 'Attack', value: 'atkOps' },
                { name: 'Defend', value: 'defOps' },
            )
        ),

    // Define the execute function that will be called when the command is invoked.
    async execute(interaction) 
    {
        const option = interaction.options.getString('option');
        const pickedOp = pickOperator(option);
        
        // Send a reply to the interaction.
        await interaction.reply(`Your operator is: **${pickedOp}** `);
    },
};

function pickOperator(option)
{
    // All attack operators
    let attackers = ['Sladge', 'Thatcher', 'Ash', 'Thermite', 'Twitch', 'Montagne', 'Glaz', 'Fuze', 'Blitz', 'IQ', 'Buck', 'Blackbeard', 'Capitão', 'Hibana',
                     'Jackal', 'Ying', 'Zofia', 'Dokkaebi', 'Lion', 'Finka', 'Maverick', 'Nomad', 'Gridlock', 'Nøkk', 'Amaru', 'Kali', 'Iana', 'Ace', 'Zero',
                     'Flores', 'Osa', 'Sens', 'Grim', 'Brava', 'Ram', 'Deimos'];

    // All defend operators                 
    let defenders = ['Smoke', 'Mute', 'Castle', 'Pulse', 'Doc', 'Rook', 'Kapkan', 'Tachanka', 'Jäger', 'Bandit', 'Frost', 'Valkyrie', 'Caveira', 'Echo', 'Mira',
                     'Lesion', 'Ela', 'Vigil', 'Maestro', 'Alibi', 'Clash', 'Kaid', 'Mozzie', 'Warden', 'Goyo', 'Wamai', 'Oryx', 'Melusi', 'Aruni', 'Thunderbird',
                     'Thorn', 'Azami', 'Solis', 'Fenrir', 'Tubarão'];

    switch(option)
    {
        case 'allOps':
            // Combine both arrays to one array
            let allOps = attackers.concat(defenders);
            return getRandomValueFromArr(allOps);
        break;

        case 'atkOps':
            return getRandomValueFromArr(attackers);
        break;

        case 'defOps':
            return getRandomValueFromArr(defenders);
        break;

        default:
            throw new Error(`Invalid option: ${option}`);
    }
}

function getRandomValueFromArr(array)
{
    if (!array || array.length === 0) throw new Error('Array is empty');
    
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomValue = array[randomIndex];
    return randomValue;
}