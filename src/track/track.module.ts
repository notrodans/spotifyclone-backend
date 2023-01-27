import { TrackModel } from "./models/track.model";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { FileService } from "@file/file.service";
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TrackModel,
				schemaOptions: {
					collection: "Track"
				}
			}
		])
	],
	controllers: [TrackController],
	providers: [TrackService, FileService]
})
export class TrackModule {}
