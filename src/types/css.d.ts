// Type declarations to allow importing CSS files
// - Global CSS side-effect imports: import "../styles/global.css";
// - CSS Modules default import: import styles from "./foo.module.css";

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css";
