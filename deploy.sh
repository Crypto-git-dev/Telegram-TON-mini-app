#!/bin/bash

# Название ветки для деплоя
BRANCH="develop"

# Путь к проекту
PROJECT_DIR="/root/TONixHUB_frontend"

# Путь для сборки проекта
BUILD_DIR="/var/www/html"

# Убедитесь, что вы находитесь в правильной директории проекта
if ! cd "$PROJECT_DIR"; then
    echo "Директория $PROJECT_DIR не найдена"
    exit 1
fi

# Проверка наличия nvm и установка последней версии Node.js
if command -v nvm &> /dev/null; then
    echo "NVM установлен, обновление Node.js до последней версии"
    nvm install node
    nvm use node
else
    echo "NVM не установлен. Пожалуйста, установите NVM и повторите попытку."
    exit 1
fi

# Проверка наличия git
if ! command -v git &> /dev/null; then
    echo "Git не установлен. Пожалуйста, установите Git."
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
if ! git checkout "$BRANCH"; then
    echo "Не удалось переключиться на ветку $BRANCH"
    exit 1
fi

if ! git pull origin "$BRANCH"; then
    echo "Не удалось обновить ветку $BRANCH"
    exit 1
fi

# Установка зависимостей
echo "Установка зависимостей"
if [ -f package-lock.json ]; then
    if ! npm install; then
        echo "Не удалось установить npm-зависимости"
        exit 1
    fi
elif [ -f yarn.lock ]; then
    if ! yarn install; then
        echo "Не удалось установить yarn-зависимости"
        exit 1
    fi
else
    echo "Файл package-lock.json или yarn.lock не найден. Проверьте наличие файла и повторите попытку."
    exit 1
fi

# Сборка проекта
echo "Сборка проекта"
if ! npm run build; then
    echo "Сборка проекта завершилась неудачей"
    exit 1
fi

# Создание директории для сборки, если она не существует
if [ ! -d "$BUILD_DIR" ]; then
    echo "Создание директории $BUILD_DIR"
    if ! mkdir -p "$BUILD_DIR"; then
        echo "Не удалось создать директорию $BUILD_DIR"
        exit 1
    fi
fi

# Очистка директории для сборки
echo "Очистка директории $BUILD_DIR"
if ! rm -rf "$BUILD_DIR"/*; then
    echo "Не удалось очистить директорию $BUILD_DIR"
    exit 1
fi

# Копирование новой сборки
echo "Копирование новой сборки в $BUILD_DIR"
if ! cp -r "$PROJECT_DIR/build/"* "$BUILD_DIR"; then
    echo "Не удалось скопировать файлы в $BUILD_DIR"
    exit 1
fi

echo "Проект успешно задеплоен в $BUILD_DIR"
