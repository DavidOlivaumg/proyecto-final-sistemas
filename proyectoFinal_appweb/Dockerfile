
FROM node:18.19-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production


FROM nginx:alpine
COPY --from=builder /app/dist/proyecto-final-appweb/browser /usr/share/nginx/html


COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

