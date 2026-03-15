function extractBearerToken(authHeader) {
    if (!authHeader) {
        return null;
    }

    return authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
}

module.exports = {
    extractBearerToken
};
