import ViewUI from 'view-design';

let cnt = 0;
let imported = [];

function importJs(path,onload) {
    if(imported.includes(path)){
        if(onload)onload();
        return;
    }
    function error() {
        console.error('加载js文件:['+path+']失败')
    }
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = path;
    if(onload)s.onload=onload;
    s.onerror=error;
    document.head.appendChild(s);
}

function loading() {
    ViewUI.Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'style': 'animation: ani-demo-spin 0.6s linear infinite;',
                    props: {
                        type: 'ios-loading',
                        size: 48
                    }
                }),
                h('h3', 'Loading')
            ])
        }
    });
}

function loadSuccess() {
    ViewUI.Spin.hide();
}

function message(type,msg) {
    ViewUI.Message[type]({
        background: true,
        content: msg,
        duration:5
    });
}

const TYPES={
    ERROR: 'error',
    INFO : 'info',
    SUCCESS : 'success',
    WARNING : 'warning',
    LOADING : 'loading',
}


export default {
    importJs,
    loading,
    loadSuccess,
    message,
    TYPES
}