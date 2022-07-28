/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 어디에서 tailwindcss가 사용되는지 알려준다.
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 다크모드를 컴퓨터에서 설정한 대로 한다(media)
  // 토글 버튼을 만들어 수동으로 만들고 싶다면(class)
  darkMode: "media",
  // form 들의 모양을 바꿔준다
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
