import { Prop } from "@typegoose/typegoose"

export class TrackModel {
	@Prop()
	name: string

	@Prop()
	artist: string

	@Prop()
	listens: number

	@Prop()
	picture: string

	@Prop()
	audio: string
}
