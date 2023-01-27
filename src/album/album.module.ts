import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { Module } from "@nestjs/common";

@Module({
	controllers: [AlbumController],
	providers: [AlbumService]
})
export class AlbumModule {}
