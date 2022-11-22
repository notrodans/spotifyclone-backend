import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { compare, genSalt, hash } from "bcrypt"
import { InjectModel } from "nestjs-typegoose"
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./artist.constants"
import { CreateUserDto } from "./dto/create-artist.dto"
import { ArtistModel } from "./models/artist.model"

@Injectable()
export class ArtistService {
	constructor(
		@InjectModel(ArtistModel)
		private readonly artistModel: ModelType<ArtistModel>
	) {}

	async create(dto: CreateUserDto) {
		const salt = await genSalt(10)
		const newUser = new this.artistModel({
			login: dto.login,
			email: dto.email,
			passwordHash: await hash(dto.password, salt)
		})
		return newUser.save()
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUser(email)
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
		}
		const isCorrectPassword = await compare(password, user.passwordHash)
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
		}
		return { email: user.email }
	}

	async findUser(email: string) {
		return await this.artistModel.findOne({ email }).exec()
	}
}
