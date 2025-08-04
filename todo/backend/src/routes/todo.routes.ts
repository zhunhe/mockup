import { Router } from 'express';
import { getAll, create, getById, update, remove } from '../controllers/todo.controller';

const router = Router();

/**
* @openapi
* /api/todos:
*  get:
*   summary: 전체 할 일 목록 조회
*   responses:
*    200:
*     description: 할 일 배열
*     content:
*      application/json:
*       schema:
*        type: array
*        items:
*         $ref: '#/components/schemas/Todo'
*/
router.get('/', getAll);

/**
* @openapi
* /api/todos:
*  post:
*   summary: 새 할 일 생성
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/TodoInput'
*   responses:
*    201:
*     description: 생성된 할 일
*     content:
*      application/json:
*       schema:
*        $ref: '#/components/schemas/Todo'
*/
router.post('/', create);

/**
* @openapi
* /api/todos/{id}:
*  get:
*   summary: 단일 할 일 조회
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*      description: Todo ID
*   responses:
*    200:
*     description: 단일 할 일
*     content:
*      application/json:
*       schema:
*        $ref: '#/components/schemas/Todo'
*/
router.get('/:id', getById);

/**
* @openapi
* /api/todos/{id}:
*  put:
*   summary: 할 일 업데이트
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   requestBody:
*    required: true
*    content:
*     application/json:
*     schema:
*      $ref: '#/components/schemas/TodoInput'
*   responses:
*    200:
*     description: 업데이트된 할 일
*     content:
*      application/json:
*       schema:
*        $ref: '#/components/schemas/Todo'
*/
router.put('/:id', update);

/**
* @openapi
* /api/todos/{id}:
*  delete:
*   summary: 할 일 삭제
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*       type: string
*   responses:
*    204:
*     description: 삭제 성공
*/
router.delete('/:id', remove);

export default router;
