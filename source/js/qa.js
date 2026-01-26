function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if ( !css || typeof document === 'undefined' ) { return; }

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
/* QA Plugin Styles */
:root {
    --qa-theme-color: #42b983; /* 默认主题色，会适应 darkmode 变量 */
    --qa-bg-light: #f9fafa;
    --qa-border-light: #eaecef;
    --qa-text-main: #34495e;
}

.qa-details {
    border: 1px solid var(--sidebar-border-color, var(--qa-border-light));
    border-radius: 8px;
    margin-bottom: 1.5em; /* 增加间距 */
    background-color: var(--content-bg-color, #fff);
    box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    transition: all 0.3s ease;
    overflow: hidden;
}

.qa-details[open] {
    box-shadow: 0 8px 16px rgba(0,0,0,0.08); /* 展开时加深阴影 */
    border-color: transparent; /* 展开时隐藏边框，强调阴影 */
}

.qa-summary {
    cursor: pointer;
    padding: 14px 18px;
    font-weight: 600;
    font-size: 1.05em;
    color: var(--qa-text-main);
    background-color: var(--qa-bg-light);
    position: relative;
    list-style: none; /* Hide default marker */
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s, color 0.2s;
    user-select: none;
    border-left: 4px solid transparent; /* 悬停时的左侧高亮条 */
}

/* Hide webkit marker */
.qa-summary::-webkit-details-marker {
    display: none;
}

.qa-summary:hover {
    background-color: #f0f2f4;
    color: var(--theme-color, var(--qa-theme-color));
    border-left-color: var(--theme-color, var(--qa-theme-color));
}

.qa-details[open] .qa-summary {
    background-color: #fff;
    border-bottom: 1px solid var(--qa-border-light);
    color: var(--theme-color, var(--qa-theme-color));
    border-left-color: var(--theme-color, var(--qa-theme-color));
}

/* Custom arrow icon (Right side) */
.qa-summary::after {
    content: '';
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    transition: transform 0.25s ease;
    margin-left: 10px;
    opacity: 0.7;
}

.qa-details[open] .qa-summary::after {
    transform: rotate(225deg); /* Arrow points up */
}

.qa-content {
    padding: 20px 24px;
    line-height: 1.7;
}

/* 优化内容中的加粗样式 (针对 "问题原因" "解决方法") */
.qa-content strong {
    color: var(--theme-color, var(--qa-theme-color));
    font-weight: 700;
    display: inline-block;
    margin-bottom: 4px;
}

/* Dark Mode Support */
.docsify-dark-mode .qa-details {
    border-color: rgba(255, 255, 255, 0.08); /* 更柔和的边框 */
    background-color: var(--dark-base-background, #222); /* 与背景融合 */
    box-shadow: none;
}

.docsify-dark-mode .qa-details[open] {
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    background-color: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.1);
}

.docsify-dark-mode .qa-summary {
    background-color: rgba(255, 255, 255, 0.04);
    color: var(--dark-base-color, #e0e0e0);
    border-left-color: transparent; /* Reset for dark mode default */
}


.docsify-dark-mode .qa-summary:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--dark-theme-color, var(--qa-theme-color));
    border-left-color: var(--dark-theme-color, var(--qa-theme-color));
}

.docsify-dark-mode .qa-details[open] .qa-summary {
    background-color: rgba(255, 255, 255, 0.02); /* 展开时背景 */
    border-bottom-color: rgba(255, 255, 255, 0.08);
    color: var(--dark-theme-color, var(--qa-theme-color));
}

.docsify-dark-mode .qa-content {
    color: var(--dark-base-color, #bbc0c4);
}

.docsify-dark-mode .qa-content strong {
    color: var(--dark-theme-color, var(--qa-theme-color));
}
`;

styleInject(css);

function install(hook, vm) {
    hook.beforeEach(function (content) {
        var codeBlocks = [];
        var tempContent = content.replace(/(`{3,})[\s\S]*?\1/gm, function(match) {
            codeBlocks.push(match);
            return '<!-- QA_CODE_BLOCK_' + (codeBlocks.length - 1) + ' -->';
        });

        tempContent = tempContent.replace(/::: qa\s+(.+?)\s*\n([\s\S]*?)\n:::/gm, function (match, title, body) {
            return `
<details class="qa-details">
<summary class="qa-summary">${title.trim()}</summary>
<div class="qa-content">

${body.trim()}

</div>
</details>
`;
        });

        var finalContent = tempContent.replace(/<!-- QA_CODE_BLOCK_(\d+) -->/gm, function(match, id) {
            return codeBlocks[parseInt(id)];
        });

        return finalContent;
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(install, window.$docsify.plugins || []);
