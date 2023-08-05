const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Configuration, OpenAIApi } = require("openai");
env.config();




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);




const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
});

app.use(limiter);
app.use(cors());

app.get("/",async (req, res) => {
 try {
   res.send("hello from Code Editor")
 } catch (error) {
    res.status(500).send('Something went wrong');
 }

});

app.post("/chat", async (req, res) => {

const {action,code,langauge}=req.body
console.log(langauge,req.body)
let prompt="hello this is code convertor"
if(action=="convert"){
prompt=`convert this code in ${langauge} language and give me only code as response ${code}`
}else if(action=="debug"){
    prompt=`debug this code and give me proper explaination with as response code is ${code}` 
}else if(action=="quality_check"){
    prompt=`improve the quality of this code and give me  code as response and proper explaination in short ${code}` 
}

    try {
        const response = await makeRequestWithRetry(async () => {
          return await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
        });
    // console.log(response)
        const newShayariText = response.data.choices[0].text;
        res.status(200).json({
          bot: newShayariText,
        });
    
      } catch (error) {
        console.error(error);
        res.status(500).send(error || 'Something went wrong');
      }
    });

app.listen(process.env.PORT || 9090, () => {
  console.log("listening");
});
const makeRequestWithRetry = async (requestFunction, retries = 5, delay = 3000) => {
    try {
      return await requestFunction();
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        console.warn('Rate limited. Retrying in ' + delay + 'ms...');
        await new Promise((resolve) => setTimeout(resolve, delay));
        return makeRequestWithRetry(requestFunction, retries - 1, delay * 2);
      } else {
        throw error;
      }
    }
  };
  