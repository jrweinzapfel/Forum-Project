export class ValidationError extends Error {
    validationErrors;
    constructor(validationErrors) {
        super('Validation Error');
        this.validationErrors = validationErrors;
        this.name = this.constructor.name;
    }
}
const errorHandler = async (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(400).json({ errors: err.validationErrors });
    }
    if (err.message === '404' || err.code === 'P2025') {
        res.status(404).json({ error: 'Resource not found' });
        return;
    }
    console.log('Error message', err.message);
    console.log('Error code', err.code);
    console.log('Error stack', err.stack);
    res.status(500).json({ error: 'Something went wrong' });
    return;
};
export default { errorHandler };
