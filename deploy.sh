#!/bin/bash

# Название ветки для деплоя
BRANCH="develop"

# Название screen-сессии
SCREEN_NAME="front_site"

# Путь к проекту
PROJECT_DIR="/root/frontend/TONixHUB_frontend"

# Убедитесь, что вы находитесь в правильной директории проекта
if [ ! -d "$PROJECT_DIR/.git" ]; then
    echo "Директория $PROJECT_DIR не является Git-репозиторием или не содержит .git директорию"
    exit 1
fi

cd "$PROJECT_DIR" || { echo "Директория $PROJECT_DIR не найдена"; exit 1; }

# Проверка наличия git
if ! command -v git &> /dev/null; then
    echo "Git не установлен. Пожалуйста, установите Git."
    exit 1
fi

# Проверка наличия screen
if ! command -v screen &> /dev/null; then
    echo "Screen не установлен. Пожалуйста, установите Screen."
    exit 1
fi

# Проверка наличия npm или yarn
if ! command -v npm &> /dev/null && ! command -v yarn &> /dev/null; then
    echo "npm или yarn не установлены. Пожалуйста, установите npm или yarn."
    exit 1
fi

# Синхронизация с удаленным репозиторием и переключение на нужную ветку
echo "Переключение на ветку $BRANCH"
git fetch origin
git checkout $BRANCH || { echo "Не удалось переключиться на ветку $BRANCH"; exit 1; }
git pull origin $BRANCH || { echo "Не удалось обновить ветку $BRANCH"; exit 1; }

# Установка зависимостей
echo "Установка зависимостей"
if [ -f package-lock.json ]; then
    npm install || { echo "Не удалось установить npm-зависимости"; exit 1; }
elif [ -f yarn.lock ]; then
    yarn install || { echo "Не удалось установить yarn-зависимости"; exit 1; }
else
    echo "Файл package-lock.json или yarn.lock не найден. Проверьте наличие файла и повторите попытку."
    exit 1
fi

# Остановка предыдущей screen-сессии, если она существует
if screen -list | grep -q "$SCREEN_NAME"; then
    echo "Остановка предыдущей screen-сессии $SCREEN_NAME"
    screen -S "$SCREEN_NAME" -X quit
fi

# Запуск новой screen-сессии с билдом и запуском проекта
echo "Запуск проекта в новой screen-сессии $SCREEN_NAME"
screen -dmS "$SCREEN_NAME" bash -c "npm run build && npm run start"

# Проверка, что screen-сессия была успешно создана
sleep 2
if screen -list | grep -q "$SCREEN_NAME"; then
    echo "Проект успешно задеплоен и запущен в screen-сессии $SCREEN_NAME"
else
    echo "Не удалось создать screen-сессию $SCREEN_NAME"
fi
