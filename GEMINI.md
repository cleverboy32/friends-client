# Friends Client Project Documentation

## Project Overview

A modern React web application built with **Vite** and **TypeScript**, designed for both web and mobile platforms via **Capacitor**. It focuses on social discovery and activity sharing.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7
- **State Management:** Zustand
- **Styling:** Tailwind CSS v4
- **API Client:** Axios (custom wrapper in `src/utils/request.ts`)
- **Mobile Integration:** Capacitor (iOS and Android support)
- **Map Services:** AMap (Ali Map) for location-based features.

## Core Architecture

- `src/App.tsx`: Main entry point and routing definition.
- `src/pages/`: Individual view components organized by feature (e.g., Discovery, Activity, User).
- `src/components/`: Shared UI components.
- `src/store/`: Zustand stores for global state management (e.g., user authentication, activity filtering).
- `src/api/`: Service-specific API modules using the shared axios instance.
- `src/utils/`: Helper functions and shared utilities.

## Key Features

- **Map Discovery:** Interactive map to find and filter social activities nearby.
- **Activity Management:** Creating, viewing, and participating in activities.
- **User Authentication:** Session-based (or token-based) auth managed via Zustand and stored in `localStorage`.
- **Responsive & Native:** Designed to be responsive for web and packaged as a native app via Capacitor.

## Development Conventions

- **State:** Use Zustand for shared state; avoid excessive prop drilling.
- **Styling:** Utilize Tailwind CSS for layout and design. Follow the v4 configuration in `tailwind.config.js`.
- **API Requests:** Always use the `request` utility in `src/utils/request.ts` to ensure consistent error handling and auth header management.
- **TypeScript:** Strict typing for API responses and component props is preferred.
