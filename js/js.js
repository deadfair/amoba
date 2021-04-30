

/*
function playertablemaker(dbplayer){
    var text=``;
    for(var i=0;i<dbplayer;i++){
    text= text+` 
        <div class="buttonpack"> 
            <div id="t${i+1}" class="button2">X</div>
            <div id="t${i+1}" class="button2">O</div>
            <p>player${i+1}</p>
            <div id="p${i+1}" class="button bblue">blue</div>
            <div id="p${i+1}" class="button bred">red</div>
            <div id="p${i+1}" class="button byellow">yellow</div>
            <div id="p${i+1}" class="button bblack">black</div>
            <div id="p${i+1}" class="button borange">orange</div>
            <div id="p${i+1}" class="button bpink">pink</div>
            <div id="p${i+1}" class="button bbrown">brown</div>
            <div class="playerstyle"id=player${i+1}>s</div>
        </div>`;
    }
// mindegyikre p1 p2... bekell kötni hogy onclick eseményre
    return text;
}
// vagy !! egy gomb a szín váltásnak 1 meg a x o csere.. 
function onclickallszinre(dbplayer){
    for(var i=0;i<dbplayer;i++){
        aktpack=document.querySelectorAll("#p"+(i+1));
        for(var j=0;j<aktpack.length;j++){
            aktpack[j].value=i;
        }
        for(var j=0;j<aktpack.length;j++){
            aktpack[j].onclick=(e)=>{
                console.log(e.target.innerHTML);
                console.log("#player"+(i+1));

                aktdoboz=document.querySelector("#player"+(Number(e.target.value)+1));
                aktdoboz.removeAttribute('class');
                aktdoboz.classList.add("playerstyle");
                aktdoboz.classList.add(e.target.innerHTML);

            }
        }
    }
}
function onclickalljelre(dbplayer){

}
// playertable.innerHTML=playertablemaker(3);
// onclickallszinre(3);
*/

class Player{
    szin;
    jel;
    id;
    constructor(szin,jel,id){
        this.szin=szin;
        this.jel=jel;
        this.id=id;
    }
};
class Playerek{
    playerek;
    playerekFelhasznált;
    
    constructor(szinek,jelek,idk){
        let playerek=[];
        let id=0;
        for(let i=0;i<szinek.length;i++){
            for(let j=0;j<jelek.length;j++){
                playerek[id]=new Player(szinek[i],jelek[j],idk[id]);
                id++;
            }
        }
        this.playerekFelhasznált=[playerek[0],playerek[3]];
        playerek[0]=null;
        playerek[3]=null;
        this.playerek=playerek;
    }

    removePlayer(){
        var ujplayerekFelhasznált=[];
        for (let i = 0; i < this.playerekFelhasznált.length-1; i++) {
            ujplayerekFelhasznált[i]=this.playerekFelhasznált[i];
        }
        this.playerek[this.playerekFelhasznált[this.playerekFelhasznált.length-1].id]=this.playerekFelhasznált[this.playerekFelhasznált.length-1];
        this.playerekFelhasznált=ujplayerekFelhasznált;
    }

    newPlayer(){
        for (let i = 0; i < this.playerek.length; i++) {
            if (!(this.playerek[i]===null || this.playerek[i]===undefined) ) {
                this.playerekFelhasznált[this.playerekFelhasznált.length]=this.playerek[i];
                this.playerek[i]=null;
                return;
            }
        }
    }
    
    getPlayerOfId(aktid){
        for (let i = 0; i < this.playerekFelhasznált.length; i++) {
            if(aktid===this.playerekFelhasznált[i].id){
            return i;
            }
        }
        return null;
    }
    
    getPlayerNext(aktplayer){
        var hova=this.getPlayerOfId(aktplayer.id) // playerekFelhasznált tömbbe az aktplayer.id indexe 
        var index=aktplayer.id+1;
        this.playerek[aktplayer.id]=aktplayer;
        while(this.playerek[index]===null || this.playerek[index]===undefined)
        {
            if(index>this.playerek.length){
                index=0;
            }else{
                index++;
            }            
        }
        this.playerekFelhasznált[hova]=this.playerek[index];
        this.playerek[index]=null;
    }
    
}


szinek=["black","blue","red","green","yellow","orange","pink","brown"];
jelek=['O','X'];
idk=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
playerek=new Playerek(szinek,jelek,idk);



minuszbotton=document.querySelector(".minuszbotton");

section2init2player();


