const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passwordHasher = require('../lib/passwordHasher/passwordHasher')
const validator = require('../lib/validator/validator')
const bcrypt = require('bcryptjs')
const UsdLbpRate = require('../models/UsdLbpRate');

class AuthService {
    //This function validate the registration data
    validateRegistration(data) {
        //Email validation
        const email = data.email
        if (!validator.validateEmail(email)) {
            throw new Error("Invalid email");
        }

        //Password validation TODO !! it's currently disabled for development should be enabled later
        const password = data.password
        if (validator.validatePassword(password)) {
            throw new Error("Invalid password");
        }

        //Date of birth format validator
        const date_of_birth = data.date_of_birth
        if (!validator.validateDate(date_of_birth)) {
            throw new Error("Invalid date of birth. Date should be in the format: yyyy-mm-dd.")
        }

        //Date of join format validator
        const date_of_join = data.date_of_join
        if (!validator.validateDate(date_of_join)) {
            throw new Error("Invalid date of join. Date should be in the format: yyyy-mm-dd.")
        }
    }

    //This function register the user admin or salesman
    async register(data) {
        //Checking if email already exists
        const email = data.email;
        const user = await User.findOne({ where: { email } });

        if (user != null) {
            throw new Error("User with that email already exists.");
        }

        //Hashing the password using the passwordHasher class
        const hashedPassword = await passwordHasher.hashPassword(data.password);

        //Validating the registration
        this.validateRegistration(data)

        let newUser = await User.create({ ...data, password: hashedPassword });
        newUser = {
            "id": newUser.id,
            "first_name": newUser.first_name,
            "last_name": newUser.last_name,
            "phone_number": newUser.phone_number,
            "email": newUser.email,
            "date_of_birth": newUser.date_of_birth,
            "date_of_join": newUser.date_of_join,
            "blood_type": newUser.blood_type,
            "user_type_id": newUser.user_type_id,
        }
        return newUser;
    }

    //This function login the user
    async login(email, password) {
        //Finding the user for this email
        let user = await User.findOne({ where: { email } });

        //Checking if the user exists and his password is correct
        if (user && (await bcrypt.compare(password, user.password))) {

            //Creating a jwt token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const usdLbpRate = await UsdLbpRate.findOne({ where: { id: 1 } });

            user = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone_number": user.phone_number,
                "email": user.email,
                "date_of_birth": user.date_of_birth,
                "date_of_join": user.date_of_join,
                "blood_type": user.blood_type,
                "user_type_id": user.user_type_id,
                "usd_lbp_rate": usdLbpRate ? usdLbpRate.rate : null
            }
            return { user, token };
        }
        throw new Error('Invalid credentials');
    }

    //This function changes the user password
    async changePassword(userId, newPassword) {
        //Hashing the password using the passwordHasher class
        const hashedPassword = await passwordHasher.hashPassword(newPassword);
        let [rowsUpdated] = await User.update({ password: hashedPassword }, { where: { id: userId } });
        // Check if any rows were updated
        if (rowsUpdated > 0) {
            return { success: true, message: "Password changed successfully" };
        } else {
            return { success: false, message: "User not found or password not updated" };
        }
    }
}

module.exports = new AuthService();