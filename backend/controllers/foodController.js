import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
// cloudinary.config({
//     cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
//     api_key: `${process.env.CLOUDINARY_API_KEY}`,
//     api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
// });

  // Configuration
  cloudinary.config({ 
    cloud_name: 'dpzphazs8', 
    api_key: '681862387852815', 
    api_secret: 'N-l1SHYceZHlVIMOzX4NmyDS5PA' // Click 'View API Keys' above to copy your API secret
});


// Add food item
const addFood = async (req, res) => {
    let image_filename;

    try {
        // Upload the image to Cloudinary`
        const result = await cloudinary.uploader.upload(req.file.path);
        image_filename = result.secure_url;  // Store the Cloudinary URL instead of a filename

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Extract the public_id from the Cloudinary URL
        const public_id = food.image.split('/').slice(-1)[0].split('.')[0];

        // Remove the image from Cloudinary
        await cloudinary.uploader.destroy(public_id);

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
