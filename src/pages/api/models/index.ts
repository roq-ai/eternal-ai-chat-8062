import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { modelValidationSchema } from 'validationSchema/models';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getModels();
    case 'POST':
      return createModel();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getModels() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.model
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'model'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createModel() {
    await modelValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.chat?.length > 0) {
      const create_chat = body.chat;
      body.chat = {
        create: create_chat,
      };
    } else {
      delete body.chat;
    }
    const data = await prisma.model.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
