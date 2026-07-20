import fs from 'fs';

let html = fs.readFileSync('src/App.tsx', 'utf8');

const transforms = [
  '"transform": "translateX(-200%) translateY(10%) scale(0.8) rotate(-4deg)"',
  '"transform": "translateX(-100%) translateY(5%) scale(0.88) rotate(-2deg)"',
  '"transform": "none"',
  '"transform": "translateX(100%) translateY(5%) scale(0.88) rotate(2deg)"',
  '"transform": "translateX(200%) translateY(10%) scale(0.8) rotate(4deg)"'
];

const zIndexes = [3, 4, 10, 4, 3];
const overlayOpacities = [1, 1, 0, 1, 1];

// Find all hero cards in App.tsx. They all have `translateX(200%)` in raw.html initially.
let counter = 0;
html = html.replace(/"zIndex": "[0-9]+", "opacity": "1", "transform": "translateX\(200%\) translateY\(10%\) scale\(0\.8\) rotate\(4deg\)"/g, (match) => {
    if (counter >= 5) return match; // just in case
    
    let res = `"zIndex": "${zIndexes[counter]}", "opacity": "1", ${transforms[counter]}`;
    counter++;
    return res;
});

// For the background overlay opacities inside these cards:
let overlayCounter = 0;
html = html.replace(/<div className="absolute inset-0 bg-background\/50 backdrop-blur-\[1px\] pointer-events-none" style=\{\{"opacity": "1", \}\}/g, (match) => {
    if (overlayCounter >= 5) return match;
    let res = `<div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none" style={{"opacity": "${overlayOpacities[overlayCounter]}", }}`;
    overlayCounter++;
    return res;
});

fs.writeFileSync('src/App.tsx', html);
