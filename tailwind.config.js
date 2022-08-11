/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/Header.js",
    "./components/Stories.js",
    "./components/Story.js",
    "./components/Feed.js",
    "./components/Post.js",
    "./components/Posts.js",
    "./components/Profile.js",
    "./components/Suggestions.js",
    "./components/Suggestion.js",
    "./components/Modal.js",
    "./pages/auth/signin.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
