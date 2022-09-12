import { groupBy } from "ramda";

import { ApolloServer } from "apollo-server-micro";
import { DateTimeResolver } from "graphql-scalars";
import { NextApiHandler } from "next";
import {
  asNexusMethod,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import path from "path";
import cors from "micro-cors";

import prisma from "../../lib/prisma";

process.setMaxListeners(0);

const handler: NextApiHandler = async (req, res) => {
  return {};
};

export default cors()(handler);
