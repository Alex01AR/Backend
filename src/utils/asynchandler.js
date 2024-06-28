// const asynchandler = () => {}



const asynchandler = (fn) => async (req, res, next) => {

    try
     {
        
        await fn(req, res, next)
    } 
    catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })

    }
}

// using promises 






// const asynchandler = (requesthandler) => {
//    return (res, req, next) =>
//          {
//         Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err))
    
//     }}

export  {asynchandler}
