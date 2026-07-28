const publicaciones = [

{

    tipo:"Revista",

    titulo:"Revista Estudiantil de Ciencias Computacionales",

    fecha:"Vol.12 No.3 - Mayo 2025",

    descripcion:"Nueva edición con artículos sobre IA y software.",

    imagen:"img/revista.jpg"

},

{

    tipo:"Tesis",

    titulo:"Investigación en Sistemas de Energía Renovable",

    fecha:"2025",

    descripcion:"Paneles solares y eficiencia energética.",

    imagen:"img/tesis.jpg"

},

{

    tipo:"Boletín",

    titulo:"Boletín de Humanidades",

    fecha:"Junio 2025",

    descripcion:"Actividades del departamento.",

    imagen:"img/boletin.jpg"

}

];

const grid = document.querySelector(".grid");

function mostrar(lista){

grid.innerHTML="";

lista.forEach(pub=>{

grid.innerHTML += `

<div class="card">

<img src="${pub.imagen}">

<div class="contenido">

<h3>${pub.titulo}</h3>

<p>${pub.descripcion}</p>

</div>

</div>

`;

});

}

mostrar(publicaciones);