function section2init2player(){
    let swap1=document.querySelector(".playercsere1");
    let aplayer1=document.querySelector(".aplayer1");
    let swap2=document.querySelector(".playercsere2");
    let aplayer2=document.querySelector(".aplayer2");

    aplayer1.innerHTML=playerek.playerekFelhasznált[0].jel;
    aplayer1.classList.add(playerek.playerekFelhasznált[0].szin);
    aplayer2.innerHTML=playerek.playerekFelhasznált[1].jel;
    aplayer2.classList.add(playerek.playerekFelhasznált[1].szin);
    
    swap1.onclick=()=>{
        playerek.getPlayerNext(playerek.playerekFelhasznált[0]);
        aplayer1.innerHTML=playerek.playerekFelhasznált[0].jel;
        aplayer1.removeAttribute('class');
        aplayer1.classList.add(playerek.playerekFelhasznált[0].szin);
        aplayer1.classList.add("aplayer1");
        aplayer1.classList.add("jelek");
    }
    swap2.onclick=()=>{
        playerek.getPlayerNext(playerek.playerekFelhasznált[1]);
        aplayer2.innerHTML=playerek.playerekFelhasznált[1].jel;
        aplayer2.removeAttribute('class');
        aplayer2.classList.add(playerek.playerekFelhasznált[1].szin);
        aplayer2.classList.add("aplayer2");
        aplayer2.classList.add("jelek");
    }
    minuszbotton.style.display = "none";

}
pluszbotton=document.querySelector(".pluszbotton");
pluszbotton.onclick=(e)=>{
    // ha nem üres akkor html kreálása
    var  div = document.createElement("div");
    var x=playerek.playerekFelhasznált.length+1;
    playerek.newPlayer();
    div.setAttribute("class","playerflex"); 
    div.setAttribute("id",`divid${x}`); 
    div.innerHTML=    `<h1>Player${x}:</h1>
                        <div class="playercsere${x} playercserex">swap</div>
                        <div class="aplayer${x} jelek ${playerek.playerekFelhasznált[x-1].szin}">
                        ${playerek.playerekFelhasznált[x-1].jel}</div>`;
    var element=document.getElementById("jatekosadas")
    element.appendChild(div); 
    if (x===playerek.playerek.length) {
        e.target.style.display = "none";
    }
    let swap=document.querySelector(`.playercsere${x}`);
    let aplayer=document.querySelector(`.aplayer${x}`);
    swap.onclick=()=>{
        playerek.getPlayerNext(playerek.playerekFelhasznált[x-1]);
        aplayer.innerHTML=playerek.playerekFelhasznált[x-1].jel;
        aplayer.removeAttribute('class');
        aplayer.classList.add(playerek.playerekFelhasznált[x-1].szin);
        aplayer.classList.add(`aplayer${x}`);
        aplayer.classList.add("jelek");
        console.log(playerek);

    }
    minuszbotton.style.display = "block";
}



minuszbotton.onclick=(e)=>{
    var x=playerek.playerekFelhasznált.length;
    if(x>2){
        playerek.removePlayer();
        var myobj = document.getElementById(`divid${x}`);
        myobj.remove();
    }
    if(playerek.playerekFelhasznált.length===2){
        e.target.style.display = "none";
    }
}
/*
minuszbotton.addEventListener("click", deletedivfgv(playerek.playerekFelhasznált.length-1));
function deletedivfgv(x){
    playerek.removePlayer();
    var myobj = document.getElementById(`divid${x}`);
    myobj.remove();
    minuszbotton.removeEventListener("click", deletedivfgv(x));
    minuszbotton.addEventListener("click", deletedivfgv(x-1));
}*/



gyoker=document.querySelector(".tabla");
x=10;
y=10;
function playervalidator(){

}
function playergenerator(){

}

gyoker.innerHTML=tablamake(x*y);

gombok=document.querySelectorAll(".x");
playertable=document.querySelector(".playertable");


akt=0; // => utolsó=akt-1
vanjel=false;


botton=document.querySelector(".boton");
//botton.onclick=()=>{}
    // plusz alaphejzetbeállitás
    
    


restart=document.querySelector(".restart");
menu=document.querySelector(".menu");
menu.onclick=(e)=>{

}
next=document.getElementById("nextplayer");
gyoztes=document.getElementById("gyoztes");

restart.onclick=()=>{
start();

}


