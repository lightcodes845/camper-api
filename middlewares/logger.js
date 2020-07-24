//@desc logs request to console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}/${req.originalUrl}`.white.underline.bold);
    next();
};

module.exports = logger;
