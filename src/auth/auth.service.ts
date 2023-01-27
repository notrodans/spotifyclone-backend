import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./auth.constants";
import { CreateUserDto } from "./dto/create-artist.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ArtistService } from "@artist/artist.service";
import { ArtistModel } from "@artist/models/artist.model";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from "bcrypt";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(ArtistModel)
		private readonly artistModel: ModelType<ArtistModel>,
		private readonly artistService: ArtistService,
		private readonly jwtService: JwtService
	) {}

	async create(dto: CreateUserDto) {
		const salt = await genSalt(10);
		const newUser = new this.artistModel({
			login: dto.login,
			email: dto.email,
			passwordHash: await hash(dto.password, salt)
		});
		return newUser.save();
	}

	async validateUser(email: string, password: string) {
		const user = await this.artistService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return { email: user.email };
	}

	async createTokens(emailAdress: string): Promise<{ accessToken: string; refreshToken: string }> {
		const { email } = await this.artistService.findByEmail(emailAdress);
		const payload = {
			email
		};
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: "5m"
		});
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: "15d"
		});
		return {
			accessToken,
			refreshToken
		};
	}

	async updateTokens({
		refreshToken
	}: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
		if (!refreshToken) throw new UnauthorizedException("Пожалуйста зарегистрируйтесь");
		const result = await this.jwtService.verifyAsync(refreshToken);
		if (!result) throw new UnauthorizedException("Токен не валиден или истёк");
		const { email } = result;
		const user = await this.artistModel.findOne({ email });
		return await this.createTokens(user.email);
	}
}
