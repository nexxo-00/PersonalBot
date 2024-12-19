module.exports = {

  config: {

    name: "in",

    aliases: ["in"],

    version: "1.0",

    author: "Jisan",

    countDown: 10,

    role: 0,

    shortDescription: {

      en: "hello goatbot inbox no prefix file enjoy the cmmand @Jisan"

    },

    longDescription: {

      en: ""

    },

    category: "fun",

    guide: {

      en: ""

    }

  },

  langs: {

    en: {

      gg: ""

    },

    id: {

      gg: ""

    }

  },

  onStart: async function({ api, event, args, message }) {

    try {

      const query = encodeURIComponent(args.join(' '));

      message.reply("✅ SUCCESSFULLY SEND MSG\n\n❇️তোর ইনবক্স চেক কর ,  cute তোমাকে প্রেমপত্র লেটার পাঠিয়েছি চেক করো জানু 🐸🐥🥹", event.threadID);

      api.sendMessage("✅ SUCCESSFULLY ALLOW\n🔰 হ্যাঁ জান বলো  ,  আমি তোমাকে জুতার সমান ভালোবাসি 🐸🐥", event.senderID);

    } catch (error) {

      console.error("Error bro: " + error);

    }

  }

}
