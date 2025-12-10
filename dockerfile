FROM node:22-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build


FROM nginx:alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
