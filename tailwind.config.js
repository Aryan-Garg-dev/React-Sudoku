/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: [ "Playwrite FR Moderne", 'cursive' ],
        arcade: [ "Arcade Classic", 'system-ui' ],
        pacfont: [ "Pacfont", 'system-ui' ],
        crackman: [ "Crackman", "system-ui" ],
        zerovel: [ "Zero Velocity Brk", 'system-ui' ],
        dpcomic: [ 'Dp Comic', 'system-ui' ],
        roadrage: [ 'Road-Rage', 'system-ui' ],
        vista: [ 'Winter Vista', 'system-ui' ],
        punk: [ 'Punk-TypeWriter', 'system-ui' ],
        kghappy: ['Kg-Happy', 'system-ui'],
        komigo: ['komigo', 'system-ui'],
        santa: ['Santa-Beast', 'system-ui'],
        coffee: ['Coffee-Spark', 'system-ui'],
        copyduck: ['Copy-Duck', 'system-ui'],
        smart: ['Smartie-Caps', 'system-ui'],
        workforce: ['Workforce-Combine', 'system-ui'],
        mickey: ['Mickey-Mouse', 'system-ui'],
      },
    },
  },
  plugins: [],
}