##

Создна папка `public`, а в ней папка `avatars` для раздачи статики. Express
настроен на раздачу статических файлов из папки `public`.

В папке `public/avatars` лежит изображение и раздача статики работает. При
переходе по такому URL браузер отображает это изображение.

##

В схему пользователя добавлено новое свойство `avatarURL` для хранения
изображения. Использован пакет
[gravatar](https://www.npmjs.com/package/gravatar) для того чтобы при
регистрации нового пользователя сразу сгенерить ему аватар по его `email`.

##

При регистрации пользователя:

- Создается ссылка на аватарку пользователя с помощью
  [gravatar](https://www.npmjs.com/package/gravatar)
- Полученный URL сохранняется в поле `avatarURL` во время создания пользователя

##

Добавлена возможность обновления аватарки, создан эндпоинт `/users/avatars` и
использован метод `PATCH`.

- Создана папка tmp в корне проекта и в неё сохранена загруженная аватарка.
- Аватарка обработана пакетом [jimp](https://www.npmjs.com/package/jimp) и задай
  для нее размеры 250 на 250
- Аватарка перенесена пользователя из папки tmp в папку `public/avatars` и ей
  дано уникальное имя для конкретного пользователя.
- Полученный `URL` `/avatars/<имя файла с расширением>` сохранено в поле
  `avatarURL` пользователя
