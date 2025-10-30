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

Event card — 使用的新类说明

下面是我们在 `EventCard.vue` 中替换原有 CSS 后使用的 Tailwind 类（以及它们的含义），便于向教学工作人员解释：

- cursor-pointer: 将鼠标指针变为手形，表示这是可点击的元素（交互提示）。
- border: 添加 1px 的默认边框（Tailwind 的简写）。
- border-gray-600: 将边框颜色设置为 Tailwind 的 gray-600（一个中深灰色）。
- p-4: 内边距为 1rem（16px），等同于 padding: 1rem。用于给卡片内容留白。
- w-64: 宽度为 16rem（通常为 256px），用于统一卡片宽度，使布局更整齐。
- mb-6: 底部外边距为 1.5rem（24px），用于卡片之间的垂直间距。
- hover:scale-101: 在鼠标悬停时，将元素的缩放设置为 1.01（轻微放大），使用的是我们在 `tailwind.config.ts` 中自定义的 `scale.101`。
- hover:shadow-sp: 在鼠标悬停时添加自定义投影 `sp`（我们在 `tailwind.config.ts` 中定义为 `0 3px 12px 0 rgba(0,0,0,0.2)`），用于产生浮起效果。

关于 hover 与自定义工具的说明：
- hover: 是 Tailwind 的状态变体（variant），表示当元素处于 :hover 状态时应用后续的工具。
- 我们通过在 `tailwind.config.ts` 的 `theme.extend` 中添加 `scale['101']` 与 `boxShadow['sp']` 来扩展 Tailwind 的工具集，这样可以直接在模板中使用 `hover:scale-101` 和 `hover:shadow-sp`，而不需要在组件内写额外的 CSS。

示例（从组件中摘取）：

<div class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-101 hover:shadow-sp">
	<!-- 卡片内容 -->
</div>

这使得样式更原子化、可复用，且更容易被 Tailwind 的编译器按需提取到最终的 CSS 文件中，减少冗余样式。