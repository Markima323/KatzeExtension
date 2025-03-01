const img=document.createElement('img');
img.src=chrome.runtime.getURL('data/3.png');
img.className='normalPic';

document.body.appendChild(img);
