
module.exports = {
    name: "Get User Banner",

    description: "Gets the user's banner",

    category: "User Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },		
        {
            "id": "user",
            "name": "User",
            "description": "The user to get the banner off of",
            "types": ["object", "unspecified"],
            "required": true
        }	
    ],

    options: [
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "output",
            "name": "User Banner (URL)",
            "description": "The banner of the user (URL)",
            "types": ["text"]
        }
    ],




    async code(cache) {
        const user = this.GetInputValue("user", cache);
		const client = this.client;
		const token = client.token;
		const { getUserBanner } = await this.require("discord-banner");
        
		const banner = await getUserBanner((user.id),{token: token})
		
		this.StoreOutputValue((banner.banner_url), "output", cache);
        this.RunNextBlock("action", cache)

    }
}