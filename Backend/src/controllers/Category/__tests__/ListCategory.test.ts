
import { ListCategoryController } from "../ListCategoryController";
import { ListCategoryService } from "../../../services/Category/ListCategoryService";
import { CreateCategoryController } from "../CreateCategoryController";
import { CreateCategoryService } from "../../../services/Category/CreateCategoryService";
import { Request, Response  } from "express";



describe("ListCategoryController", () => {

  category: {
    create: jest.fn()
  }

  beforeEach(() => {
    jest.restoreAllMocks(); // Limpa todos os mocks antes de cada teste
});


  it("deve retornar uma lista de categorias", async () => {
    // Crie um mock para o serviço ListCategoryService
    const mockExecute = jest.fn().mockResolvedValue([
      { id: 1, name: "Categoria 1" },
      { id: 2, name: "Categoria 2" },
    ]);

    jest.spyOn(ListCategoryService.prototype, "execute").mockImplementation(mockExecute);

   const controller = new ListCategoryController();
    
    const req = {} as Request; // Simule a requisição
    const res = { json: jest.fn(), } as unknown as Response
        
    await controller.handle(req, res);
    
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Categoria 1" },
      { id: 2, name: "Categoria 2" },
    ]);
  });



/*  it("primeiro", async () => {
    // Crie um mock para o serviço ListCategoryService
    const mockExecute = jest.fn().mockResolvedValue({ name: "Categoria X" });
    
    jest.spyOn(CreateCategoryService.prototype, "execute").mockImplementation(mockExecute);

    const controller = new CreateCategoryController();
  

    const req = { body:{name:'Category X'}  } as Request; // Simule a requisição
    
    const res = { json: jest.fn(), } as unknown as Response
        
    await controller.handle(req, res);
    
    expect(res.json).toHaveBeenCalledWith({ name: "Categoria X" });

   
  });*/



  it(' segundo', async () => {
  

   const categoryController = new CreateCategoryService();

    await expect(categoryController.execute("")).rejects.toThrow("nome de categoria invalida" );
  });


  it(' segundoAA', async () => {
  
    const req = { body:{name:'Category X'}  } as Request; // Simule a requisição
    
    const res = { json: jest.fn(), } as unknown as Response

   // const mockExecute =  jest.fn().mockResolvedValue({id: '1' , name: 'Ferragem' });

    (CreateCategoryService.prototype.execute as jest.Mock).mockResolvedValue({id: '1' , name: 'Ferragem'});

    const categoryController = new CreateCategoryService();
    const controller = new CreateCategoryController();

    
    await controller.handle(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Nova Categoria" });
 
  //   await expect(categoryController.execute("Ferragem")).rejects.toThrow("categoria ja existe" );
   });




/*  it('terceiro', async () => {

  
    const req = { body:{name:'TABACO'}  } as Request; // Simule a requisição
    
    const res = { json: jest.fn(), } as unknown as Response


  //  const categoryController = new CreateCategoryService();


  //  await expect(categoryController.execute('Mapa')).toHaveBeenCalledWith({name:'Mapa'})


    const mockExecute = jest.fn().mockResolvedValue({ id: 1, name: "Nova Categoria" });

    jest.spyOn(CreateCategoryService.prototype, "execute").mockImplementation(mockExecute);

    const controller = new CreateCategoryController();

    await controller.handle(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Nova Categoria" });

  }) */
 



 


});
