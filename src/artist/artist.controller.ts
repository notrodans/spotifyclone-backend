import { BadRequestException, Controller, Get, Param } from "@nestjs/common"
import { USER_NOT_FOUND_ERROR } from "./artist.constants"
import { ArtistService } from "./artist.service"

@Controller("artist")
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get("find/:email")
	async findByEmail(@Param("email") email: string) {
		const user = await this.artistService.findUser(email)
		if (!user) {
			throw new BadRequestException(USER_NOT_FOUND_ERROR)
		}

		return user
	}
}
