// import jwt from 'jsonwebtoken'

// const auth = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]

//         let decodeData = jwt.verify(token,  process.env.JWT_SECRET )
//         req.userId = decodeData?.id

//         next()
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default auth


import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        // console.log(req.headers);
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' })
            
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Authorization header has an invalid format' })
        }
        let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodeData?.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Authorization failed' })
    }
}

export default auth
