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

COPY packages/stylelint-config-custom/package.json ./packages/stylelint-config-custom/

COPY packages/ui/package.json ./packages/ui/
COPY package.json ./

# install dependencies using pnpm
RUN pnpm install

# copy application to docker
COPY apps/frontend ./apps/frontend
# COPY apps/backend ./apps/backend

WORKDIR /app/apps/frontend

# ports
EXPOSE 3000   

# Run the frontend in development mode using pnpm's filter optionmode
CMD ["pnpm", "dev", "--filter", "./apps/frontend"]