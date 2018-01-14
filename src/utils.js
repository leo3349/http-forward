exports.getClientIP = (req) => {
    return req ? (req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket?req.connection.socket.remoteAddress:null)) : null;
};