import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    id: number,
    name: String,
    email: String,
    created_date: String,
    lastModified_date: String,
    birthdate: String
};
  
export const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    created_date: String,
    lastModified_date: String,
    birthdate: String
});
  
const User = mongoose.model<IUser>('User', UserSchema);

export default User



