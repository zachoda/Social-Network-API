const {Schema, model, Types} = require('mongoose');
const validateEmail = require('../utils/validate-email');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: [validateEmail, 'Enter a valid email, please.'],
            // match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid email, please.']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref:"User"
        }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual('Friend Count').get(function() {
     return this.friends.reduce((total,friend) => total + friend.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;
