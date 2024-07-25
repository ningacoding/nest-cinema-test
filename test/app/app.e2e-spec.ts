import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthConstants } from '../../src/constants/auth.constants';
import { AppModule } from '../../src/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'admin@dominio.com', password: 'admin' })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/movies (POST)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        name: 'Movie Name 1',
        coverImageUrl: 'https://picsum.photos/600',
        durationInMinutes: Math.round(Math.random() * 100),
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${AuthConstants.tokenAdmin}`)
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/movies/seats/purchase (POST)', () => {
    return request(app.getHttpServer())
      .post('/movies/seats/purchase')
      .send({
        movieFunctionId: 2,
        scheduledDate: '25-07-2024',
        seatsIds: [3],
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${AuthConstants.tokenAdmin}`)
      .expect(201)
      .expect('Content-Type', /json/);
  });

  afterAll(async () => {
    await app.close();
  });
});
