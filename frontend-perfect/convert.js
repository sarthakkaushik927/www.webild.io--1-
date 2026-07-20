import fs from 'fs';

let html = fs.readFileSync('raw.html', 'utf8');

// Extract only what is inside <div id="root">
const rootStart = html.indexOf('<div id="root">');
if (rootStart !== -1) {
    html = html.substring(rootStart + '<div id="root">'.length);
    html = html.trim();
    if (html.endsWith('</div>')) {
        html = html.substring(0, html.length - '</div>'.length);
    }
}

// Basic HTML to JSX conversions
html = html.replace(/class=/g, 'className=');
html = html.replace(/for=/g, 'htmlFor=');
html = html.replace(/autoplay=""/g, 'autoPlay={true}');
html = html.replace(/playsinline=""/g, 'playsInline={true}');
html = html.replace(/crossorigin=""/g, 'crossOrigin=""');
html = html.replace(/stroke-width=/g, 'strokeWidth=');
html = html.replace(/stroke-linecap=/g, 'strokeLinecap=');
html = html.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
html = html.replace(/aria-hidden="true"/g, 'aria-hidden={true}');
html = html.replace(/disabled=""/g, 'disabled={true}');
html = html.replace(/required=""/g, 'required={true}');

// Handle style strings to object
html = html.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styles = styleString.split(';').filter(s => s.trim() !== '');
    let objStr = '{';
    styles.forEach(s => {
        let [key, val] = s.split(':');
        if(!key || !val) return;
        key = key.trim();
        val = val.trim();
        
        // Always make things visible! If it was opacity 0, make it 1.
        if (key.toLowerCase() === 'opacity' && val === '0') {
            val = '1';
        }

        if (key.startsWith('--')) {
            // Keep exactly as is
        } else {
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        }
        objStr += `"${key}": "${val}", `;
    });
    objStr += '}';
    return `style={${objStr}}`;
});

// Fix style tags
html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (match, attrs, inner) => {
    return `<style${attrs} dangerouslySetInnerHTML={{__html: \`${inner.replace(/`/g, '\\`')}\`}}></style>`;
});

// Remove script tags
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Clean up auto-closing tags
const tagsToClose = ['img', 'input', 'br', 'hr', 'source', 'link', 'meta'];
tagsToClose.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
    html = html.replace(regex, `<${tag}$1 />`);
});

fs.writeFileSync('src/App.tsx', `
export default function App() {
  return (
    <div className="lenis lenis-scrolling">
      ${html}
    </div>
  )
}
`);
