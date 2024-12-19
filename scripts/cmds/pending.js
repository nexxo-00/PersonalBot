module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "Jisan",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "Goat-alAuthor"
  },

  langs: {
    en: {
      invaildNumber: "%1 is not a valid number",
      cancelSuccess: "Successfully refused %1 thread(s)!",
      approveSuccess: "🎉 Successfully approved %1 thread(s)! 🎉",
      cantGetPendingList: "Unable to fetch the pending list!",
      returnListPending: "»「PENDING」«❮ Total threads awaiting approval: %1 ❯\n\n%2",
      returnListClean: "「PENDING」There are no threads in the pending list."
    }
  },

  onReply: async function ({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;

    const { body, threadID, messageID } = event;
    let count = 0;

    if (isNaN(body) && (body.indexOf("c") == 0 || body.indexOf("cancel") == 0)) {
      const index = body.slice(1).split(/\s+/);
      for (const singleIndex of index) {
        if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) {
          return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
        }
        api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
        count++;
      }
      return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    } else {
      const index = body.split(/\s+/);
      for (const singleIndex of index) {
        if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) {
          return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
        }

        const approvedThread = Reply.pending[singleIndex - 1];
        const approvalMessage = `🎊 *Congratulations!* 🎊\nYour thread *"${approvedThread.name}"𝘼𝘿𝙈𝙄𝙉 𝘼𝙋𝙋𝙍𝙊𝙑𝙀 𝙏𝙃𝘼 𝙂𝘾 ✅ 𝘼𝘿𝙈𝙄𝙉:𝙈𝙍-𝙅𝙄𝙎𝘼𝙉             

𝙃𝙚𝙧𝙚 𝙞𝙨 𝙢𝙮 𝙤𝙬𝙣𝙚𝙧 𝙞𝙙 𝙇𝙞𝙣𝙠:https://www.facebook.com/XAIKO.JISAN?mibextid=ZbWKwL

•𝗕𝗼𝘁 ,𝗵𝗲𝗹𝗽 𝘀𝗲𝗲 𝘆𝗼𝘂 𝗮𝗹𝗹 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀

•𝗛𝗮𝘃𝗲 𝗮 𝗻𝗶𝗰𝗲 𝗺𝗼𝗿𝗻𝗶𝗻𝗴 💋
🩵 𝙂𝙍𝙊𝙐𝙋 𝙉𝘼𝙈𝙀:\n`;

        // Send the approval message with the GIF
        api.sendMessage(
          {
            body: approvalMessage,
            attachment: await global.utils.getStreamFromURL("https://i.imgur.com/HEyjxNW.jpeg")
          },
          approvedThread.threadID
        );

        count++;
      }
      return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
  },

  onStart: async function ({ api, event, getLang, commandName }) {
    const { threadID, messageID } = event;

    let msg = "",
      index = 1;

    try {
      const spam = (await api.getThreadList(100, null, ["OTHER"])) || [];
      const pending = (await api.getThreadList(100, null, ["PENDING"])) || [];
      const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

      for (const single of list) {
        msg += `${index++}/ ${single.name} (${single.threadID})\n`;
      }

      if (list.length > 0) {
        return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
          });
        }, messageID);
      } else {
        return api.sendMessage(getLang("returnListClean"), threadID, messageID);
      }
    } catch (e) {
      return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID);
    }
  }
};
