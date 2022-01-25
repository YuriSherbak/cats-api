FROM node:17

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

# копируем исходный код
COPY . .

EXPOSE 8080

RUN yarn install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
CMD [ "yarn", "start" ]