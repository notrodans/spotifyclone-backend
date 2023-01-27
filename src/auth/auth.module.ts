import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.guard";
import { ArtistService } from "@artist/artist.service";
import { ArtistModel } from "@artist/models/artist.model";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		TypegooseModule.forFeature([
			{
				typegooseClass: ArtistModel,
				schemaOptions: {
					collection: "Artist"
				}
			}
		]),
		PassportModule,
		ConfigModule
	],
	controllers: [AuthController],
	providers: [AuthService, ArtistService, JwtStrategy]
})
export class AuthModule {}
