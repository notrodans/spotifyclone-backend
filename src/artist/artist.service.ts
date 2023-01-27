import { ArtistModel } from "./models/artist.model";
import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class ArtistService {
	constructor(
		@InjectModel(ArtistModel)
		private readonly artistModel: ModelType<ArtistModel>
	) {}

	async findByEmail(email: string) {
		try {
			return await this.artistModel.findOne({ email }).exec();
		} catch (e) {
			return null;
		}
	}

	async findById(id: string) {
		try {
			return await this.artistModel.findById(id).exec();
		} catch (e) {
			return null;
		}
	}
}
