## Monorepo Dockerfile Context

* install `Node:18.20.4`
* install `pnpm` globally
* set directory `/app`
* copy `pnpm-workspace.yaml` to container
* copy `pnpm-lock.yaml` to container
* copy `apps/package*.json` from local to container
* run `pnpm install`
* copy application `apps/frontend` to docker `./apps/frontend`
* expose ports to `3000`
* run cmd `["sh", "-c", "pnpm --filter ./apps/frontend dev"]`

## Codes
```yaml
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml ./

COPY pnpm-lock.yaml ./

COPY apps/frontend/package*.json ./apps/frontend/

COPY packages/eslint-config-custom/package*.json ./packages/eslint-config-custom/

RUN pnpm install

COPY apps/frontend ./apps/frontend

WORKDIR /app

EXPOSE 3000   
# EXPOSE 4000   # Node.js (Backend)

CMD ["sh", "-c", "pnpm --filter ./apps/frontend dev"]
```