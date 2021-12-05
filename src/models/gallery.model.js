const mongoose= require('mongoose');

const gallerySchema= new mongoose.Schema({
    pictures:[{type:String,require:true}],
    user_id:{type:String,require:true},
}, {
    versionKey:false,
    timestamps:true,
})

module.exports=mongoose.model("gallery",gallerySchema);