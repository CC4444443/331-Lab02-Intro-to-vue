This file explains the Tailwind utility classes I used in the project, where I made changes, and how to run/demo.

Changes made (locations)
tailwind.config.ts: configured the content paths (./index.html, ./src/**/*.{vue,js,ts,jsx,tsx}).
postcss.config.cjs: enabled the tailwindcss and autoprefixer plugins.
src/assets/style.css: added and imported (in src/main.ts)
Contains:
@tailwind base;
@tailwind components;
@tailwind utilities;
Also merged the original custom styles (previously in src/style.css).
src/views/EventListView.vue: changed the event list container to use Tailwind utility classes (e.g., flex flex-col items-center p-8), and removed the separate .events CSS that was used before.
Other small adjustments: replaced styles for buttons/titles etc. with Tailwind classes (e.g., text-3xl, font-bold, bg-blue-500, mb-4).
Common Tailwind classes (used in the pages)
Below are commonly used classes grouped by category with short explanations (helpful for quick in-class/demonstration notes):

Spacing and sizing

p-8: padding: 2rem
mb-4: margin-bottom: 1rem
mt-2: margin-top: 0.5rem
px-4 / py-2: horizontal / vertical padding
w-full: width: 100%
max-w-3xl / max-w-2xl: maximum width constraints (useful for readable content width)
mx-auto: horizontal centering (left and right margin auto)
Layout

flex: display: flex
flex-col: flex-direction: column (vertical stacking)
items-center: align-items: center (center on the cross axis)
justify-between: justify-content: space-between
Typography and color

text-3xl: larger heading text size
font-bold: bold font
text-red-600: red text used for error messages
text-white: white text
Background and borders

bg-gray-100: light gray background (used for containers)
bg-blue-500: blue background (action buttons)
border: 1px solid border
rounded: small border radius (0.25rem)
Other

antialias / antialiased: font antialiasing (provided by Tailwind)