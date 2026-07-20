const fs = require('fs');

const appFile = fs.readFileSync('src/App.tsx', 'utf8');
const lines = appFile.split('\n');

const components = [
  { name: 'Navbar', start: 40, end: 51 },
  { name: 'Hero', start: 53, end: 171 },
  { name: 'Collection', start: 174, end: 423 },
  { name: 'Craft', start: 426, end: 496 },
  { name: 'Community', start: 499, end: 631 },
  { name: 'Journal', start: 634, end: 763 },
  { name: 'Faq', start: 766, end: 870 },
  { name: 'Contact', start: 873, end: 910 },
  { name: 'Footer', start: 912, end: 1026 }
];

components.forEach(comp => {
  // Line numbers are 1-based, so subtract 1 for array index
  const compLines = lines.slice(comp.start - 1, comp.end);
  const code = `export default function ${comp.name}() {
  return (
    <>
      ${compLines.join('\n      ')}
    </>
  );
}
`;
  fs.writeFileSync(`src/components/${comp.name}.tsx`, code);
});

const imports = components.map(c => `import ${c.name} from './components/${c.name}';`).join('\n');
const tags = components.map(c => `      <${c.name} />`).join('\n');

const newApp = `
${imports}

export default function App() {
  return (
    <div className="lenis lenis-scrolling">
${tags}
    </div>
  )
}
`;

fs.writeFileSync('src/App.tsx', newApp.trim());
