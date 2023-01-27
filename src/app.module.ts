import { ArtistModule } from "./artist/artist.module";
import { AuthModule } from "@auth/auth.module";
import { getMongoConfig } from "@config/mongoose.config";
import { FileModule } from "@file/file.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { ServeStaticModule } from "@nestjs/serve-static";
import { AlbumModule } from "@paths/album.module";
import { TrackModule } from "@track/track.module";
import { TypegooseModule } from "nestjs-typegoose";

// import * as path from "path";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		// ServeStaticModule.forRoot({
		// 	rootPath: path.join(__dirname, "uploads")
		// }),
		AuthModule,
		AlbumModule,
		TrackModule,
		FileModule,
		ArtistModule
	]
})
export class AppModule {}
