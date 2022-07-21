import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  socialOnly: { type: Boolean, default: false },
  avatarUrl: String,
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

// userSchema.static('hashPassword', async function (password) {
//   if(password.isModified('password')) {
//     const saltRounds = 5;
//     const hash = await bcrypt.hash(password, saltRounds);
//     console.log('hash password', hash);
//     return hash;
//   }
// });

userSchema.pre('save', async function () {
  // excute only when password document is modified
  if (this.isModified('password')) {
    const saltRounds = 5;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
