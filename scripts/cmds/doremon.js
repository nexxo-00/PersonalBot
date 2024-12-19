module.exports = {
  config: {
    name: "dorevid",
    version: "1.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "get doremon video",
    longDescription: "get random doremon video",
    category: "doremon",
    guide: "{pn} doremonvdo",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "Loading random doremon video... Please wait! 🕐",
    });

    const link = [
      "https://i.imgur.com/OOp9CPF.mp4",// video credits xenoz (youtube)
      "https://i.imgur.com/qdbkuMH.mp4",
      "https://i.imgur.com/pntn2az.mp4",
      "https://i.imgur.com/TogW7BE.mp4",
      "https://i.imgur.com/vSWaSMM.mp4",
      "https://i.imgur.com/W9F0Ejp.mp4",
      "https://i.imgur.com/FKjoziV.mp4",
      "https://i.imgur.com/JnT7nft.mp4",
      "https://i.imgur.com/hncSHRn.mp4",
      "https://i.imgur.com/HRQxLDB.mp4",
      "https://i.imgur.com/Bl6bp1v.mp4",
      "https://i.imgur.com/VcZpVjz.mp4",
      "https://i.imgur.com/y8PxXD6.mp4",
      "https://i.imgur.com/n2bm4jv.mp4",
      "https://i.imgur.com/W9F0Ejp.mp4",
      "https://i.imgur.com/hcjmnR1.mp4",
      "https://i.imgur.com/iy8YIQy.mp4",
      "https://i.imgur.com/kU50YdZ.mp4",
      "https://i.imgur.com/Hzej3xc.mp4",
      "https://i.imgur.com/ajzgjPY.mp4",
      "https://i.imgur.com/sKUqFkM.mp4",
      "https://i.imgur.com/Qbpry0f.mp4",
      "https://i.imgur.com/G6JfDua.mp4",
      "https://i.imgur.com/wdfw4uX.mp4",
      "https://i.imgur.com/2AG6Xx5.mp4",
      "https://i.imgur.com/NE8sV7G.mp4",
      "https://i.imgur.com/4LrJXPx.mp4",
      "https://i.imgur.com/8JSMtQ9.mp4",
      "https://i.imgur.com/1toITNz.mp4",
      "https://i.imgur.com/KlpeoUK.mp4",
      "https://i.imgur.com/Qbpry0f.mp4",
      "https://i.imgur.com/JYJj77U.mp4",              
"https://i.imgur.com/yBUTdIC.mp4",
"https://i.imgur.com/TAsKjQs.mp4",
"https://i.imgur.com/tmIUDPB.mp4",
      // Add more video links here
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: 'ENJOY..💙💛',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
