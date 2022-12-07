const {Client, GatewayIntentBits, Constants, ApplicationCommandOptionType} = require('discord.js')
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready', () =>{
    console.log('Online')

    const guildId = '867399874542829618'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild){
        commands = guild.commands
    }else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'test',
        description: 'Replies test successful'
    })

    commands?.create({
        name: 'add',
        description: 'Add two numbers.',
        options: [
            {
                name: 'num1',
                description: 'First number.',
                required: true,
                type: ApplicationCommandOptionType.Number
            },
            {
                name: 'num2',
                description: 'Second number.',
                required: true,
                type: ApplicationCommandOptionType.Number
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }
    const {commandName, options} = interaction

    if (commandName === 'test'){
        interaction.reply({
            content: 'Test Successful',
            // ephemeral: true, == if true you are the only one who can see the reply
        })
    }
    else if (commandName === 'add'){
        const num1 = options.getNumber('num1')
        const num2 = options.getNumber('num2')
        
        await interaction.deferReply()

        await new Promise(resolve => setTimeout(resolve, 3000))

        await interaction.editReply({
            content: `The sum is: ${num1 + num2}`
        })
    }
})

client.on('messageCreate', message => {
    if (message.content === 'ping'){
        message.reply('pong')
    }
    else if (message.content === 'pogi ako'){
        message.reply('true')
    }
})

client.login(process.env.TOKEN)