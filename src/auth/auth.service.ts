import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ArtistService } from "../artist/artist.service"

@Injectable()
export class AuthService {
	constructor(
		private readonly artistService: ArtistService,
		private readonly jwtService: JwtService
	) {}

	async loginWithToken(emailAdress: string) {
		const { login, email } = await this.artistService.findUser(emailAdress)
		const payload = {
			user: {
				login,
				email
			}
		}
		return {
			accessToken: await this.jwtService.signAsync(payload)
		}
	}
}
