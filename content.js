let isDragging = false;
let container;
const chat=[
    "给朋友买了礼物，猜猜看，是什么~",//一行极限
    "朋友，用太久设备可不好，要记得休息呀。",//二行开始
    "所有，或一无所有。",
    "有点无聊呢，要不要和我...",
    "筹码掉了，哈哈，我也有失手的时候。其实是光顾着看朋友，分心啦。",
    "又是头奖，理所应当的结果。",
    "如果朋友抽到头奖，会做什么？现在，有一个实现的机会。",
    "今天适宜买彩票，我打包票！",
    "不要总是看页面，看看我嘛。",
    "喵~",
    "朋友喜欢吃什么？我去订餐厅。",
    "匹诺康尼有家不错的店，想带朋友去，也许朋友不感兴趣...算啦。",
    "我是不是说了太多，打扰到朋友了？抱歉，因为一见到你，就忍不住分享。",
    "不知道你喜欢哪种口味的巧克力，只好都买啦。",
    "喵~喵喵~"
];

function init(){
    createElement();
    initDrag();
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
    dialog.style.background=`url(${chrome.runtime.getURL("data/dialog.png")}) no-repeat center/contain`;
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

//互动开始
function selectEvent(){
    let num=Math.random;
    if(num<=0.095){
        winGame();
        //talk();
    }else{
        winGame();
    }
};
function talk(){
    let place=document.querySelector(".normalDialog")
    place.style.display='block';
    let randomNum=Math.floor(Math.random()*chat.length);
    place.innerHTML=`<p style="text-align:center">${chat[randomNum]}</p>`
    setTimeout(()=>{place.style.display='none'},30000);
};
function winGame(){
    let place=document.querySelector(".normalDialog");
    place.style.display='block';
    place.innerHTML=`<p style="text-align:center">朋友，我们来玩场游戏吧。如果你赢了，可以问我要任何东西，什么都可以。</p>
                    <p>
                        <button class="buttonType agreeBtn">同意</button> 
                        <button class="buttonType refuseBtn">拒绝</button>
                    </p>`
    document.querySelector(".agreeBtn").addEventListener("click",agree);
    document.querySelector(".refuseBtn").addEventListener("click",refuse);
    setTimeout(()=>{refuse();},30000);
}
function agree(){
    console.log("agree");
    let place1=document.querySelector(".normalDialog");
    place1.innerHTML=`<p>好呀，那我们开始吧！</p>`
    //TODO加入投骰子
};
function refuse(){
    console.log("refuse");
    let place2=document.querySelector(".normalDialog");
    place2.innerHTML=`<p style="text-align:center">喔，可惜了，我还以为你会喜欢呢。算啦，也不是什么特别重要的事。</p>`
    setTimeout(()=>{place2.style.display='none'},30000);
};
//互动结束
console.log('init');
init();
//const Timer=setInterval(selectEvent,300000);
const Timer=setInterval(selectEvent,1000);