
module.exports = function (req, res, next) {
    if (!req.user.isadmin) return res.status(403).send('acess denied');

    next();
}