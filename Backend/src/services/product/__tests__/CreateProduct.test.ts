import { CreateProductsService } from '../CreateProductsService';
import prismaClient from '../../../prisma';

// Mock do prismaClient para evitar chamadas reais ao banco de dados
jest.mock('../../../prisma', () => ({
  __esModule: true,
  default: {
    product: {
      create: jest.fn(),
    },
    category: {
      findFirst: jest.fn(),
    },
  },
}));

describe('CreateProductsService', () => {
  let createProductsService: CreateProductsService;

  beforeEach(() => {
    createProductsService = new CreateProductsService();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });


  it('should create a new product if all fields are valid and category exists', async () => {
    // Simula que a categoria existe no banco de dados
    (prismaClient.category.findFirst as jest.Mock).mockResolvedValueOnce({ id: 'validCategoryId' });

    // Simula a criação de um produto
    (prismaClient.product.create as jest.Mock).mockResolvedValueOnce({
      name: 'Test Product',
      price: '10.00',
      category_id: 'validCategoryId',
    });

    const result = await createProductsService.execute({
      name: 'Test Product',
      price: '10.00',
      description: 'Test description',
      banner: 'test.jpg',
      category_id: 'validCategoryId',
    });

    expect(result).toEqual({
      name: 'Test Product',
      price: '10.00',
      category_id: 'validCategoryId',
    });
  });


  it('should throw error when any field is empty', async () => {
    // Test case with empty fields
    const productDatan = { name: '',  price: 'kakak',  description: 'laosk', banner: 'test', category_id: 'kisd', };
    const productDatap = { name: 'laks',  price: '',  description: 'laosk', banner: 'test', category_id: 'kisd', };
    const productDatad = { name: 'skdj',  price: 'kakak',  description: '', banner: 'test', category_id: 'kisd', };
    const productDatab = { name: 'jsydh',  price: 'kakak',  description: 'laosk', banner: '', category_id: 'kisd', };
    const productDatac = { name: 'kydt',  price: 'kakak',  description: 'laosk', banner: 'test', category_id: '', };
     
   await expect(createProductsService.execute(productDatan)).rejects.toThrow('nome de categoria invalida');
   await expect(createProductsService.execute(productDatap)).rejects.toThrow('Preço de categoria invalida');
   await expect(createProductsService.execute(productDatad)).rejects.toThrow('Descrição de categoria invalida');
   await expect(createProductsService.execute(productDatab)).rejects.toThrow('banner de categoria invalida');
   await expect(createProductsService.execute(productDatac)).rejects.toThrow('id de categoria invalida');


  });



  it('should throw an error if the category does not exist', async () => {
    // Simula que a categoria não existe no banco de dados
    (prismaClient.category.findFirst as jest.Mock).mockResolvedValueOnce(null);

    await expect(createProductsService.execute({
      name: 'Test Product',
      price: '10.00',
      description: 'Test description',
      banner: 'test.jpg',
      category_id: 'invalidCategoryId',
    })).rejects.toThrow('referencia invalida');
  });
});
