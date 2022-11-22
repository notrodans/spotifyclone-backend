import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	Res,
	UsePipes,
	ValidationPipe
} from "@nestjs/common"
import { Response } from "express"
import { ALREADY_REGISTERED_ERROR } from "../artist/artist.constants"
import { ArtistService } from "../artist/artist.service"
import { CreateUserDto } from "../artist/dto/create-artist.dto"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"

@Controller("auth")
export class AuthController {
	constructor(
		private readonly artistService: ArtistService,
		private readonly authService: AuthService
	) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: CreateUserDto) {
		const oldUser = await this.artistService.findUser(dto.email)
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		}

		return await this.artistService.create(dto) }

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() { login, password }: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { email } = await this.artistService.validateUser(login, password)
		const data = await this.authService.loginWithToken(email)
		res.cookie("token", data.accessToken)
		return data
	}
}
