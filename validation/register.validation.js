const joi = require("joi");

const registerSchema = joi.object({
    name:joi.string().required().min(2).max(255).trim(),
    email:joi.string().email().required().min(7).max(255).trim(),
    password:joi.string().required().min(8).max(255).trim()
});

const registervalidation = (userData)=> {
    return registerSchema.validateAsync(userData);
}

module.exports = registervalidation;