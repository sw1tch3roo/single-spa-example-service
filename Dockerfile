# syntax=docker/dockerfile:1.5
ARG DEPENDENCY_PROXY_IMAGE_PREFIX
FROM ${DEPENDENCY_PROXY_IMAGE_PREFIX}node:22-alpine3.19 AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .

ARG CI_COMMIT_BRANCH

RUN NODE_ENV=production pnpm build

ARG DEPENDENCY_PROXY_IMAGE_PREFIX
FROM ${DEPENDENCY_PROXY_IMAGE_PREFIX}nginx:1.27.0-alpine3.19-slim
WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]