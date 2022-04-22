const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const bangla = 'ক, খ, গ, ঘ, ঙ,চ, ছ, জ, ঝ, ঞ,ট, ঠ, ড, ঢ, ণ,ত, থ, দ, ধ, ন,প, ফ, ব, ভ, ম,য, র, ল, শ, ষ, স, হ, ড়, ঢ়, য'

const alphabet = katakana+latin+nums;

const canvas = document.getElementById('Matrix');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient.addColorStop(0, '#b00000');
// gradient.addColorStop(0.2, '#a68d00');
// gradient.addColorStop(0.4, '#096e02');
// gradient.addColorStop(0.6, '#7c007a');
// gradient.addColorStop(0.8, '#001c79');
gradient.addColorStop(1, 'magenta');
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');



class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.x = x;
        this.y = y;
        this.text = '';
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }

    draw(context){
        this.text = alphabet.charAt(Math.floor(Math.random()*alphabet.length))
        console.log(this.text + "   I am the text")
        context.fillStyle = '#0aff0a'
        context.fillStyle = gradient;
        context.fillText(this.text, this.x * this.fontSize, this.y* this.fontSize);

        if (this.y * this.fontSize> this.canvasHeight && Math.random() > 0.96){
            this.y = 0;
        }else {
            this.y +=1;
        }

    }
}


class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth= canvasWidth;
        this.canvasHeight= canvasHeight;
        this.fontSize = 20;
        this.symbols = [];
        this.columns = this.canvasWidth/this.fontSize;
        console.log(this.columns)
        this.#initialize()
    }

    #initialize(){
        for (let i =0; i<this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height){
         this.canvasWidth = width;
         this.canvasHeight = height;
         this.columns = this.canvasWidth/this.fontSize;
         this.symbols =[];
         this.#initialize();
    }


}


const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame = 1000/fps;
let timer =0;

console.log(effect)
//
function animate(timestamp){
    const delta = timestamp- lastTime;
    lastTime = timestamp;
    if (timer> nextFrame){
        ctx.fillStyle = 'rgba(0,0,0, 0.05)';
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol=>symbol.draw(ctx));
        timer =0;
    }else{
        timer +=delta;
    }

    requestAnimationFrame(animate)

}

animate(0)


window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
} )







