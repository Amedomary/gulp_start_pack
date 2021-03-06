# Описание проекта (сборки)
### Технологии:
- **Gulp**
- Pug
- Less
- BemToPug
- js (jQ)

Предустановлены стили Desktop-first.  
Подключен шрифт Roboto.  
Готовые компоненты и стили оставлены для примера как наиболее используемые.  

# Быстрый старт
Запускаем `npm i` в корне и в `./src/js`  
Для разработки запускаем `gulp dev`  
Для продакшена запускаем `gulp build`  

# Старт проекта #
## Должно быть установлено ##
node.js - https://nodejs.org/ Последняя стабильная версия
python - https://www.python.org/ .exe

### gulp
```bash
$ npm install gulp-cli -g
$ npm install gulp -D
```

## Настройка окружения ###
```bash
$ cd src/js && npm i && cd ../..
$ npm i
```

## Как и где работаем ##
Вся работа ведется в src/  
src\template\base_layout.pug - Основной шаблон сайта  
src\gui.pug - Файл для отображений стайл-гайда

## Сборка ##
По дефолту сборка происходит в build/, вебсервер так же смотрит в эту папку.
Новая стр добавляется только при пересборке

### Основные команды ###
**Создание папки с стилями в bem-blocks** - создаёт стили (настрйока в default)
```bash
$ gulp create-style --name b-block-name
```

**Подключение миксинов инклюдами** - если падает с ненайденым комонентом
```bash
$ gulp addInc2pug
```

**Проверка js** - eslint
```bash
$ gulp eslint
```

**Создание переменной с цветов в variables** - присваивает название цвету
```bash
$ gulp color-create --color --ffffff
```

**Создаем шрифт из иконок**  
Размер svg для шрфита должен быть выполнен заливкой.
в папку добавляем svg файлы.  
/src/images/svg_for_icon/

# Решения проблем в проекте #
1. появилась проблема с бовером. У нас когда устанавливали пакеты не получалось определить зависисимость и один из пакетов не мог выбрать какую версию jquery использовать, при этом он не спрашивал и мы не могли принудительно задать ему ответ по версиям.
Для этого мы заранее прописали чтобы в любом случае у нас выбиралась последняя версия,прописав следующую команду `bower i —allow-root —force-latest`

2. Вторая проблема может появляться когда вам нужно установить много пакетов (к примеру если удалали папку бовер и очистили кеш). При очень большом обращении к серверу git нас выбрасывает, но определенное количество пакетов устанавливает и заносит в кеш, поэтому надо повторять команду пока не установит все пакеты.

3. Третья проблема - версия пакета может не подходить для проекта. http://joxi.ru/Vrw8deKIK64dem
сделать gulp -v
CLI version 3.9.1
Local version 4.0.0-alpha.2
видим что версию CLI надо обновить.
решается `npm install --global gulp-cli`

4. Четвертая проблема - в консоли появляется ошибка Error: EACCES: permission denied, open '/Users/USER/.config/configstore/bower-github.json'
You don't have access to this file. - Решается командой `sudo chown -R $USER:$GROUP ~/.config`

5. Версия пакета может не подходить для проекта.  
http://joxi.ru/Vrw8deKIK64dem  
Необходимо установить gulp 4  
https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/  

*Проверить версию*
```bash
$ gulp -v
```

*Видим что версию CLI надо обновить*
```bash
CLI version 3.9.1
Local version 4.0.0-alpha.2
```

*Решается*
```bash
$ npm install --global gulp-cli
$ gulp -v
```

*И видим*
```bash
CLI version 1.2.2
Local version 4.0.0-alpha.2
```

---------------------------------------------------------------------------------------
