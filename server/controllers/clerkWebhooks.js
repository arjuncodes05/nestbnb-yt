import User from "../models/User.js";
import {Webhook} from "svix";

const clerkWebhooks = async(req, res) => {
    try {
        // create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // verifying headers
        // await whook.verify(JSON.stringify(req.body), headers);

        // const payload = req.body.toString();
        // await whook.verify(payload, headers);

        // gettingd data from request body
        // const {data, type} = req.body


        // ✅ req.body is a Buffer because of express.raw()
        const payload = req.body.toString("utf8");

        // ✅ verify BEFORE parsing JSON
        const event = whook.verify(payload, headers);

        // ✅ now event is trusted
        const { data, type } = event;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url
        }

        // switch case for differnt events
        switch (type) {
            case "user.created": {
                await User.create(userData)
                break;
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData)
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id)
                break;
            }
            default:
                break;
        }
        res.json({success: true, message: "Webhook Received"})
    } catch (error) {
        console.log("Error >> ", error);
        res.json({success: false, message: error.message})
    }
}

export default clerkWebhooks;