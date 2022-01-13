# Cats-booking
#### Если мама не разрешает тебе заводить кошку, то ты можешь арендовать ее и подарить ей всю свою доброту и нежность :3
<img src="https://user-images.githubusercontent.com/62619317/149395713-ca611fe4-b4b8-44cc-a0db-f3735d40427f.jpg" width="750" >

### Какие функции реализованы в Cats-booking ?
* Получение различных списков котиков 
  *  Список всех котов
  *  Список забронированных котов
  *  Один кот
* Добавление котов в базу данных 
* Бронирование котиков (можно также и снять бронь с кота)
* Обновление котов
* Удаление котов

### Установка Cats-booking
Для для начала нужно скачать данный репозиторий, после чего использовать команды `npm install` и `yarn add` для установки всех пакетов, и `yarn start` для запуска.

### URL и методы
* `/cats`
  * Данный URL вызывает метод `welcome()`, который ничего не принимает и возвращает приветственное сообщение. 
  Пример вывода:
  
  ```
  [WElCOME FROM API OF CAT BOOKING, BRO!]
  ```
  
* `/cats/all`
  * Данный URL вызывает метод `getAll()`, который ничего не принимает и возвращает список всех котиков.  
  Пример вывода:
  
  ```
  [
    {
        "isReserved": false,
        "id": 1,
        "name": "Феликс",
        "age": null,
        "cost": 1000,
        "breed": {
            "breed_id": 1,
            "breed_name": "Британец"
        },
        "color": {
            "color_id": 1,
            "color_name": "Черный"
        },
        "image": {
            "id": 1,
            "url": "https://cats-images-from-api.s3.eu-central-1.amazonaws.com/dbf216a2-5692-4ef5-b0a8-01603e7f6f80-%245%3B8%3AA.png",
            "key": "dbf216a2-5692-4ef5-b0a8-01603e7f6f80-$5;8:A.png"
        }
    }
  ]
  ```
* `/cats/{id}`
  * Данный URL вызывает метод `getOneCat()`, который возвращает кота с соответствующим ID.  
  Пример вывода:
  ```
  {
      "isReserved": false,
      "id": 1,
      "name": "Феликс",
      "age": null,
      "cost": 1000,
      "breed": {
          "breed_id": 1,
          "breed_name": "Британец"
      },
      "color": {
          "color_id": 1,
          "color_name": "Черный"
      },
      "image": {
          "id": 1,
          "url": "https://cats-images-from-api.s3.eu-central-1.amazonaws.com/dbf216a2-5692-4ef5-b0a8-01603e7f6f80-%245%3B8%3AA.png",
          "key": "dbf216a2-5692-4ef5-b0a8-01603e7f6f80-$5;8:A.png"
      }
  }  
  ```
  
* `cats/all/reserved`
  * Данный URL вызывает метод `getReserveCat()`, который возвращает список забранированных котов. 
  ```
  []
  ```
* `cats/create`
  * Данный URL вызывает метод `createCat()`, который создает котика и добавляет его в БД.  
  Пример ввода:
  ```
  {
    "name": "Соня",
    "age": 1,
    "breed_name": "Беспородная",
    "color_name": "белый",
    "cost": 300  
  }
  ```
  Пример вывода:
  ```
  {
    "isReserved": false,
    "name": "Соня",
    "age": 1,
    "cost": 300,
    "breed": {
        "breed_id": 2,
        "breed_name": "Беспородная"
    },
    "color": {
        "color_id": 2,
        "color_name": "белый"
    },
    "id": 2
  }
  ```
  
* `cats/create/breed` и `cats/create/color`
  * Данные URL'ы вызывают методы createBreed() и createColor(), которые позволяют создать породу и цвет.  
  Примеры ввода:
  ```
  {
    "breed_name": "Сибирская"
  }
  ```
  ```
  {
    "color_name": "серый"
  }
  ```  
  Примеры вывода:
  ```
  {
    "breed_name": "Сибирская",
    "breed_id": 3
  }
  ```
  ```
  {
    "color_name": "серый",
    "color_id": 3
  }
  ```
* `cats/update/{id}`
  * Данный URL позволяет обновить данные внутри котика из БД с соответствующим ID.  
  (ВАЖНО! метод не позволит обновить сущность, если редактируемые порода и цвет котика не были созданы)  
  Пример ввода:
  ```
  {
    "cost": 200
  }
  ```  
  Пример вывода:
  ```
  {
    "isReserved": false,
    "id": 1,
    "name": "Феликс",
    "age": null,
    "cost": 200,
    "image": {
        "id": 1,
        "url": "https://cats-images-from-api.s3.eu-central-1.amazonaws.com/dbf216a2-5692-4ef5-b0a8-01603e7f6f80-%245%3B8%3AA.png",
        "key": "dbf216a2-5692-4ef5-b0a8-01603e7f6f80-$5;8:A.png"
    }
  }
  ```
  
* `cats/reserve/{id}` и `cats/unreserve/{id}
  * Данный URL вызывает метод reserveCat позволяет забронировать(снять бронь с) котика с соответствующим ID.  
  Пример вывода:
  ```
  {
    "isReserved": true,
    "id": 2,
    "name": "Соня",
    "age": 1,
    "cost": 300,
    "breed": {
        "breed_id": 2,
        "breed_name": "Беспородная"
    },
    "color": {
        "color_id": 2,
        "color_name": "белый"
    },
    "image": null
  }
  ```
* `cats/add_image/{id}`
  * Данный URL вызывает метод addImage, который позволяет добавить котику фотографию  
  Пример вывода
  ```
  {
    "url": "https://cats-images-from-api.s3.eu-central-1.amazonaws.com/8b37705a-856c-4de6-91e0-67861f77e6b7-%1157%20%3D0720%3D8O.png",
    "key":"8b37705a-856c-4de6-91e0-67861f77e6b7-57 =0720=8O.png",
    "id": 2
  }
  ```
* `cats/delete/{id}`
  * Данный URL удаляет котика из БД.  
  Пример вывода:
  ```
  {
    "raw": [],
    "affected": 1
  }
  ```
  
### Credits
* Фреймворк: NestJS
* ORM: TypeORM
* Совместимое S3 хранилище: AWS S3
  
