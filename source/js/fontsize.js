function adjustFontSize(action) {
    const markdownSection = document.querySelector('.markdown-section#main');
    let currentSize = parseFloat(window.getComputedStyle(markdownSection).fontSize);

    if (action === 'increase') {
        currentSize += 1;
    } else if (action === 'decrease') {
        currentSize -= 1;
    }

    markdownSection.style.setProperty('--font-size', `${currentSize}px`);
    updateFontSizeDisplay(currentSize);
    localStorage.setItem('font-size', currentSize);
}

function applyInitialStyles() {
    const savedSize = localStorage.getItem('font-size');
    if (savedSize) {
        const markdownSection = document.querySelector('.markdown-section#main');
        markdownSection.style.setProperty('--font-size', `${savedSize}px`);
    }
}

function updateFontSizeDisplay(fontSize) {
    const fontSizeDisplay = document.querySelector('.font-size-display');
    if (fontSizeDisplay) {
        fontSizeDisplay.textContent = `${fontSize}px`;
    }
}

document.addEventListener('DOMContentLoaded', applyInitialStyles);

var css = `
.markdown-section {
    --font-size: 15px;
    font-size: var(--font-size);
}

.markdown-section code {
    font-size: calc(var(--font-size) - 2px) !important;
}

.markdown-section ol, .markdown-section p, .markdown-section ul {
    line-height: calc(var(--font-size) * 2);
}

.markdown-section h1 {
    font-size: calc(var(--font-size) * 2.3);
}

.markdown-section h2 {
    font-size: calc(var(--font-size) * 2.1);
}

.markdown-section h3 {
    font-size: calc(var(--font-size) * 1.8);
}

.markdown-section h4 {
    font-size: calc(var(--font-size) * 1.5);
}

.markdown-section h5 {
    font-size: calc(var(--font-size) * 1.3);
}

.markdown-section h6 {
    font-size: calc(var(--font-size) * 1.1);
}

button.font-size-button {
    padding: 6px;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    color: #333;
}

.docsify-dark-mode button.font-size-button {
    color: var(--dark-base-color);
}

.font-size-display {
    background: transparent;
    color: #333;
}

.docsify-dark-mode .font-size-display{
    color: var(--dark-base-color);
}
`;

styleInject(css);

function install(hook, vm) {
    hook.ready(function () {
        // Ensure fixed-action-bar exists
        let bar = document.getElementById('fixed-action-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'fixed-action-bar';
            document.body.appendChild(bar);
        }

        // Ensure settings-panel exists
        let panel = document.getElementById('settings-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'settings-panel';
            bar.appendChild(panel);
        }

        const savedSize = localStorage.getItem('font-size') || 15;
        const lang = document.documentElement.lang;
        const fontSizeText = lang === 'zh' ? `${savedSize}px` : `${savedSize}px`;

        // Check if font size row already exists
        if (!document.getElementById('font-size-row')) {
            const row = document.createElement('div');
            row.id = 'font-size-row';
            row.className = 'settings-row';

            const label = document.createElement('span');
            label.className = 'settings-label';
            label.textContent = lang === 'zh' ? '字体大小' : 'Font Size';

            // Control group
            const group = document.createElement('div');
            group.className = 'font-control-group';

            var btnDec = document.createElement('button');
            btnDec.onclick = function() { adjustFontSize('decrease'); };
            btnDec.className = 'font-size-button';
            btnDec.setAttribute('aria-label', "Decrease font size");
            btnDec.title = "Decrease font size";
            btnDec.textContent = "A-";

            var display = document.createElement('div');
            display.className = 'font-size-display';
            display.id = 'font-size-display-text'; // Give it an ID for easier updates
            display.textContent = fontSizeText;
            display.style.display = 'block';

            var btnInc = document.createElement('button');
            btnInc.onclick = function() { adjustFontSize('increase'); };
            btnInc.className = 'font-size-button';
            btnInc.setAttribute('aria-label', "Increase font size");
            btnInc.title = "Increase font size";
            btnInc.textContent = "A+";

            group.appendChild(btnDec);
            group.appendChild(display);
            group.appendChild(btnInc);

            row.appendChild(label);
            row.appendChild(group);
            panel.appendChild(row);
        }
    });
}

$docsify.plugins = [].concat(install, $docsify.plugins);
