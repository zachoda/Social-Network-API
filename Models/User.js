const {Schema, model, Types} = require('mongoose');

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
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email address.`
            },
            required: [true, 'Please enter a valid email address.']
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

UserSchema.virtual('friendCount').get(function() {
     return this.friends.reduce((total,friend) => total + friend.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;
