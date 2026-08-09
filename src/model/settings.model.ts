import mongoose , { Schema } from "mongoose";

interface ISettings{
    ownerId : String,
    businessName : String,
    supportEmail : String,
    knowledge: String,

    creditsRemaining : Number,
    creditsUsed : Number
}

const settingSchema = new Schema<ISettings>({
    ownerId : {type:String, required:true , unique:true},
    businessName : {type:String},
    supportEmail : {type:String},
    knowledge : {type:String},

    creditsRemaining: {
        type: Number,
        default: 10
    },

    creditsUsed: {
        type : Number,
        default : 0
    }
},{timestamps:true});

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingSchema);
export default Settings;