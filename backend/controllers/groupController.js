const Group = require("../models/groupModel");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, description, members, admins, createdBy, isPrivate } =
      req.body;
    const group = new Group({
      name,
      description,
      members,
      admins,
      createdBy,
      isPrivate,
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members admins createdBy")
      .exec();
    if (!group) return res.status(404).json({ error: "Group not found" });

    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add member to a group
exports.addMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove member from a group
exports.removeMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    group.members = group.members.filter(
      (member) => member.toString() !== userId
    );
    await group.save();

    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
