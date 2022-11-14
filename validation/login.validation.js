const joi = require("joi");

const loginSchema = joi.object({
    email:joi.string().email().required().min(7).max(255).trim(),
    password:joi.string().required().min(8).max(255).trim()
});

const loginvalidation = (userData)=> {
    return loginSchema.validateAsync(userData);
}

module.exports = loginvalidation;