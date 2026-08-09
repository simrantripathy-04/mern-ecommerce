import product from "../models/product.js"

//Create a add product
export const createProduct = async (req,res)=>{
    try{
        const Product = await product.create(req.body);
        res.json({
            message:'Product created successfully',
            Product
        })
    }catch(error){
        console.log(error);
        
        res.status(500).json({message:'Sever Error',error})
    }
};

//Get all products
export const getProducts =async(req,res)=>{
    try{
        const {search="", category=""}= req.query;
        let filter ={};

        const escapeRegax=(text)=>{
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$g");
        }
        if(search.trim()){
            filter.title={$regex:escapeRegax(search), $options:'i'};//search title without case sensitivity
        }
        if(category.trim()){
            filter.category=category;//filter by category
        }
        const products = await product.find(filter).sort({createdAt: -1});// Newest - Oldest data show(sort) Descennding order
        res.status(200).json(products);
    }catch(error){
        console.log(error);
        
        res.status(500).json({message:'Sever Error',error})
    }
};

//Update a product
export const updateProduct = async(req,res)=>{
    try{
        const updated = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument:"after"}//updated data show
        );
        res.json({
            message:'Product updated successfully'
        });
    }catch(error){
        res.status(500).json({message:'Sever Error',error:error.message})
    }
};

//Delete a product
export const deleteProduct = async(req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
        res.json({message:'Product deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Sever Error',error})
    }
}