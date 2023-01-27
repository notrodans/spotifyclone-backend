import { AlbumService } from "./album.service";
import { Controller } from "@nestjs/common";

@Controller("album")
export class AlbumController {
	constructor(private readonly albumService: AlbumService) {}
}
