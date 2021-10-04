import { bot } from "../../index.js";
import { staffChannelID } from "../../resources/consts.js";
import log4js from "log4js";
const McChatLogger = log4js.getLogger("McChatLogs");

export default {
	name: "message",
	async execute(message) {
		if (message.channel.id == staffChannelID) {
			if (message.content.startsWith(process.env.PREFIX)) {
				return;
			}
			if (message.author.bot) {
				return;
			}
			if (message.attachments.size > 0) {
				return;
			}
			const user = message.member;
			if (message.content.length > 250) {
				return message.channel.send(
					`Your message is too long! ${message.content.length}/250`
				);
			}
			bot.chat(`/oc [${user.displayName.split(" ")[0]}] - ${message.content}`);
			McChatLogger.info(
				`DISCORD (OFFICER CHAT)> [${message.author.tag}/${message.author.id}]: ${message.content}`
			);
			message.delete();
		}
	},
};
