// images.d.ts or declarations.d.ts

/**
 * TypeScript declaration for importing image and media files.
 * This tells TypeScript that when it encounters an import of these file types,
 * the imported value is a string (which is how React Native handles image assets
 * when bundled, often resulting in a URI string).
 */
declare module '*.png' {
  const content: any; // 'any' or 'number' is often used in React Native for the image module
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  // SVG imports are often handled as a React component if using a specific loader (e.g., react-native-svg-transformer)
  // For a basic setup, declaring it as 'any' or 'string' works.
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}
