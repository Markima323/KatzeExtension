let isDragging = false;
let container;
//TODO 无法拖拽bug
const chat=[
    "所有，或一无所有。",
    "朋友，用太久设备可不好，记得休息哦。",
    "有点无聊呢，要不要和我...",
    "筹码掉了，哈哈，我也有失手的时候。其实是光顾着看朋友，分心啦。",
    "又是头奖，理所应当的结果。",
    "如果朋友抽到头奖，会做什么？现在，有一个实现的机会。",
    "今天适宜买彩票，我打包票！",
    "不要总是看页面，看看我嘛。",
    "喵~",
    "朋友喜欢吃什么？我去订餐厅。",
    "匹诺康尼有家不错的店，想带朋友去，也许朋友不感兴趣...算啦。",
    "给朋友买了礼物，猜猜看，是什么~",
    "我是不是说了太多，打扰到朋友了？抱歉，因为一见到你，就忍不住分享最近的事。"
];

function init(){
    createElement();
    initDrag();
    talk();
};
function createElement(){
    //create container
    container=document.createElement('div');
    container.className='normalCon';
    //create pic
    const pic=document.createElement('img');
    pic.className='normalPic';
    pic.src=chrome.runtime.getURL('data/3.png');
    container.appendChild(pic);
    //create dialog
    const dialog=document.createElement('div');
    dialog.className='normalDialog';
    dialog.style.display='none';
    container.appendChild(dialog);

    document.body.appendChild(container);
};
//拖拽开始
function initDrag(){
    console.log("initdrag"+container);
    container.addEventListener('mousedown',startDragging);
    document.addEventListener('mousemove',handleDragging);
    container.addEventListener('mouseup',stopDragging);
    document.addEventListener('mouseup',stopDragging);
    document.addEventListener('mouseleave',stopDragging);
    document.addEventListener('blur',stopDragging);
    console.log("initdragend"+container);
};
function startDragging(e){
    console.log("start");
    isDragging=true;
    e.preventDefault();
    const rect=container.getBoundingClientRect();
    const currentX=rect.left;
    const currentY=rect.top;
    const offsetX=e.clientX-currentX;
    const offsetY=e.clientY-currentY;

    container.dataset.offsetX=offsetX;
    container.dataset.offsetY=offsetY;
};
function handleDragging(e){
    if (!isDragging) return;
    console.log("handle");
    const newX=e.clientX-parseFloat(container.dataset.offsetX);
    const newY=e.clientY-parseFloat(container.dataset.offsetY);

    const [clampedX,clampedY]=applyBoundaryConstraints(newX,newY);

    container.style.left=clampedX+'px';
    container.style.top=clampedY+'px';
};
function stopDragging(){
    isDragging=false;
    container.dataset.offsetX='';
    container.dataset.offsetY='';
    console.log("stop");
};
function applyBoundaryConstraints(x,y){
    const maxX=window.innerWidth-container.offsetWidth;
    const maxY=window.innerHeight-container.offsetHeight;
    return[
        Math.min(Math.max(0,x),maxX),
        Math.min(Math.max(0,y),maxY)
    ]
};
//拖拽结束

//对话开始
function talk(){
    let place=document.querySelector(".normalDialog")
    place.style.display='block';
//TODO创建对话框，将对话加入+设置时间，消除和更换
    let randomNum=Math.floor(Math.random()*chat.length);
    place.innerHTML=`<p style="text-align:center">${chat[randomNum]}</p>`
}
//对话结束
console.log('init');
init();