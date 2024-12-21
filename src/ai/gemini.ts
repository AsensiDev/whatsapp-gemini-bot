import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "Actua como un comparador de precios profesional, el usuario te pedira cual es el rango de precios normal para pagar por un producto y tu deberes asesorarlo, respuestas de 20 palabras máximo:",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "funda iphone 15 silicona\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Para una funda de silicona para iPhone 15, espera pagar entre 10€ y 30€ por una de calidad, de marca reconocida puede llegar a 50€\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();