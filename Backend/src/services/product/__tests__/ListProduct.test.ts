import prismaClient from "../../../prisma";
import { ListProductServices } from "../ListProductServices";







// Mock do prismaClient para evitar chamadas reais ao banco de dados
jest.mock('../../../prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
    },

  },
}));

describe('ListProductServices', () => {
  let listProductServices: ListProductServices;

  beforeEach(() => {
    listProductServices = new ListProductServices();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe('execute', () => {
    
    
    it('should return a list of products with name and price', async () => {
      // Mock do prismaClient para simular uma resposta
      (prismaClient.product.findMany as jest.Mock).mockResolvedValueOnce([
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
      ]);

      const result = await listProductServices.execute();

      expect(result).toEqual([
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
      ]);
    });
  });

  describe('executCat', () => {
    it('should return a list of products filtered by category_id', async () => {
      // Mock do prismaClient para simular uma resposta
      (prismaClient.product.findMany as jest.Mock).mockResolvedValueOnce([
        { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category_id: 'category_id_1' },
        { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category_id: 'category_id_2' },
      ]);

      const result = await listProductServices.executCat('category_id_2');

  
      expect(result[1]).toEqual(
        { id: 2, name: 'Product 2', price: 20, description: 'Description 2',category_id: 'category_id_2' },
      );
    });
  }); 








  

});