for(let i=0;i<gombok.length;i++){
    gombok[i].onclick=(e)=>{
        if(!(e.target.innerHTML==="X" || e.target.innerHTML==="O" || e.target.innerHTML===" ")){
            
            for(let j=0;j<playerek.playerekFelhasznált.length;j++){
                if (akt%playerek.playerekFelhasznált.length==j) {
                    e.target.innerHTML=playerek.playerekFelhasznált[j].jel;
                    e.target.classList.add(playerek.playerekFelhasznált[j].szin);
                    adatok[Number(e.target.name)]=playerek.playerekFelhasznált[j].id;
                }
            }
            akt++;
            /*
            if (akt%playerek.playerekFelhasznált.length==0) {//ha egyenlő mint az i edik elem
                e.target.innerHTML=playerek.playerekFelhasznált[0].jel;
                akt++;
                e.target.classList.add(playerek.playerekFelhasznált[0].szin);
                adatok[Number(e.target.name)]=playerek.playerekFelhasznált[0].id;

            } else if(akt%playerek.playerekFelhasznált.length==1){
                e.target.innerHTML=playerek.playerekFelhasznált[1].jel;
                akt++;
                e.target.classList.add(playerek.playerekFelhasznált[1].szin);
                adatok[Number(e.target.name)]=playerek.playerekFelhasznált[1].id;

            }*/


            if(isWon()===true)
            {
                for(let j=0;j<gombok.length;j++){
                    if(!(gombok[j].innerHTML==="X" || gombok[j].innerHTML==="O")){
                        gombok[j].innerHTML=" ";
                    }
                }
                gyoztes.innerHTML=kovetkezoPlayer(akt-1).jel;
                gyoztes.classList.remove(kovetkezoPlayer(akt-1).szin);
                gyoztes.classList.add(kovetkezoPlayer(akt-1).szin);
            }
            if(isLose()===true){
                    // mindenki vesztett
            }else{
                next.innerHTML=kovetkezoPlayer(akt).jel;
                next.classList.remove(kovetkezoPlayer(akt-1).szin);
                next.classList.add(kovetkezoPlayer(akt).szin);
            }

        }

    }
}

function tablamake(meret){
    var text=``;
    for(var i=0;i<meret;i++){
        text= text +
        `<div class="elem"><div class="x"></div></div>`;
    }
        return text;
}


adatok=[];

function start(){
    for(let i=0;i<gombok.length;i++){
        gombok[i].removeAttribute('class');
        gombok[i].classList.add("x");
        
        gombok[i].name=i;  // adatok indexe
        adatok[i]=0;
        gombok[i].innerHTML="";
        gyoztes.innerHTML="";

        //gombok[i].value=i; // adatok értéke
    }
    next.innerHTML=playerek.playerekFelhasznált[0].jel;
    next.classList.remove(kovetkezoPlayer(akt).szin);
    akt=0;
    next.classList.add(playerek.playerekFelhasznált[0].szin);
}
start();

// x*x generálása: a divhez kötjük és ciklussal
function isWon(){
    return vizszintes() || fuggoleges() || keresztle() || keresztfel();
}
function isLose(akt){
    if(akt===x*y){
    return true;
    }
    return false;
}

function vizszintes(){
    for(var i=0;i<adatok.length;i++){
        if(adatok[i]!==0){
            if((i+5)%x!=1){
                if(adatok[i]===adatok[i+1] && adatok[i]===adatok[i+2]  && adatok[i]===adatok[i+3]  && adatok[i]===adatok[i+4])
                {return true;}
            }else{
                i+=4;
            } 
        }
    }
    return false;
}
function fuggoleges(){
    for(var i=0;i<adatok.length;i++){
        if(adatok[i]!==0 && i<((y-4)*x)){
            if(adatok[i]===adatok[i+x] && adatok[i]===adatok[i+2*x]  && adatok[i]===adatok[i+3*x]  && adatok[i]===adatok[i+4*x])
            {return true;}
        }
    }
    return false;
}
function keresztle(){
    for(var i=0;i<adatok.length;i++){
        if(adatok[i]!==0 && i<((y-4)*x)){
            if((i+5)%x!=1){
                if(adatok[i]===adatok[i+(1+x)] && adatok[i]===adatok[i+(1+x)*2]  && adatok[i]===adatok[i+(1+x)*3]  && adatok[i]===adatok[i+4*(1+x)])
                {return true;}
            }else{
                i+=4;
            }
        }
    }
    return false;
}
function keresztfel(){
    for(var i=0;i<adatok.length;i++){
        if(adatok[i]!==0 && i<((y-4)*x)){
            if(!(i%x<4)){
                if(adatok[i]===adatok[i+(-1+x)] && adatok[i]===adatok[i+(-1+x)*2]  && adatok[i]===adatok[i+(-1+x)*3]  && adatok[i]===adatok[i+4*(-1+x)])
                {return true;}
            }else{
                i+=4;
            }
        }
    }
    return false;
}


function kovetkezoPlayer(akt){
    return playerek.playerekFelhasznált[akt%playerek.playerekFelhasznált.length];
}
