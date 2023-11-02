export const errorResponserHandler = (err, req, res, next) => {
    // get error object at first, if no status code default 400 bad req
    const statusCode = err.statusCode || 400
    res.status(statusCode).json({
        message: err.message,
        //which line
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export const invalidPatHandler = (req, res, next) => {
    let error = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
};