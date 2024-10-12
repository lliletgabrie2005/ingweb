const ocult=document.getElementById('subtitulos');
const subMenu=document.getElementById('nor');
const cri=document.getElementById('cri');
ocult.style.display='none';
subMenu.style.display='none';
cri.style.display='none';
document.getElementById('bs').addEventListener('click', function() {
  document.getElementById('conte').style.left = '0';
});
document.getElementById('id_x').addEventListener('click',()=>{
  document.getElementById('conte').style.left = '-450px'; 
})
document.getElementById('titulo').addEventListener('click',()=>{
  ocult.style.display = "block";
})
document.getElementById('id_tn').addEventListener('click',()=>{
  document.getElementById('id_tc').style.top='100px';
  document.getElementById('id_sh').style.top='105px';
  document.getElementById('id_cr').style.top='110px';
  if(cri.style.display!='none'){
    document.getElementById('id_sh').style.top='170px';
    document.getElementById('id_cr').style.top='175px';
  }
  subMenu.style.display='block';
})
document.getElementById('id_tc').addEventListener('click',()=>{
  document.getElementById('id_sh').style.top='70px';
  document.getElementById('id_cr').style.top='75px';
  if(subMenu.style.display!='none'){
    document.getElementById('id_sh').style.top='170px';
    document.getElementById('id_cr').style.top='175px';
  }
  cri.style.display='block';
})







