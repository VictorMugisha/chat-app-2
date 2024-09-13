const Chat = require("../models/chatModel");

// Send a chat message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, group, message, attachments, repliedTo } =
      req.body;
    const chat = new Chat({
      sender,
      receiver,
      group,
      message,
      attachments,
      repliedTo,
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({
      $or: [
        { sender: userId },
        { receiver: userId },
        { group: { $in: userId } },
      ],
    })
      .populate("sender receiver")
      .exec();

    res.json(chats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
