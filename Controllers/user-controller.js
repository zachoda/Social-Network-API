const {User} = require('../Models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path:'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //get single user by id
    getUserbyId({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //update user
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body)
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'Sorry, there is no user with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
//add a friend
addFriend({params,body}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        {$push: {friends: body}},
        {new: true}
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: "There is no user by that id."});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
//delete a friend
removeFriend({params}, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        {$pull: {friends: {friendId: params.friendId}}},
        {new:true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
};

module.exports = userController;