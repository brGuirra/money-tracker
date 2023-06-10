###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.16.0-alpine3.17 As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/bin

RUN pnpm add -g dotenv-cli

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm prisma:generate

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.16.0-alpine3.17 As build

ENV NODE_ENV=${NODE_ENV}
ARG NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/bin

RUN pnpm add -g dotenv-cli

RUN pnpm build

RUN pnpm install --prod --ignore-scripts

USER node

FROM node:18.16.0-alpine3.17 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
