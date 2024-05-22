import { Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AutenticationController } from './controllers/user/AutenticationController';
import { DetalheUserController } from './controllers/user/DetalheUserController';
import { isAutentication } from './middelwares/isAutentication';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';
import { CreateOrderController } from './controllers/Order/CreateOrderController';

import uploadConfig from './config/multer'
import { DeleteOrderController } from './controllers/Order/DeleteOrderController';

import { addItemController } from './controllers/Order/AddItemController';
import { RemoveItemController } from './controllers/Order/RemoveItemController';
import { AlgoController } from './controllers/Testes/algoController';
import { AlteraOrdemController } from './controllers/Order/AlteraOdermController';
import { ListOrderController } from './controllers/Order/ListOrderController';
import { DetalheOrderController } from './controllers/Order/DetalheOrderController';


const router = Router();

const  upload = multer(uploadConfig.upload("./tmp"));

router.post('/users', new CreateUserController().handle)
router.post('/login', new AutenticationController().handle)

router.get('/info', isAutentication, new DetalheUserController().hande)


router.post('/category', new CreateCategoryController().handle)

router.get('/category', new ListCategoryController().handle)

router.post('/product',  upload.single('file'), new CreateProductController().handle)

router.get('/product', new ListProductController().handle)

router.get('/product/cat', new ListProductController().Listcat)

router.get('/Order', new ListOrderController().handle)

router.post('/order', new CreateOrderController().handle)

router.put('/orderA', new AlteraOrdemController().handle)

router.put('/orderManda', new AlteraOrdemController().handleManda)


router.delete('/order', new DeleteOrderController().handle)

router.get('/order/detalhe', new DetalheOrderController().handle)


router.post('/addItem', new addItemController().handle )

router.delete('/item', new RemoveItemController().handle)



router.get('/Teste', new AlgoController().handle)

export { router };