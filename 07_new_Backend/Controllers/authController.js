import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../Models/users.js';


// Controller function for user signup
const userSignup = async (req, res) => {
    try {
        const { username, password, phone_number, email, address, role } = req.body;

        // Validate user input
        const validation = signupValidation({ username, email, password });
        if (!validation.success) {
            return res.status(400).json({ error: validation.error });
        }

        // Check if username or email already exists
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Users({
            username,
            password: hashedPassword,
            email,
            phone_number,
            address,
            role
        });

        // Save user to database
        await newUser.save();

        // Remove sensitive information before sending response
        newUser.password = undefined;

        // Send success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function for user login
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await Users.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send success response with username and token
        res.status(200).json({ message: 'User signed in successfully', username: user.username, token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export { userSignup,userLogin};