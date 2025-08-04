import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';

describe('Todo API', () => {
  let server: any;

  beforeAll((done) => {
    server = app.listen(() => done());
  });

  let createdId: string;

  it('POST /api/todos → 생성', async () => {
    const res = await request(server)
      .post('/api/todos')
      .send({ title: '테스트 아이템' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('GET /api/todos → 목록 조회', async () => {
    const res = await request(server).get('/api/todos');
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/todos/:id → 업데이트', async () => {
    const res = await request(server)
      .put(`/api/todos/${createdId}`)
      .send({ title: '업데이트됨', done: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it('DELETE /api/todos/:id → 삭제', async () => {
    const res = await request(server).delete(`/api/todos/${createdId}`);
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
