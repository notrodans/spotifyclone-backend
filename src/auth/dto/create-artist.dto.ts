import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	login: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
