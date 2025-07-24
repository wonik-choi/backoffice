# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for managing free trial users in an educational platform. It follows Feature-Sliced Design (FSD) architecture with TypeScript, React Query, and cookie-based authentication.

## Development Commands

### Basic Commands
- `npm run dev` - Start development server
- `npm run fast` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest in watch mode

### Additional Tools
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook
- `npm run add` - Add new shadcn/ui components

## Architecture - Feature-Sliced Design (FSD)

The codebase follows strict FSD architecture with unidirectional dependency flow:

```
shared ← entities ← features ← widgets ← views ← app
```

### Layer Structure

#### `app/` - Application Layer
- Next.js App Router with route groups: `(certification)`, `(non-certification)`, `(script)`
- API routes for backend communication
- Global providers and layouts

#### `views/` - View Layer  
- Page-level components that orchestrate features and widgets
- Each view represents a complete page or screen
- Main views: `apply-free-trial`, `free-trial`, `home`, `login`, `register-free-trial`, `temp-free-trial`

#### `widgets/` - Widget Layer
- Complex UI components combining multiple features
- `drawer-term-layout`, `navigation` sidebar

#### `features/` - Feature Layer
- Business logic organized by use case
- Structure: `ui/`, `config/`, `models/`, `services/query/`
- Key features: authentication, free-trial management, export functionality

#### `entities/` - Entity Layer
- Domain models and repository interfaces
- Structure: `models/` (dtos, repository interfaces, enums), `services/` (implementations)
- Core entities: `free-trial-user`, `temp-user`, `authentication`, `promotion`

#### `shared/` - Shared Layer
- Reusable components: `components/ui/`, `components/atomics/`
- Libraries: HTTP clients (Ky), TanStack Query, error handling (Sentry)
- Utilities and hooks

## Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Zustand for client state, TanStack Query for server state
- **UI**: Radix UI components, Tailwind CSS, Framer Motion
- **Forms**: TanStack React Form with Zod validation
- **HTTP**: Ky for API calls
- **Testing**: Jest, Testing Library
- **Error Tracking**: Sentry

## Authentication System

Cookie-based session authentication with Next.js API routes as proxy:

- **Protected routes**: `/home`, `/free-trial`, `/temp-free-trial` (defined in `middleware.ts`)
- **Session management**: HttpOnly cookies with 30-day expiration
- **Flow**: Client → Next.js API → Backend server → Session cookie returned

### Authentication Flow
1. Login form validates with Zod schema
2. `usePostLogin` hook calls `/api/login`
3. API route proxies to backend and extracts session cookie
4. Middleware validates session presence for protected routes

## Data Management Patterns

### React Query Integration
- Query keys defined with `@lukemorales/query-key-factory`
- All server state managed through React Query
- Error handling with Sentry wrapper
- Prefetch strategies for table data

### Form Handling
- TanStack React Form for complex forms
- Zod schemas for validation in `config/schema.ts` files
- Form state management with Zustand stores

## Code Conventions

### Naming
- Directories: kebab-case (`free-trial-user`, `apply-free-trial`)
- React components: PascalCase (`FreeTrialTable.tsx`)
- Hooks: camelCase with `use` prefix (`usePostFreeTrialUser.ts`)
- React Query hooks: `use[Action][Entity][Purpose]` pattern

### Import Rules
- Use absolute imports with `@/` prefix
- Never import from higher layers to lower layers
- Each layer only imports from layers below it

### File Organization
- React Query hooks in `services/query/`
- Configuration in `config/` (query-keys, schemas, constants)
- Types and interfaces in `models/`
- UI components in `ui/`

## Common Development Patterns

### Creating New Features
1. Define in appropriate FSD layer
2. Create Zod schemas in `config/schema.ts`
3. Add query keys in `config/query-keys.ts`
4. Implement repository interface in entities layer
5. Create React Query hooks in `services/query/`
6. Build UI components in `ui/`

### Table Management
- Tables use React Table with server-side pagination
- Row expansion for detailed information
- Export functionality with CSV generation
- Filter and search capabilities

### Error Handling
- Sentry integration for error tracking
- `wrapperSentry` for async operations
- Error boundaries for React components
- Standardized error responses

## Testing Strategy

- Unit tests with Jest and Testing Library
- Test setup in `jest.setup.js` and `jest.config.js`
- Focus on hooks, utilities, and component behavior
- Mock external dependencies (API calls, etc.)

## Build and Deployment

- Production build optimized for Vercel
- Environment-specific configurations
- Sentry integration for production monitoring
- Analytics integration with Vercel Analytics