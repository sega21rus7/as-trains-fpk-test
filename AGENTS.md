# Правила локального проекта

Эти правила действуют для всего репозитория и всех создаваемых в нём проектов.

## Технологии

- Использовать последние стабильные версии React, TypeScript и ESLint.
- Для сборки и локальной разработки использовать Vite.
- Писать компоненты React только как функциональные компоненты и использовать хуки.
- Для работы с формами использовать `react-hook-form`, включая регистрацию полей, валидацию, отправку и сброс состояния формы.
- Для каждого компонента объявлять тип пропсов и типизировать компонент через `React.FC<TProps>`:

```tsx
type TProps = {};

const Component: React.FC<TProps> = () => {};
```

- Для тестирования использовать Jest и React Testing Library.
- Для каждого React-компонента рядом с его файлом создавать тест с именем `Component.test.tsx` (например, для `TodoForm.tsx` — `TodoForm.test.tsx`).
- В тестах проверять поведение компонента с точки зрения пользователя: отображение, пользовательские действия, вызовы переданных колбэков и граничные состояния.
- Для взаимодействия с интерфейсом использовать запросы React Testing Library по доступным ролям, названиям и тексту; не привязывать тесты к CSS-классам и внутренней реализации компонента.
- Пользовательские действия выполнять через `@testing-library/user-event`, а `fireEvent` использовать только там, где это необходимо, например при работе с таймерами или отдельными DOM-событиями.
- Каждый тест должен быть независимым: очищать моки, таймеры, `localStorage` и другое изменяемое окружение в `beforeEach` или `afterEach`, если компонент с ним работает.
- Для Jest включать глобальную очистку моков через `clearMocks: true` в конфигурации и не дублировать `jest.clearAllMocks()` в каждом тесте.
- Для стилей использовать SCSS Modules.

## Структура проекта

Исходный код размещать в каталоге `src` со следующей структурой:

```text
src/
  components/
  pages/
  utils/
  styles/
  App/
```

## Документация

- Для каждого проекта создавать `README.md`.
- Описание проекта и инструкции в `README.md` писать на русском языке.

## Настройки VS Code

В каждом проекте создавать файл `.vscode/settings.json` со следующим содержимым:

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.tslint": "explicit",
    "source.fixAll.eslint": "explicit"
  }
}
```

## Команды package.json

В секцию `scripts` файла `package.json` добавлять следующие команды:

```json
{
  "start": "npm run dev",
  "dev": "vite --open",
  "build": "tsc --noEmit && vite build",
  "test": "jest",
  "test:coverage": "chmod +x jest/coverage.sh && jest/coverage.sh",
  "lint": "eslint --cache --ext=js,jsx,ts,tsx src",
  "lint:fix": "eslint --cache --ext=js,jsx,ts,tsx src --fix"
}
```
