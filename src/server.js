import express from 'express'
import cron from 'node-cron'
import axios from 'axios'
import { routes } from './http/routes/routes.js'
import { env } from './env/index.js'
export const app = express()
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json' assert { type: "json" };
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes)

cron.schedule('59 0-23 1-31 5 mon-tue-wed-thu-fri-sat-sun', () => {
    let hora = new Date
    console.log(`Executando rotina Programada...${hora.getHours()}:${hora.getMinutes()}`)
    axios.get(`${env.URL_SEND}`)
})

app.listen(4444, () => {
    console.log('HTTP server running at PORT: 4444')
})