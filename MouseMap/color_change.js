const web=document.addEventListener('pointermove', function(e){
    document.body.style.backgroundColor=`rgb( ${(e.pageX/window.innerWidth)*255},0,${(e.pageY/window.innerHeight)*255} )`;
})