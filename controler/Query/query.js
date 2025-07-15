const { inquiryMail } = require('../../auth/mailer')
const Query = require('../../module/query')

exports.CreateQuery = async(req,res)=>{

    try {
        
    const query = await Query.create(req.body)

    // if(query){
        const mail = inquiryMail(req.body)
    // }

    query.save();

    res.status(200).json({isSuccess:true,message:'your query is send to the Astrologer we give you the response as soon as possible'})

    } catch (error) {
        res.status(400).json({isSuccess:false,error})
    }

}



