import { ArtistService } from "./artist.service";
import { USER_NOT_FOUND_ERROR } from "@auth/auth.constants";
import { JwtGuard } from "@guards/jwt.guard";
import {
	BadRequestException,
	Controller,
	Get,
	NotFoundException,
	Param,
	UseGuards
} from "@nestjs/common";

@Controller("artist")
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get("find/:id")
	async findById(@Param("id") id: string) {
		const user = await this.artistService.findById(id);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}
		return user;
	}

	@UseGuards(JwtGuard)
	@Get("me/:email")
	async findByEmail(@Param("email") email: string) {
		const user = await this.artistService.findByEmail(email);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}
		return user;
	}
}
