#!/bin/bash

# Название ветки для деплоя
BRANCH="develop"

# Путь к проекту
PROJECT_DIR="/root/frontend/TONixHUB_frontend"

# Путь для сборки проекта
BUILD_DIR="/var/www/html"

# Убедитесь, что вы находитесь в правильной директории проекта
cd "$PROJECT_DIR" || { echo "Директория $PROJECT_DIR не найдена"; exit 1; }

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

# Сборка проекта
echo "Сборка проекта"
npm run build || { echo "Сборка проекта завершилась неудачей"; exit 1; }

# Создание директории для сборки, если она не существует
if [ ! -d "$BUILD_DIR" ]; then
    echo "Создание директории $BUILD_DIR"
    mkdir -p "$BUILD_DIR" || { echo "Не удалось создать директорию $BUILD_DIR"; exit 1; }
fi

# Очистка директории для сборки
echo "Очистка директории $BUILD_DIR"
rm -rf "$BUILD_DIR"/* || { echo "Не удалось очистить директорию $BUILD_DIR"; exit 1; }

# Копирование новой сборки
echo "Копирование новой сборки в $BUILD_DIR"
cp -r "$PROJECT_DIR/build/"* "$BUILD_DIR" || { echo "Не удалось скопировать файлы в $BUILD_DIR"; exit 1; }

echo "Проект успешно задеплоен в $BUILD_DIR"
