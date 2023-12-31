const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["ADMIN", "CREATOR", "GUEST"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
