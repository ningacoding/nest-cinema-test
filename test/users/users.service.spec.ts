import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../src/dababase/database.module';
import { UsersService } from '../../src/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', () => {
    expect(service).toBeDefined();
  });
});
