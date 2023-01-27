import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("AlbumController", () => {
	let controller: AlbumController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AlbumController],
			providers: [AlbumService]
		}).compile();

		controller = module.get<AlbumController>(AlbumController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
