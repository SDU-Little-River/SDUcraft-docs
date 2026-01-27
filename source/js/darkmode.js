function docsifyDarkSwitcher() {
    var element = document.querySelector('body');
    element.classList.toggle("docsify-dark-mode");

    if (element.classList.contains("docsify-dark-mode")) {
        localStorage.setItem('docsify-dark-mode', 'true');
    } else {
        localStorage.removeItem('docsify-dark-mode');
    }
}


function applyInitialMode() {
    if (localStorage.getItem('docsify-dark-mode') === 'true' ) {
        document.querySelector('body').classList.add("docsify-dark-mode");
    }
}

document.addEventListener('DOMContentLoaded', applyInitialMode);

function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
        return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css = `
:root {
    --dark-moon-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16'%3E%3Cpath fill='currentColor' d='M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786m1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678'/%3E%3C/svg%3E");
    --dark-sun-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16'%3E%3Cpath fill='currentColor' d='M8 12a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0-1.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326a.749.749 0 0 1 .215-.734l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0M8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0M3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8m13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8m-8 5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13m3.536-1.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061M2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.751.751 0 0 1-.018 1.042a.751.751 0 0 1-1.042.018l-1.06-1.06a.75.75 0 0 1 0-1.06Z'/%3E%3C/svg%3E");
}
button[onclick="docsifyDarkSwitcher()"] {
    border: none;
    cursor: pointer;
    width: var(--dark-icon-size);
    height: var(--dark-icon-size);
    background: var(--dark-moon-color);
    mask-image: var(--dark-moon-icon);
    mask-size: var(--dark-icon-size) var(--dark-icon-size);
    transition: var(--dark-icon-transition);
}
.docsify-dark-mode button[onclick="docsifyDarkSwitcher()"] {
    background: var(--dark-sun-color);
    mask-image: var(--dark-sun-icon);
}
.docsify-dark-mode .cover .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--dark-cover-background);
}
.docsify-dark-mode,
.docsify-dark-mode .sidebar,
.docsify-dark-mode .search input,
.docsify-dark-mode .app-nav li ul {
    background: var(--dark-base-background);
    color: var(--dark-base-color);
}
.docsify-dark-mode .markdown-section code,
.docsify-dark-mode .markdown-section pre,
.docsify-dark-mode .markdown-section p.tip code {
    background: var(--dark-code-background);
    color: var(--dark-code-color);
}
.docsify-dark-mode .markdown-section p.tip {
    background: var(--dark-tip-background);
}
.docsify-dark-mode .markdown-section p.warn {
    background: var(--dark-warn-background);
}
.docsify-dark-mode .anchor span {
    color: var(--dark-heading-color);
}
.docsify-dark-mode .sidebar ul li.active>a {
    color: var(--dark-theme-color);
    border-color: var(--dark-theme-color);
}
.docsify-dark-mode .sidebar ul li a, .docsify-dark-mode .markdown-section strong {
    color: var(--dark-base-color);
}
.docsify-dark-mode .markdown-section tr:nth-child(2n) {
    background-color: #3b3b3b;
}
@media screen and (min-width:769px) {
    .docsify-dark-mode .sidebar-toggle {
        background: rgb(0 0 0 / .6);
    }
}
`;
styleInject(css);

function install(hook, vm) {
    hook.ready(function () {
        // 创建主容器
        let bar = document.getElementById('fixed-action-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'fixed-action-bar';
            document.body.appendChild(bar);
        }

        // 创建设置面板（如果在 bar 里没有的话）
        let panel = document.getElementById('settings-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'settings-panel';
            bar.appendChild(panel);
        }

        // 创建 FAB 按钮
        let toggle = document.getElementById('settings-toggle-btn');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.id = 'settings-toggle-btn';
            // 使用简单的 SVG 齿轮图标
            toggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
            toggle.onclick = function(e) {
                e.stopPropagation();
                panel.classList.toggle('active');
            };
            bar.appendChild(toggle);

            // 点击外部关闭
            document.addEventListener('click', function(e) {
                if (!bar.contains(e.target)) {
                    panel.classList.remove('active');
                }
            });
        }

        // 添加深色模式行
        // 检查是否已经添加了防止重复
        if (!document.getElementById('dark-mode-row')) {
            const row = document.createElement('div');
            row.id = 'dark-mode-row';
            row.className = 'settings-row';

            const label = document.createElement('span');
            label.className = 'settings-label';
            label.textContent = document.documentElement.lang === 'zh' ? '深色模式' : 'Dark Mode';

            // 原有的按钮逻辑
            var btn = document.createElement('button');
            btn.setAttribute('onclick', 'docsifyDarkSwitcher()');
            btn.setAttribute('aria-label', "Toggle dark mode");
            btn.title = "Toggle dark mode";

            row.appendChild(label);
            row.appendChild(btn);
            panel.appendChild(row); // 放入面板
        }
    });
}

$docsify.plugins = [].concat(install, $docsify.plugins);