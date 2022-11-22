import { Module } from "@nestjs/common"
import { TrackService } from "./track.service"
import { TrackController } from "./track.controller"
import { TypegooseModule } from "nestjs-typegoose"
import { TrackModel } from "./models/track.model"
import { FileService } from "src/file/file.service"

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
