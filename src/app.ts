import 'dotenv/config'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

//saluda al usuario al escribir hi, hello u hola
const welcomeFlow = addKeyword<Provider, Database>(['hi', 'hello', 'hola'])
    .addAnswer(`🙌 Hello welcome to this *Chatbot*`)
    
// funcion principal
const main = async () => {
    const adapterFlow = createFlow([welcomeFlow])
    
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    httpServer(+PORT)
}

main()
