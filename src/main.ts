import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix("api")
	app.use(cookieParser())
	app.enableCors({ credentials: true, maxAge: 24 * 60 * 30, origin: true })
	await app.listen(5050)
}
bootstrap()
