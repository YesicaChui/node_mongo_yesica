import { Schema, model } from "mongoose";

//rol:Administrador ->Admin
const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
},
    {
        collection: "roles",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        toJSON:{
            virtuals:true,
        }
    }
);

schema.virtual('users',{
    ref:'users',
    localField:'code',
    foreignField:'role_code',
    justOne:false,
})

const roles = model("roles", schema);
export default roles;