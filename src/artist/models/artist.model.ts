import { Prop } from "@typegoose/typegoose"

export class ArtistModel {
	@Prop({ unique: true })
	login: string

	@Prop()
	email: string

	@Prop()
	passwordHash: string
}
