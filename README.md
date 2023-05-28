# discord-gpt
### Simple GPT empowered Discord bots.  
Original guide: https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b

# Discord setup:
## Log in to Discord and create a server
You have to own the server or know someone with the rights to add the bot account in a later step.  
You can create a new server by clicking the “+” icon in the left side servers menu.

## Create a Discord Bot
- Go to https://discord.com/developers/applications  
  Click on the “New Application” button on the top right to create a new application.
- Give the application a name.
- (Optional) give it a description.
- (Optional) add an image.
- Copy the **APPLICATION ID** and paste it into your .env file (example.env by default, rename it to .env if you haven't already).
- Save Changes.

## Navigate to the "OAuth2 > URL Generator" tab.
You can enable any scope you feel like, but you must enable at least the following:
- bot
- Send Messages
- Read Messages/View Channels
- Scroll to the bottom and copy the "GENERATED URL".  
(It will look similar to this: https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=3072&scope=bot)

## Navigate to the "OAuth2 > General" tab.
- At the bottom "Default Authorization Link" select the **Custom URL** Authorization Method.
- Paste your generated URL from the previous tab.
- Save Changes.

## Navigate to the "Bot" tab.
- Click "Reset Token".
- Agree.
- Copy and paste the new token into your .env file.
- (Optional) change the bot's username.
- Scroll down and enable "MESSAGE CONTENT INTENT".
- Save changes.

## Wrapping up Discord
Copy and paste your Custom URL generated earlier into the browser.  
You'll be prompted to invite your newly created bot into a server (assuming you are in, or have, a server with the necessary privileges).  
Authorize the bot to join your server.

# Set up OpenAI
