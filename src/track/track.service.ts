import { Injectable } from "@nestjs/common"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { ObjectId } from "mongoose"
import { InjectModel } from "nestjs-typegoose"
import { FileService, FileType } from "../file/file.service"
import { CreateTrackDto } from "./dto/create-track.dto"
import { TrackModel } from "./models/track.model"

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(TrackModel) private readonly trackModel: ModelType<TrackModel>,
		private readonly fileService: FileService
	) {}

	async create(dto: CreateTrackDto, audio: Express.Multer.File, picture: Express.Multer.File) {
		const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
		const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
		const track = await this.trackModel.create({
			...dto,
			listens: 0,
			audio: audioPath,
			picture: picturePath
		})
		return track
	}

	async getAll() {
		return await this.trackModel.find()
	}

	async getOne(id: ObjectId) {
		return await this.trackModel.findById(id)
	}

	async delete(id: ObjectId) {
		return await this.trackModel.findByIdAndDelete(id)
	}

	async listen(id: ObjectId) {
		const track = await this.trackModel.findById(id)
		track.listens += 1
		return await track.save()
	}
}
