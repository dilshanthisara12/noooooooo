module.exports = {
    name: "Join Voice Channel",

    description: "Joins the voice channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "required": true
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to join.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "deafen",
            "name": "Deafen Bot?",
            "description": "Description: Deafens bot.",
            "type": "SELECT",
            "options": {
                "false": "NO",
                "true": "YES" 
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "voice_connection",
            "name": "Voice Connection",
            "description": "Type: Object\n\nDescription: The voice connection of the voice channel joined.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const voice_channel = this.GetInputValue("voice_channel", cache);
        const deafen = this.GetOptionValue("deafen", cache);
        voice_channel.join().then(voice_connection => {
            this.StoreOutputValue(voice_connection, "voice_connection", cache);
            if (deafen == "true") (voice_connection.voice.setSelfDeaf(true))
            this.RunNextBlock("action", cache);
        });
    }
}