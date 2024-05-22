import { ListCategoryService } from "../ListCategoryService";
import prismaClient from "../../../prisma";

//mock de categoria
jest.mock("../../../prisma", () => ({
  __esModule: true,
  default: {
    category: {
      findMany: jest.fn(),
    },
  },
}));

describe("ListCategoryService", () => {
  let categoryList: ListCategoryService;

  beforeEach(() => {
    categoryList = new ListCategoryService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe("execute", () => {
    it("testarListaCategoria", async () => {
      (prismaClient.category.findMany as jest.Mock).mockResolvedValueOnce([
        { id: "categoriId", name: "Frutas" },
        { id: "categoriIZ", name: "Legumes" },
      ]);

      const result = await categoryList.execute();

      expect(result).toEqual([
        { id: "categoriId", name: "Frutas" },
        { id: "categoriIZ", name: "Legumes" },
      ]);
    });
  });


  

});
