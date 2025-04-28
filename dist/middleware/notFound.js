const notFound = (req, res, next) => {
    res.status(404).json({ error: 'Route not found, check your request URL' });
    next();
};
export default notFound;
