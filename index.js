import {createRoot} from 'react-dom/client'

//clear the existing HTML content
document.body.innerHTML = '<div id=app></div>';

// Render your React component instead

const root = createRoot(document.getElementById("app"));

root.render(<h1>Hello,world</h1>);


