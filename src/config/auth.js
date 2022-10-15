module.exports = {
    rounds:10,
    secretToken:process.env.JWT_SECRET,
    accessExpires:process.env.JWT_ACCESS_EXPIRE,
    refreshExpires:process.env.JWT_REFRESH_EXPIRE
}