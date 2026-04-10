# Kapti - Headless CMS для каталога продуктов

Современное приложение на базе **Payload CMS** и **Next.js** для управления каталогом продуктов и контентом лендинга. Система включает полнофункциональную админ-панель и интеграцию с PostgreSQL.

## 📋 Содержание

- [Возможности](#возможности)
- [Технологический стек](#технологический-стек)
- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Коллекции данных](#коллекции-данных)
- [Разработка](#разработка)
- [Тестирование](#тестирование)
- [Развертывание](#развертывание)
- [Документация](#документация)

## ✨ Возможности

- 🌐 **Полная система управления контентом** - Payload CMS 3.81.0
- 📱 **Адаптивная админ-панель** - с русской локализацией
- 🛍️ **Управление каталогом** - категории и продукты
- 🖼️ **Управление медиафайлами** - встроенная система загрузки изображений
- 👥 **Аутентификация** - встроенная система пользователей
- 🔐 **Контроль доступа** - система ролей и прав доступа
- 📊 **API** - GraphQL и REST endpoints
- 🧪 **Автоматизированное тестирование** - E2E и интеграционные тесты
- 🐳 **Docker** - готовая конфигурация для контейнеризации
- 🚀 **TypeScript** - полная типизация кода

## 🛠️ Технологический стек

### Core
- **Framework**: Next.js 16.2.1 (App Router)
- **CMS**: Payload CMS 3.81.0
- **Language**: TypeScript 5.7.3
- **Runtime**: Node.js 18.20.2 или выше

### Backend
- **Database**: PostgreSQL
- **API**: GraphQL + REST
- **Rich Text**: Lexical Editor
- **Image Processing**: Sharp 0.34.2

### Frontend
- **Library**: React 19.2.4
- **Styling**: Tailwind CSS 4.2
- **Package Manager**: pnpm 10.33.0

### Testing
- **Unit/Integration**: Vitest 4.0.18
- **E2E**: Playwright 1.58.2
- **Component Testing**: React Testing Library 16.3.0

### Development
- **Linting**: ESLint 9.16.0
- **Formatting**: Prettier 3.4.2
- **Environment**: dotenv, tsx

## 📦 Требования

- Node.js: `^18.20.2` или `>=20.9.0`
- pnpm: `^9` или `^10`
- PostgreSQL: 12 или выше (или использовать Docker)
- Docker & Docker Compose (опционально)

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
# Клонируем репозиторий
git clone <repo-url>
cd kapti

# Устанавливаем зависимости
pnpm install
```

### 2. Конфигурация окружения

```bash
# Копируем пример переменных окружения
cp .env.example .env
```

Заполните `.env` необходимыми переменными:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kapti

# Payload
PAYLOAD_SECRET=your-secret-key-here

# Port
PORT=3000

# Seed (опционально)
PAYLOAD_SEED=true
```

### 3. Запуск с локальной БД (требует PostgreSQL)

```bash
# Запуск dev сервера
pnpm dev

# Откройте http://localhost:3000
```

### 4. Запуск с Docker (рекомендуется)

```bash
# Запуск PostgreSQL в контейнере
docker-compose up -d

# Обновите DATABASE_URL в .env (окружение уже настроено)
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kapti

# Запуск приложения
pnpm dev
```

### 5. Первый запуск

1. Откройте [http://localhost:3000](http://localhost:3000)
2. Перейдите на [http://localhost:3000/admin](http://localhost:3000/admin)
3. Следуйте инструкциям по созданию первого администратора
4. Начните добавлять категории и продукты

## 📁 Структура проекта

```
kapti/
├── src/
│   ├── app/                          # Next.js приложение
│   │   ├── (frontend)/               # Клиентская часть
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Главная страница
│   │   │   └── styles.css
│   │   └── (payload)/                # Payload админ-панель
│   │       ├── layout.tsx
│   │       ├── admin/
│   │       ├── api/
│   │       │   ├── [...slug]/route.ts
│   │       │   ├── graphql/route.ts
│   │       │   └── graphql-playground/route.ts
│   │       └── custom.scss
│   ├── collections/                  # Конфигурации коллекций
│   │   ├── Users.ts                  # Аутентификация
│   │   ├── Media.ts                  # Медиафайлы
│   │   ├── Categories.ts             # Категории продуктов
│   │   └── Products.ts               # Продукты
│   ├── seed/                         # Скрипты заполнения БД
│   │   ├── index.ts
│   │   ├── data/
│   │   ├── media/
│   │   └── scripts/
│   ├── payload.config.ts             # Конфигурация Payload CMS
│   └── payload-types.ts              # Автогенерируемые типы
├── tests/                            # Тесты
│   ├── e2e/                          # E2E тесты (Playwright)
│   ├── int/                          # Интеграционные тесты (Vitest)
│   └── helpers/                      # Утилиты для тестов
├── media/                            # Загруженные медиафайлы
├── docker-compose.yml                # Docker конфигурация
├── playwright.config.ts              # Плейграунд конфиг
├── vitest.config.mts                 # Vitest конфиг
├── next.config.ts                    # Next.js конфиг
├── tsconfig.json                     # TypeScript конфиг
└── package.json                      # Зависимости проекта
```

## 🗄️ Коллекции данных

### Users (Пользователи)
Встроенная аутентификация для админ-панели.
- **Email**: уникальный идентификатор
- **Пароль**: хешированное хранилище
- **Роли**: система управления доступом (опционально)
- **Timestamps**: дата создания и обновления

### Media (Медиа)
Встроенная система управления медиафайлами.
- **Изображения**: автоматическое масштабирование
- **Методанные**: размеры, тип файла, размер
- **Организация**: группировка по папкам
- **Sharp интеграция**: обработка изображений

### Categories (Категории)
Иерархия категорий для организации продуктов.
- **Название**: локализованное имя
- **URL (slug)**: автогенерируемый URL-адрес
- **Уникальность**: гарантия уникальности в системе

### Products (Продукты)
Полная информация о продуктах с детальными характеристиками.
- **Название продукта**: обязательное поле
- **Категория**: связь с категориями
- **Описание**: текст для сайта
- **Изображение**: связь с медиа
- **Характеристики**:
  - Вес продукта (г)
  - Количество в упаковке
  - Состав ингредиентов
  - Информация об аллергенах (глютен, орехи и т.д.)
  - Пищевая ценность (на 100г)
- **Timestamps**: дата создания и изменения

## 💻 Разработка

### Команды разработки

```bash
# Запуск dev сервера с hot reload
pnpm dev

# Безопасный запуск (очищает кэш)
pnpm devsafe

# Генерация типов после изменения схемы
pnpm generate:types

# Генерация import map для компонентов
pnpm generate:importmap

# Проверка TypeScript
pnpm tsc --noEmit

# Lint кода
pnpm lint

# Форматирование кода
pnpm prettier --write .
```

### Добавление новой коллекции

1. Создайте файл в `src/collections/`
2. Определите конфигурацию коллекции
3. Добавьте в `payload.config.ts`:

```typescript
import { MyCollection } from './collections/MyCollection'

export default buildConfig({
  collections: [Users, Media, Categories, Products, MyCollection],
  // ...
})
```

4. Запустите:
```bash
pnpm generate:types
```

### Персистентные переменные

Сохраняются в `.env.local` (не коммитится):
```env
# Переопределение переменных для локальной разработки
DATABASE_URL=postgresql://localhost/test
PAYLOAD_SECRET=local-dev-secret
```

## 🧪 Тестирование

### Запуск всех тестов

```bash
pnpm test
```

### Интеграционные тесты (Vitest)

```bash
# Запуск всех интеграционных тестов
pnpm test:int

# Запуск с watch режимом
pnpm test:int --watch

# Запуск определенного файла
pnpm test:int api.int.spec.ts
```

**Расположение**: `tests/int/`

### E2E тесты (Playwright)

```bash
# Запуск всех E2E тестов
pnpm test:e2e

# Интерактивный режим (UI)
pnpm test:e2e --ui

# Запуск определенного браузера
pnpm test:e2e --project=chromium

# Debug режим
pnpm test:e2e --debug
```

**Расположение**: `tests/e2e/`

**Примеры тестов**:
- `admin.e2e.spec.ts` - тесты админ-панели
- `frontend.e2e.spec.ts` - тесты фронтенда

**Вспомогательные функции** (`tests/helpers/`):
- `login.ts` - вход в систему
- `seedUser.ts` - создание тестовых пользователей

## 🏗️ Сборка и продакшн

### Сборка приложения

```bash
# Build для продакшна
pnpm build

# Запуск собранного приложения
pnpm start

# Для разработки
pnpm dev
```

### Оптимизация Node.js

Проект использует `NODE_OPTIONS` для оптимизации:
```bash
--no-deprecation          # Отключение предупреждений об устаревании
--max-old-space-size=8000 # Увеличение памяти для сборки
```

## 🐳 Развертывание с Docker

### Docker Compose (локально + продакшн)

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down

# Пересборка образов
docker-compose up -d --build
```

### Dockerfile

Предоставляет готовый образ для:
- Установки зависимостей
- Сборки Next.js приложения
- Запуска в продакшне

## 📚 Документация

### Внешние ресурсы
- [Payload CMS Docs](https://payloadcms.com/docs) - полная документация
- [Next.js Docs](https://nextjs.org/docs) - документация по Next.js
- [PostgreSQL Docs](https://www.postgresql.org/docs/) - документация БД
- [GraphQL Docs](https://graphql.org/learn/) - введение в GraphQL

### Коды ошибок и отладка

При проблемах с типами:
```bash
pnpm generate:types
```

При проблемах с компонентами:
```bash
pnpm generate:importmap
```

## 🔐 Безопасность

- Пароли хешируются с использованием bcrypt
- CSRF защита включена
- Контроль доступа на уровне коллекций и полей
- Переменные окружения в `.env.local` (не коммитится)
- SECRET_KEY требуется для PAYLOAD_SECRET

## 📝 Лицензия

MIT

## 👤 Автор

Создано с использованием Payload CMS

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
