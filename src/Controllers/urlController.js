const UrlModel = require("../Models/urlModels");
const shortid = require("shortid");
const validUrl = require("valid-url");



const urlCreate = async function (req, res) {
    try{
        let reqbody=req.body;
    const { longUrl } = reqbody;

    if(!longUrl) return res.status(400).send({status: false, message: 'Long URL is mandatory'});
    const lUrlExists = await UrlModel.findOne({longUrl: longUrl});
    if(lUrlExists) return res.status(400).send({status: false, message: 'You have already shorten this URL'});

   
  const baseUrl = "http://localhost:3000";
  
          // Check base url
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).send('Invalid long url');
  }
  const url=shortid.generate();
 const obj={
    urlCode:url,
    longUrl:longUrl,
    shortUrl:baseUrl + "/" + url
 }
 await UrlModel.create(obj);

 let getObj= await UrlModel.findOne(obj).select({urlCode: 1, shortUrl: 1, longUrl: 1, _id: 0})
return res.status(200).send({status:true,data:getObj});

}catch(err){
    console.log(err);

    return res.status(500).send({status:false,message:err.message});

}
}


const getUrl=async function (req, res){
    try{
        let code=req.params.urlCode;
        let checkUrl=await UrlModel.findOne({urlCode:code});
        if(checkUrl){
            return res.status(302).redirect(checkUrl.longUrl);
            }else{
                return res.status(404).send({status:false,message:"URL Not found"});
            }
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}

module.exports = {urlCreate , getUrl}