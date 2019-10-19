import marked from 'marked';
import * as hljs from 'highlight.js/lib/highlight';
import * as javascript from 'highlight.js/lib/languages/javascript';
import * as css from 'highlight.js/lib/languages/css';
import * as bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);

let tocObj = {
    toc: [],
    index: 0,
    add: function (text, level) {
        const anchor = `#toc${level}${++this.index}`;
        this.toc.push({ anchor: anchor, level: level, text: text });
        return anchor;
    },
    toHTML: function () {
        let levelStack = [];
        let result = '';
        const addStartUL = () => { result += '<ul>'; };
        const addEndUL = () => { result += '</ul>\n'; };
        const addLI = (anchor, text) => { result += `<li><a class="anchor-item" data-id="${anchor}" href="javascript:void(0);">${text}<a></li>`; };

        this.toc.forEach(function (item) {
            let levelIndex = levelStack.indexOf(item.level);
            // 没有找到相应level的ul标签，则将li放入新增的ul中
            if (levelIndex === -1) {
                levelStack.unshift(item.level);
                addStartUL();
                addLI(item.anchor, item.text);
            } else if (levelIndex === 0) {
                // 找到了相应level的ul标签，并且在栈顶的位置则直接将li放在此ul下
                addLI(item.anchor, item.text);
            } else {
                // 找到了相应level的ul标签，但是不在栈顶位置，需要将之前的所有level出栈并且打上闭合标签，最后新增li
                while (levelIndex--) {
                    levelStack.shift();
                    addEndUL();
                }
                addLI(item.anchor, item.text);
            }
        });
        // 如果栈中还有level，全部出栈打上闭合标签
        while (levelStack.length) {
            levelStack.shift();
            addEndUL();
        }
        // 清理先前数据供下次使用
        this.toc = [];
        this.index = 0;
        return result;
    },
};

export const formatByMarked = (mdStr) => {
    let rendererMD = new marked.Renderer();
    tocObj.toc = [];
    rendererMD.heading = function (text, level) {
        if (level <= 4) {
            const anchor = tocObj.add(text, level);

            return `<h${level} id=${anchor}>${text}</h${level}>`;
        }
    };
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code){return hljs.highlightAuto(code).value;}
    });

    return {
        content: marked(mdStr),
        tocHtml: tocObj.toHTML()
    };
};

export const getMonthDate = (date) => {
    let tempDate = new Date(date.replace(/\./g, '-'));
    let month = tempDate.getMonth() + 1;
    let day = tempDate.getDate();

    return `${month > 9 ? '' : '0'}${month}.${day > 9 ? '' : '0'}${day}`
};