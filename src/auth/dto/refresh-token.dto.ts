import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
	@IsNotEmpty({ message: "Вы не установили токен" })
	@IsString({
		message: "Токен должен быть строкой"
	})
	refreshToken: string;
}
