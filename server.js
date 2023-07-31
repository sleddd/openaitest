const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.static('public'), bodyParser.json());

 

const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPEN_API_KEY
}));

app.post('/chat', async (req, res)=> {   
    try {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: req.body.question}
          ]  
      });     
      res.status(200).json({message: resp.data.choices[0].message.content});
    } catch(e) {
        res.status(400).json({message: e.message});
    }
  })

app.listen(5000, ()=> {
    console.log("Server is active");
});

