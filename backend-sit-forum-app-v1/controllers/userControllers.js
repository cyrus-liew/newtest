import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import User from "../models/User"
import { fileRemover } from "../utils/fileRemover";

const sanitize = require('mongo-sanitize');

//user register function
const registerUser = async (req, res, next) => {
    try {

        console.log('Request body:', req.body);
        const name = sanitize(req.body.name);
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);

        //check if email is valid
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email_regex.test(email)) {
            throw new Error("Email is not valid");
        }

        if(password.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }


        //check if user exist
        let user = await User.findOne({ email });
        // Log the result of the query
        console.log('Query result:', user);
        // if find the new user clash having same email in db record
        if (user) {
            // status 400 client error, such as malformed syntax or invalid request message framing.
            //return res.status(400).json({ message: "User have already register or exist" });
            throw new Error("User have already register or exist");
        }

        //create new user
        user = await User.create({
            name,
            email,
            password,
        });

        //send back
        //status 201 - request success 
        return res.status(201).json({
            _id: user._id,
            avater: user.avater,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),

        })

    }
    catch (error) {
        // status 500 server internal error
        //return res.status(500).json({message: "something went wrong"});
        next(error);

    }

};

//user login function
const loginUser = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        //user pass in email and password
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);

        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email_regex.test(email)) {
            throw new Error("Email is not valid");
        }

        console.log('Email type:', typeof email);
        console.log('Password type:', typeof password);

        //check if user exist
        let user = await User.findOne({ email });
        // Log the result of the query
        console.log('Query result:', user);


        //check if the user exits
        if (!user) {
            throw new Error("Invalid Email or Password");
        }

        //compare function return true / false
        if (await user.comparePassword(password)) {
            //if true send user data
            return res.status(201).json({
                _id: user._id,
                avater: user.avater,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                token: await user.generateJWT(),

            });
        } else {
            throw new Error("Invalid Email or Password");
        }
    } catch (error) {
        next(error);
    }
};

//user profile register
const userProfile = async (req, res, next) => {
    try {
        //req.user object is from authMiddleware
        let user = await User.findById(req.user._id);

        if (user) {
            return res.status(201).json({
                _id: user._id,
                avater: user.avater,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
                //no token user already login

            });
        } else {
            let error = new Error("User Not Found");
            error.statusCode = 404;
            next(error);
        }
    }
    catch (error) {
        next(error);

    }
}

const updateProfile = async (req, res, next) => {
    try {
        //get user id
        let user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("User not found");
        }

        user.name = sanitize(req.body.name) || user.name;
        user.email = sanitize(req.body.email) || user.email;

        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email_regex.test(user.email)) {
            throw new Error("Email is not valid");
        }
        if (sanitize(req.body.password) && req.body.password.length < 8) {
            throw new Error("Password length must be at least 8")
        }
        else if (sanitize(req.body.password)) {
            user.password = sanitize(req.body.password);
        }

        // if all pass the condition , save the user
        const updatedUserProfile = await user.save();

        res.json({
            _id: updatedUserProfile._id,
            avater: updatedUserProfile.avater,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token: await updatedUserProfile.generateJWT(),
        })

    }
    catch (error) {
        next(error);
    }
}

const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single('profilePicture');

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error("Unkown error occur when upload image" + err.message);
                next(error);
            } else {
                // if everything when smoothly
                if (req.file) {
                    let filename;
                    let updatedUser = await User.findById(req.user._id);
                    //set file name equal avater
                    filename = updatedUser.avater;
                    if(filename){
                        fileRemover(filename);
                    }
                    updatedUser.avater = req.file.filename;
                    await updatedUser.save();
                    res.json({
                        _id: updatedUser._id,
                        avater: updatedUser.avater,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJWT(),
                    });
                } else {

                    // if no file is being filled, reset it to empty 
                    let filename;
                    let updatedUser = await User.findById(req.user._id);

                    filename = updatedUser.avater;
                    updatedUser.avater = "";
                    await updatedUser.save();
                    fileRemover(filename);
                    res.json({
                        _id: updatedUser._id,
                        avater: updatedUser.avater,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token: await updatedUser.generateJWT(),
                    })

                }
            }
        });

    }
    catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        //take 2 fields from user input
        const {email, admin} = req.body;
        console.log(email);
        //get user email

        let user = await User.findOne({email:email});
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }
        //assign admin status
        user.admin = admin || user.admin;

        // if all pass the condition , save the user
        const updatedUserProfile = await user.save();

        res.json({
            _id: updatedUserProfile._id,
            avater: updatedUserProfile.avater,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token: await updatedUserProfile.generateJWT(),
        })

    }
    catch (error) {
        next(error);
    }
}

//get All User
const getAllUser = async (req, res, next) => {
    try {
        // Find all users
        const users = await User.find({});
        console.log(users);
        // Check if any users were found
        if (!users || users.length === 0) {
            const error = new Error("No users found");
            return next(error);
        }
        // Return user details as JSON
        return res.json(users);
    } catch (error) {
        next(error);
    }
};

export { registerUser, loginUser, userProfile, updateProfile, updateProfilePicture, getAllUser, updateUser };
