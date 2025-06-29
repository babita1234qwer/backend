const { GoogleGenAI }=require('@google/genai');

const ai = new GoogleGenAI({ apiKey: "AIzaSyD3G8g0Sk44ghn4v_78hrEHtjIqtsgLRqs" });

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:msg,
  });
 return  response.text;
}

 module.exports=main;