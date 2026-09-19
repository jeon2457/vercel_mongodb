import mongoose from 'mongoose';

const SmsMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.SmsMember || mongoose.model('SmsMember', SmsMemberSchema);
