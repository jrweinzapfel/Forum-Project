import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);
const schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 5,
            maxLength: 30
        },
        email: {
            type: 'string',
            format: 'email'
        },
    },
    required: ['username', 'email']
};
const validate = ajv.compile(schema);
const validateAccount = (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
        res.status(400).json({
            error: 'invalid request body',
            details: validate.errors
        });
        return;
    }
    next();
};
export default { validateAccount };
