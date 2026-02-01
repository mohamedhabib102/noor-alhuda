import mongoose from "mongoose";


const heroSchema = new mongoose.Schema({
   id: {type: Number, required: true, unique: true},
   type: {type: String, required: true},
   title: {type: String, required: true},
   description: {type: String, required: false},
   link: {type: String, required: false},
   createdAt: {type: Date, default: Date.now}
});

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default Hero;