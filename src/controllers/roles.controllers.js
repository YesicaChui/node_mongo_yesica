import roles from "../models/roles";
import { paginationFields, paginationResults } from "../helpers/pagination";

class RoleController {
    constructor() {
        this.model = roles;
    }

    async all(request, response) {
        try {
            const { page, per_page } = request.query;
            const { limit, offset } = paginationFields(page, per_page)
            const documents = await this.model.find({
                status:true
            })
                //.populate('users')
                .populate([
                    {
                        path:'users',
                        select:'-password -email'
                    }
                ])
                .limit(limit)
                .skip(offset);
            const count = await this.model.countDocuments();
            return response.status(200).json(
                paginationResults({ rows: documents, count }, page, per_page)
            );
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async createDocument(request, response) {
        try {
            const { name, code } = request.body;
            const document = this.model({
                name, code
            });
            await document.save();
            return response.status(201).json(document);
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async getByField(request, response) {
        try {
            const { code } = request.params;
            const document = await this.model.findOne({
                code,
            });
            return response.status(200).json(document);
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async updateDocument(request, response){
        try{
            const {code} = request.params;
            const {body} =request;
            await this.model.findOneAndUpdate(
                {code},
                {...body}
            );
            
            return response.status(200).json({
                message: `Role Update, Search -> ${code}`
            });

        }catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async deleteDocument(request, response){
        try{
            const {code} = request.params;           
            await this.model.findOneAndUpdate(
                {code,},
                {status:false}
            );
            
            return response.status(200).json({
                message: `Role Delete, Search -> ${code}`
            });

        }catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    }
}

export default RoleController;