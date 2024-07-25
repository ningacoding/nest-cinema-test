import 'reflect-metadata';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { ResponseSerializer } from '../serializers/response.serializer';
import { Serializer } from '../serializers/serializer';
import { PaginationType } from '../types/pagination.type';

export class SuperController {
  private static createInstance<A extends Serializer>(
    data: any,
    c: new (data: any) => A,
  ): A {
    return new c(data);
  }

  success(
    dataParam: any,
    clazz?: any,
    opts?: {
      req?: { originalUrl: string | URL };
      page?: PaginationType;
      bypassProps?: ResponseSerializer;
    },
  ): ResponseSerializer {
    let data: Record<string, any>;
    if (!!clazz) {
      if (Array.isArray(dataParam)) {
        data = [];
        for (const dat of dataParam) {
          data.push(classToPlain(SuperController.createInstance(dat, clazz)));
        }
      } else {
        data = classToPlain(SuperController.createInstance(dataParam, clazz));
      }
    } else {
      data = dataParam;
    }
    if (
      !!opts?.page &&
      typeof +opts?.page === 'number' &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      const url = new URL(opts?.req.originalUrl);
      url.searchParams.set('page', (+opts?.page || 1) + 1 + '');
      return {
        statusCode: 200,
        links: {
          next: url.toString(),
        },
        data,
      };
    } else {
      return { statusCode: 200, ...opts?.bypassProps, data };
    }
  }

  fail(message: string): ResponseSerializer {
    throw new BadRequestException({
      error: 'BadRequestException',
      statusCode: 400,
      message,
    });
  }

  error(e: any): ResponseSerializer {
    console.error(e);
    throw new InternalServerErrorException({
      error: 'InternalServerError',
      statusCode: 500,
      message: e.message,
    });
  }
}
