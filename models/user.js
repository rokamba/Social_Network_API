const {schema, model} = require('mongoose');

const UserSchema = new schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thougths: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends:[
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false

    }
);
const User = model('User', UserSchema);
//retrieves the length of the user's friends array field on query.
UserSchema.virtuals('friendCount').get(function(){
    return this.friends.length
})

module.exports = User