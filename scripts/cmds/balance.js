module.exports = {
  config: {
    name: "balance",
    aliases: ["bal", "cash", "coin", "money"],
    version: "1.1 + 1",
    author: "NTKhang || Liane",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "xem số tiền của bạn",
      en: "view your money"
    },
    longDescription: {
      vi: "xem số tiền hiện có của bạn hoặc người được tag",
      en: "view your money or the money of the tagged person"
    },
    category: "banking",
    guide: {
      vi: "   {pn}: xem số tiền của bạn"
        + "\n   {pn} <@tag>: xem số tiền của người được tag",
      en: "   {pn}: view your money"
        + "\n   {pn} <@tag>: view the money of the tagged person"
    }
  },

  langs: {
    vi: {
      money: "Bạn đang có %1$",
      moneyOf: "%1 đang có %2$"
    },
    en: {
      money: "You have %1$",
      moneyOf: "%1 has %2$"
    }
  },

  onStart: async function ({ message, usersData, event, getLang }) {
    if (event.messageReply) {
      const userData = await usersData.get(event.messageReply.senderID);
    message.reply(getLang("moneyOf", userData.name, userData.money), () => {}, null);
      return;
    }
    if (Object.keys(event.mentions).length > 0) {
      const uids = Object.keys(event.mentions);
      let msg = "";
      for (const uid of uids) {
        const userMoney = await usersData.get(uid, "money");
        msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
      }
      return message.reply(msg, () => {}, null);
    }
    const userData = await usersData.get(event.senderID);
    message.reply(getLang("money", userData.money), () => {}, null);
  }
};