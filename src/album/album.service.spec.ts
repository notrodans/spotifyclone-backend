import { AlbumService } from "./album.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("AlbumService", () => {
	let service: AlbumService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AlbumService]
		}).compile();

		service = module.get<AlbumService>(AlbumService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
