import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
    debugger;
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '15ms' })
} 

export const createRefreshToken = (payload) => {
    debugger;
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '7d' })
} 