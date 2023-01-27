import { ALREADY_REGISTERED_ERROR } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { CreateUserDto } from "./dto/create-artist.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ArtistService } from "@artist/artist.service";
import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	Res,
	UsePipes,
	ValidationPipe
} from "@nestjs/common";
import { Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly artistService: ArtistService
	) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: CreateUserDto) {
		const oldUser = await this.artistService.findByEmail(dto.email);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return await this.authService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() { login, password }: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { email } = await this.authService.validateUser(login, password);
		const tokens = await this.authService.createTokens(email);
		res.cookie("access", tokens.accessToken, {
			httpOnly: true
		});
		res.cookie("refresh", tokens.refreshToken, {
			httpOnly: true
		});
		return tokens;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("refresh")
	async getNewTokens(@Body() data: RefreshTokenDto, @Res({ passthrough: true }) res: Response) {
		const tokens = await this.authService.updateTokens(data);
		res.cookie("access", tokens.accessToken, {
			httpOnly: true
		});
		res.cookie("refresh", tokens.refreshToken, {
			httpOnly: true
		});
		console.log(tokens);
		return tokens;
	}
}
