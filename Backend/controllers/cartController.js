import Cart from "../models/Cart.js";

//Add item to cart 
export const addToCart=async(req,res)=>{
    try{
        const{userId, productId}=req.body;
        let cart = await Cart.findOne({userId});//search user cart from cart collection

        let item;
        if(!cart){
            cart = new Cart({userId,items:[
                {productId, quantity:1}
            ]});
        }else{
              item = cart.items.find(
                i=>i.productId.toString()===productId
              );

        if(item){
            item.quantity +=1;
        }else{
            cart.items.push({productId,quantity:1});
        }}

        await cart.save();//updated data save database
        res.json({
            message:'Item added to cart',
            cart
        })
    }catch(error){
        res.status(500).json({message:'Server Error',error});
        
    }
}

//Remove item from cart
export const removeItem = async(req,res)=>{
    try{
        const {userId, productId}=req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }

        cart.items=cart.items.filter(//filter same productid remove
            i=> i.productId.toString() !== productId
        )

        await cart.save();//update cart saved on db
        res.json({
            message:'Item removed from cart',
            cart
        });
    }catch(error){
         res.status(500).json({message:'Server Error',error});
    }
}

//Update item quantity in cart
export const updateQuantity= async(req,res)=>{
    try{
        const {userId,productId,quantity}=req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }
        const item = cart.items.find(
                i=>i.productId.toString()===productId
         );
         if(!item){
            return res.status(404).json({message:'Item not found in cart'});
         }

         item.quantity=quantity;
         await cart.save();
         res.json({
            message:'Item quantity updated',
            cart
         });
        }catch(error){
         res.status(500).json({message:'Server Error',error});
        }
}

//Get cart by userID
export const getCartByUserId= async(req,res)=>{
    try{
        const {userId}=req.params;
        const cart = await Cart.findOne({userId}).populate('items.productId');

        res.json(cart);
    }catch(error){
        res.status(500).json({message:'Server Error',error});
    }
}