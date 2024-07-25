import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import configuration from '../../src/config/configuration';
import { UsersController } from '../../src/controllers/users.controller';
import { DatabaseModule } from '../../src/dababase/database.module';
import { CreateUserDto } from '../../src/dto/users/create-user.dto';
import Role from '../../src/entities/role.entity';
import User from '../../src/entities/user.entity';
import { AuthModule } from '../../src/modules/auth.module';
import { UsersService } from '../../src/services/users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should initialize required users', async () => {
    let count = await Role.count();
    if (count === 0) {
      await Role.bulkCreate([
        {
          id: 1,
          name: 'admin',
        },
        {
          id: 2,
          name: 'common',
        },
      ]);
      count = 2;
    }
    const adminUser = await User.findOne({
      attributes: ['id'],
      include: [
        {
          model: Role,
          attributes: ['id'],
        },
      ],
    });
    if (!adminUser) {
      const newUser = new CreateUserDto();
      newUser.roleId = 1;
      newUser.email = 'admin@dominio.com';
      newUser.password = 'admin';
      await usersController.create(newUser);
    }
    count++;
    expect(count).toEqual(3);
  });

  it('should create a new user', async () => {
    const newUser = new CreateUserDto();
    newUser.roleId = 2;
    newUser.email = `kuriel+${uuidv4()}@dominio.com`;
    newUser.password = 'abc';
    const result = await usersController.create(newUser);
    expect(result.id).toBeDefined();
  });
});
