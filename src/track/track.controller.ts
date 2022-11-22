import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { ObjectId } from "mongoose"
import { CreateTrackDto } from "./dto/create-track.dto"
import { TRACK_NOT_FOUND_ERROR } from "./track.constants"
import { TrackService } from "./track.service"

interface FileFieldsCreate {
	picture?: Express.Multer.File
	audio?: Express.Multer.File
}

@Controller("tracks")
export class TrackController {
	constructor(private readonly trackService: TrackService) { }

	@UsePipes(new ValidationPipe())
	@Post()
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: "picture", maxCount: 1 },
			{ name: "audio", maxCount: 1 }
		])
	)
	async create(@UploadedFiles() files: FileFieldsCreate, @Body("create") dto: CreateTrackDto) {
		const { picture, audio } = files
		if (!picture || !audio) {
			throw new HttpException(
				"Аудио или картинка не были загружены",
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
		return await this.trackService.create(dto, audio[0], picture[0])
	}

	@Get()
	async getAll() {
		const allTracks = await this.trackService.getAll()
		if (!allTracks.length) {
			throw new NotFoundException("Треки не были найдены")
		}
		return allTracks
	}

	@Get(":id")
	async getOne(@Param("id") id: ObjectId) {
		const track = await this.trackService.getOne(id)
		if (!track) {
			throw new NotFoundException(TRACK_NOT_FOUND_ERROR)
		}
		return track
	}

	@Delete("delete/:id")
	async delete(@Param("id") id: ObjectId) {
		const removeTrack = await this.trackService.delete(id)
		if (!removeTrack) {
			throw new NotFoundException(TRACK_NOT_FOUND_ERROR)
		}
		return removeTrack
	}

	@Post("listen/:id")
	async listen(@Param("id") id: ObjectId) {
		return await this.trackService.listen(id)
	}
}
