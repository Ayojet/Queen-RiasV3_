const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUwwcVlFTTZId3MwcGhaVFpwemVVWExvVmx0d1h5K2R3d1hEc3k2c25ITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDZVZEduaW0rbW1pSUExS1pVYjRoU3JWcHdySE1rVWtJbndJcmM4U3VCVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUHBtRWF5WE0xUTlnOHpnaVNPY2FvWWNMMUVaM25KWHZQL3V6by84MDM4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2ZGRXM1hLN1NrUjd1WEZFRU40WlN6ajBsWTZYc2xYODJwNWR3dUdreEM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktIZUpBR1MzQzFzeThXZkNqWW83amM0bEZxZEwrMm9YYXZUSTNVYXlHbVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9wa0ZSM1RqdDZhdE9aL0NzMVpyZGpUYzhranVEK3g2ZXIrTXdQb2t6aWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0R0OXFwcngxaU1SUCt4SGFmcG5WUGNTWHYxczJ5cWcrTzR0Nk1PcWRVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1lST29mOU5YUytMZFVqRzE4cGl2TkkwWmpsK0lBVkJVWERSTVI5R1NXVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJJUmVqNUZBaXJFZ0kyVitSUmo5M3lmeldsNHJpVmRDbXI5azJrelNSRnpCdGh4WlF2dDhxZnJLbldCUkQyc1RYYnJObmJ6QW13YVdHOGFtN25FNEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJ0a0FReHdidmpPNHpGUDZrdEZsRmtOQjZuV0k5R1RQeHlGZWU0bmZNWURVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI4VzlQTUFRRSIsIm1lIjp7ImlkIjoiMjM0NzA4NjE4NDYyODoxOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI3NTM1NTIxODc5MjYwNDoxOUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09Iai9lSUJFTFR5M01BR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitBMUJ2ZGZYWjZIaUdRSVJyQXhUTzhmaVdNMWhvbnd3QXM4R2RBR1Yra0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlN0N2ZneUhHTmFBTzVhNisyVFY4MDNiZU9CdFJBS0owSSsraURsL2wxVnRNWWQwc1VRMnVBWFJINjd4b2U3VkZoVzlNSW9tcHQxQndLTzBXbnFXeEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJMdUJ0NE1haVVHZjdKcGpPS2FFMVhQVmFhbmduS1pNZlB5Z0pscFhmSG5qbG9ReG9veDNueGRJdkloQlBTekxTL1VmWk9Sd2x4K1JkdnIvU3hoNXJCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwODYxODQ2Mjg6MTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmdOUWIzWDEyZWg0aGtDRWF3TVV6dkg0bGpOWWFKOE1BTFBCblFCbGZwQyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2MzUyNDUwLCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
