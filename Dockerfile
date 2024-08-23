FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app

# copy the pnpm workspace and lock files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# copy relevant packages
COPY apps/frontend/package*.json ./apps/frontend/
# COPY apps/backend/package*.json ./apps/backend/
COPY packages/eslint-config-custom/package*.json ./packages/eslint-config-custom/

# install dependencies using pnpm
RUN pnpm install

# copy application to docker
COPY apps/frontend ./apps/frontend
# COPY apps/backend ./apps/backend

WORKDIR /app

# ports
EXPOSE 3000   

# Start both the frontend and backend in development mode
CMD ["sh", "-c", "pnpm --filter ./apps/frontend dev"]