# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application called "Pins" for tracking adventures, built with TypeScript, React 19, and using Bun as the runtime. The app uses Clerk for authentication, Drizzle ORM with PostgreSQL (Neon), and Tailwind CSS for styling.

## Development Commands

- `bun run dev` - Start development server (pulls Vercel env first)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run typecheck` - Run TypeScript type checking
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check formatting without fixing

## Database Commands

- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Drizzle Studio for database management

## Testing Commands

- `bun run test` - Run tests in watch mode
- `bun run test:run` - Run tests once
- `bun run test:ui` - Run tests with UI

## Architecture

### Authentication & Routing

- Uses Clerk for authentication with protected routes
- Middleware at `src/middleware.ts` protects all routes except sign-in/sign-up
- Route structure: `/sign-in`, `/sign-up` are public; all others require auth

### Layout Structure

- Root layout (`src/app/layout.tsx`) wraps entire app with ClerkProvider
- Core layout (`src/app/(core)/layout.tsx`) provides sidebar navigation using SidebarProvider
- App uses shadcn/ui components for consistent UI patterns

### Navigation System

- Navigation config in `src/config/navigation.ts` defines sidebar structure
- Supports both individual items and grouped navigation
- Navigation components in `src/components/sidebar/` handle rendering
- Currently empty navigationConfig array - ready for feature additions

### Database

- PostgreSQL database with Drizzle ORM
- Schema defined in `src/db/schema.ts`
- Uses Neon serverless database
- Example table structure provided as starting point

### Environment & Configuration

- Environment variables validated with Zod schemas
- Server env in `src/lib/env/server.ts`, client env separation
- Required vars: DATABASE_URL, NODE_ENV, CLERK_SECRET_KEY
- Uses dotenvx for local environment management

### Code Quality

- ESLint with TypeScript, Next.js, and import sorting rules
- Prettier for code formatting with Tailwind plugin
- Husky + lint-staged for pre-commit hooks
- Vitest for testing with jsdom environment

## Key Patterns

- TypeScript with strict typing throughout
- Consistent type imports using `type` keyword
- Component structure follows shadcn/ui patterns
- Database operations through Drizzle ORM
- Authentication state managed by Clerk

## Setup Requirements

Run `bun run setup` to link with Vercel for environment variables, then pull env with `bun x vercel env pull` before development.
