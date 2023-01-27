import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistModel } from "./models/artist.model";
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ArtistModel,
				schemaOptions: {
					collection: "Artist"
				}
			}
		])
	],
	controllers: [ArtistController],
	providers: [ArtistService],
	exports: [ArtistService]
})
export class ArtistModule {}
