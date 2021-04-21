module.exports = function (err, req, res, next) {
    if (err.name === "ValidationError") {
        const errors = Object.keys(err.errors);
        const errorsObj = {};
        for (let error of errors) errorsObj[error] = err.errors[error].message;
        return res.status(400).json({ errors: errorsObj });
    }

    console.log(err.stack);
    res.status(500).send("Something went wrong in our side!");
};
