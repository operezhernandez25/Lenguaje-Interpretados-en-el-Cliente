let res;
let user="";
let pass="";



function login() {
    fetch('./json/datos.txt')
        .then((response)=>{
            return response.text();
        })
        .then((data)=>{
            
            res = data.split(" ");
            console.log(res);

            for(let i=0; i<3;i++){
               
                if(document.getElementById("inputEmail").value===res[i]){
                    user=res[i];
                }
               
            }
            for (let j = 3; j < 6; j++) {
                
                if(document.getElementById("inputPassword").value===res[j]){
                    pass=res[j];
                }
                
            }

            if(user!==""&&pass!==""){
                window.location="index2.html";

            }else{
                alert("Contraseña y/o usuario incorrectos");
             
             }
            
            
        })
        .catch((error)=>{
            console.log(error);
            
        })
    
    
}

/*
var arrayData = new Array();
var archivoTxt= new XMLHttpRequest();
var fileRuta= './json/datos.txt';
archivoTxt.open("GET",fileRuta,false);
archivoTxt.send(null);
var txt = archivoTxt.responseText;

for (let i = 0; i < txt.length; i++) {
    arrayData.push(txt[i]);
    
}


arrayData.forEach((data)=>{
    console.log(data);
    
});*/


/*
var mylogin = JSON.parse(data);
let flag=false;
const usuario ;

function login() {

    for(var i in mylogin){
     if(document.getElementById("inputEmail").value === mylogin[i].user && document.getElementById("inputPassword").value === mylogin[i].pass){
           usuario =document.getElementById("inputEmail").value;
        flag=true;
     }
      
      
}
if(flag){
    console.log('simon lo encontre');
    window.location="index2.html";

}else{
   alert("Contraseña y/o usuario incorrectos");

}

} 
*/