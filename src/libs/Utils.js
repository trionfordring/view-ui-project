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

export default {
    importJs
}