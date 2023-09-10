const User= require('../models/user')
const bcrypt = require('bcryptjs');
function isStringInvalid(string) {
    return string === undefined || string.length === 0;
}
exports.signup = async (req, res, next) => {
    try {
        const { name, email, phonenumber, password } = req.body;
        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phonenumber) || isStringInvalid(password)) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(401).json({ message: 'User already exists with this email address' });
        }
        await User.create({ name, email, phonenumber, password: hash });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
