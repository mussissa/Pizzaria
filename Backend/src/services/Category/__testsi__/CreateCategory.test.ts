import { CreateCategoryService } from "../CreateCategoryService";
import prismaClient from "../../../prisma";


jest.mock('../../../prisma', () => ({
    __esModule: true,
    default: {
      category: {
        create: jest.fn(),
        findFirst: jest.fn()
      },
  
    },
  })); 



describe('CreateCategory', ()=>{

    let categoryservico : CreateCategoryService;

    beforeAll(()=>{
        categoryservico = new CreateCategoryService();
    });


    afterAll(()=>{
        jest.clearAllMocks();
    })

      let name =''
   
       it('should throw error when name field is empty', async()=>{
          await expect(categoryservico.execute(name)).rejects.toThrow('nome de categoria invalida');
       }) 
        

        it('criar categoria', async ()=>{
            (prismaClient.category.findFirst as jest.Mock).mockResolvedValue({ id: 'validCategoryId' });

            await expect(categoryservico.execute('Mambo')).rejects.toThrow('categoria ja existe');
        })


   
})


