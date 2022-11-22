import { Module } from "@nestjs/common"
import { TypegooseModule } from "nestjs-typegoose"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { getMongoConfig } from "./config/mongoose.config"
import { AuthModule } from "./auth/auth.module"
import { TrackModule } from "./track/track.module"
import { AlbumModule } from "./album/album.module"
import { ArtistModule } from "./artist/artist.module"
import { FileModule } from "./file/file.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import * as path from "path"

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "static")
		}),
		ArtistModule,
		AuthModule,
		AlbumModule,
		TrackModule,
		FileModule
	]
})
export class AppModule {}
