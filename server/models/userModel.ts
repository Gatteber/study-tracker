import mongoose, {Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDoc extends Document {
    name: string,
    email: string,
    password: string,
    matchPassword: (pw: string) => Promise<Boolean> 
}

const userSchema = new mongoose.Schema<IUserDoc>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function(sentPassword: string) {
    return await bcrypt.compare(sentPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;