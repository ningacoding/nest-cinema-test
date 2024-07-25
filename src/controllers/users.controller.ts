import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleEnum } from '../constants/role.enum';
import { Roles } from '../decorators/role.decorator';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { UpdateUserDto } from '../dto/users/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { token } = await this.authService.login({
      email: createUserDto.email,
      id: user.id,
      roleId: createUserDto.roleId,
    });
    return {
      token,
      ...user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @Get('/providers')
  findAllProviders() {
    return this.usersService.findAllProviders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.remove(id);
  }
}
