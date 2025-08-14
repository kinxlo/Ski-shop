/**
 * Main types index file for the Ski Shop application
 *
 * This file imports all type definitions from the organized type files:
 * - core.d.ts: Core types and utilities
 * - auth.d.ts: Authentication types
 * - business.d.ts: Business domain types
 * - forms.d.ts: Form data types
 * - components.d.ts: Component prop interfaces
 * - legacy.d.ts: Legacy types for backward compatibility
 */

// Import all type files to make them globally available
import "./core";
import "./auth";
import "./business";
import "./forms";
import "./components";
import "./legacy";

// Export to make this a module
export {};
