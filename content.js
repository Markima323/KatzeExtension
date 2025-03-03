let isDragging = false;
let img
function initDrag(){
    console.log('create');
    img=createImageElement();

    img.addEventListener('mousedown',startDragging);
    document.addEventListener('mousemove',handleDragging);
    document.addEventListener('mouseup',stopDragging);
}

function createImageElement(){
    console.log('pic');
    const element=document.createElement('img');
    element.className='normalPic';
    element.src=chrome.runtime.getURL('data/3.png');
    document.body.appendChild(element);
    console.log('图片地址:', element.src);
    return element
}

function startDragging(e){
    isDragging=true;
    const rect=img.getBoundingClientRect();
    const currentX=rect.right;
    const currentY=rect.bottom;
    const offsetX=e.clientX-currentX;
    const offsetY=e.clientY-currentY;

    img.dataset.offsetX=offsetX;
    img.dataset.offsetY=offsetY;
}

function handleDragging(e){
    if (!isDragging) return;
    const newX=e.clientX-parseFloat(img.dataset.offsetX);
    const newY=e.clientY-parseFloat(img.dataset.offsetY);

    const [clampedX,clampedY]=applyBoundaryConstraints(newX,newY);

    img.style.left=clampedX+'px';
    img.style.top=clampedY+'px';
}

function stopDragging(){
    isDragging=false;
}

function applyBoundaryConstraints(x,y){
    const maxX=window.innerWidth-img.offsetWidth;
    const maxY=window.innerHeight-img.offsetHeight;
    return[
        Math.min(Math.max(0,x),maxX),
        Math.min(Math.max(0,y),maxY)
    ]
}

console.log('init');
initDrag();