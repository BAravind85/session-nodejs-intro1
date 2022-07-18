const UrlModel = require("../Models/urlModels");
const shortid = require("shortid");
const validUrl = require("valid-url");


const urlCreate = async function (req, res) {
    const { longUrl } = req.body;
  const baseUrl = "http://localhost:3001"

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await UrlModel.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new UrlModel({
          longUrl,
          shortUrl,
          urlCode        
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
};
    
const getUrl= async function (req, res){
    try{
        let url=req.params.urlCode;
        let findUrl=await UrlModel.findOne({url});
        if(findUrl){
            return res.status(400).json('Invalid URL');
        }    
    }catch(err){
        return res.status(500).json('Server error');
    }
}



module.exports = { urlCreate}