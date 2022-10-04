const { Thought, User } = require("../Models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found by this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body)
      .then((updatedThought) => {
        if (!updatedThought) {
          return res
            .status(404)
            .json({ message: "There is no thought by this id." });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtText } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "There is no user by this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({_id: params.thoughtId})
    .then(deletedThought => {
        if(!deletedThought) {
            return res.status(404).json({message: 'There is no thought by this id.'});
        }
        return User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {thoughts: params.thoughtId}},
            {new: true}
        );
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'There is no user by this id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$push: {reactions: body}},
        {new:true}
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'There is no user by this id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
       {_id: params.thoughtId},
       {$pull: {reactions: {reactionId: params.reactionId}}},
       {new: true} 
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
