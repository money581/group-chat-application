const Group = require('../models/group');

const UserGroup = require('../models/usergroup');

const User = require('../models/user');




exports.createGroup = async (req, res, next) => {

    try {

        const { groupName, members } = req.body;

        const userId = req.user.id;

        const grp = await Group.findAll({ where: { name: groupName } });

        if (grp.length > 0) {

            for (const member of members) {

                const user = await User.findOne({ where: { name: member } });

                if (user) {

                    const memberUser = {

                        userId: user.id,

                        groupName: groupName,

                        name: user.name,

                        groupId: grp[0].id

                    };

                    await UserGroup.create(memberUser);

                }

            }

            res.status(201).json({ success: true, groupid: grp[0].id, message: 'Member added in existing group' });

        }

        else {

            // create a new group in db

            const group = await Group.create({ name: groupName });

            // adding user who created the group to groups member list

            const groupUser = {

                userId: userId,

                groupName: groupName,

                name: req.user.name,

                groupId: group.id

            }

            await UserGroup.create(groupUser);




            //for adding any member to the group member list

            for (const member of members) {

                const user = await User.findOne({ where: { name: member } });

                if (user) {

                    const memberUser = {

                        userId: user.id,

                        groupName: groupName,

                        name: user.name,

                        groupId: group.id

                    };

                    await UserGroup.create(memberUser);

                }

            }

            res.status(201).json({ success: true, groupid: group.id, message: 'Group created successfully' })

        }

    }

    catch (err) {

        console.log(err)

        res.status(500).json({ message: err.message, success: false });

    }

}




exports.getgroupname = async (req, res, next) => {

    try {

        const groupDetails = await UserGroup.findAll({ where: { userId: req.user.id } });

        res.status(201).json({ success: true, groupDetails: groupDetails });

    } catch (err) {

        res.status(500).json({ message: err.message, success: false });

    }

}