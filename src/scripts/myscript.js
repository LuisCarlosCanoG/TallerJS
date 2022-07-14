//Validaciones para inputs
var Fecha = new Date();
document.getElementById('Fecha_ini').max = Fecha.toISOString().split('T')[0];

var Estudiante = document.getElementById('Estudiante');
var Profesor = document.getElementById('Profesor');
var DatosEstudiante = document.getElementById('DatosEstudiante');
var DatosProfesor = document.getElementById('DatosProfesor');
var TipoPersona = null;
var DatoPersona = null;

Estudiante.addEventListener('input', (e) => {
    TipoPersona = Estudiante;
    DatoPersona = document.getElementById('semestre');
    DatosEstudiante.classList.remove('hidden');
    DatosProfesor.classList.add('hidden');
});

Profesor.addEventListener('input', (e)=>{
    TipoPersona = Profesor;
    DatoPersona = document.getElementById('tipo_profesor');
    DatosEstudiante.classList.add('hidden');
    DatosProfesor.classList.remove('hidden');
});

//Validación para registro
function verificarNombre(nombre){
    let especiales = String(".-,_<>#$%&/@=+*?¡¿?!{}[]\\|\"'`~`×¥¥¥´¶öµ;:ü®åäßð©æ¾");
    for(let i=0;i<especiales.length;i++){
    if (nombre.indexOf(especiales.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

var inputNombre = document.getElementById('nombre');
var SpanErrorNombre = document.getElementById('errorNombre');
function validarNombre(){
    if(verificarNombre(inputNombre.value)){
        SpanErrorNombre.classList.remove('hidden');
        return false;
    } else {
        SpanErrorNombre.classList.add('hidden');
        return true;
    }
}

var inputResponsable = document.getElementById('responsable');
var SpanErrorResponsable = document.getElementById('errorResponsable');
function validarResponsable(){
    if(verificarNombre(inputResponsable.value)){
        SpanErrorResponsable.classList.remove('hidden');
        return false;
    } else {
        SpanErrorResponsable.classList.add('hidden');
        return true;
    }
}

var inputPresupuesto = document.getElementById('presupuesto');
function validarPresupuesto(){
    let error = document.getElementById('errorPresupuesto');
    let estado = false;
    if(inputPresupuesto.value<10000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es menor de $10.000.000';
    } else if(inputPresupuesto.value>50000000){
        error.classList.remove('hidden');
        error.innerText = 'El presupuesto es mayor a $50.000.000';
    } else {
        error.classList.add('hidden');
        estado = true;
    }
    return estado;
}

//Creación del objeto y Array
misProyectos = [];
var Ubicacion = 0;

//Registrar proyecto
var inputCodigo = document.getElementById('codigo');
var inputTipo = document.getElementById('tipo');
var inputFechaIni = document.getElementById('Fecha_ini');
var inputFechaFin = document.getElementById('Fecha_fin');

function contarDias(pos){
    let inicio = new Date(misProyectos[pos].FechaInicio);
    let fin = new Date(misProyectos[pos].FechaFin)
    let diasDif = fin.getTime()-inicio.getTime();
    console.log(diasDif);
    // 1 día = 24 horas, 1 hora = 60 min, 1 min = 60 seg, 1 seg = 1000ms
    return Math.round(diasDif/(1000*60*60*24))
}


function listarProyectos(){
    let texto = "";
    for (i in misProyectos) {
        texto += `
            <tr class="odd:bg-white even:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${misProyectos[i].nom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].responsable}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].FechaInicio}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${misProyectos[i].FechaFin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${contarDias(i)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">                                    
                    <input type="button" onclick="editar(${i})" value="Editar" class="cursor-pointer bg-green-600 text-green-200 text-sm p-1 border border-green-800">
                    <input type="button" onclick="eliminar(${i})" value="Eliminar" class="cursor-pointer bg-red-600 text-red-200 text-sm p-1 border border-red-800">
                    <input type="button" onclick="mostrar(${i})" value="Vista Rápida" class="cursor-pointer bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
                </td>
            </tr>
        `
    }

    document.getElementById('cuerpo').innerHTML = texto;
}

function limpiar(){
        inputCodigo.value = "";
        inputNombre.value = "";
        inputTipo.value = "";
        inputFechaIni.value = "";
        inputFechaFin.value = "";
        inputResponsable.value = "";
        inputPresupuesto.value = "";
        TipoPersona.value = "";
        DatoPersona.value = "";
}

function agregarProyecto() {
    persona = {
        cod: '',
        nom: '',
        tipo: '',
        FechaInicio: '',
        FechaFin: '',
        responsable: '',
        presupuesto: 0,
        tipo_persona: '',
        dato_persona: ''
    }
    if(validarNombre() && validarResponsable() && validarPresupuesto()){
        persona.cod = inputCodigo.value;
        persona.nom = inputNombre.value;
        persona.tipo = inputTipo.value;
        persona.FechaInicio = inputFechaIni.value;
        persona.FechaFin = inputFechaFin.value;
        persona.responsable = inputResponsable.value;
        persona.presupuesto = inputPresupuesto.value;
        persona.tipo_persona = TipoPersona.value;
        persona.dato_persona = DatoPersona.value;
        misProyectos.push(persona);
        listarProyectos();
        limpiar();
        alert('Proyecto registrado correctamente.')
    }
}
var BotonAgregar = document.getElementById("BotonAgregar");
BotonAgregar.addEventListener('click', agregarProyecto);

var btnActualizar = document.getElementById("btnActualizar");
function editar(pos){
    Ubicacion = pos;
    inputCodigo.value = misProyectos[pos].cod;
    inputNombre.value = misProyectos[pos].nom;
    inputTipo.value = misProyectos[pos].tipo;
    inputFechaIni.value = misProyectos[pos].FechaInicio;
    inputFechaFin.value = misProyectos[pos].FechaFin;
    inputResponsable.value = misProyectos[pos].responsable;
    inputPresupuesto.value = misProyectos[pos].presupuesto;
    TipoPersona.value = misProyectos[pos].tipo_persona;
    DatoPersona.value = misProyectos[pos].dato_persona;
    btnActualizar.classList.remove('hidden');
    BotonAgregar.classList.add('hidden');
}

function actualizarDatos(){
    misProyectos[Ubicacion].cod = inputCodigo.value;
    misProyectos[Ubicacion].nom = inputNombre.value;
    misProyectos[Ubicacion].tipo = inputTipo.value;
    misProyectos[Ubicacion].FechaInicio = inputFechaIni.value;
    misProyectos[Ubicacion].FechaFin = inputFechaFin.value;
    misProyectos[Ubicacion].responsable = inputResponsable.value;
    misProyectos[Ubicacion].presupuesto = inputPresupuesto.value;
    misProyectos[Ubicacion].tipo_persona = TipoPersona.value;
    misProyectos[Ubicacion].dato_persona = DatoPersona.value;
    btnActualizar.classList.add('hidden');
    BotonAgregar.classList.remove('hidden');
    listarProyectos();
    limpiar();
}
btnActualizar.addEventListener('click', actualizarDatos);

function eliminar(pos){
    misProyectos.splice(pos, 1);
    listarProyectos();
}

function mostrar(pos){
    let texto = `
        Código: ${misProyectos[pos].cod}
        Nombre: ${misProyectos[pos].nom}
        Tipo: ${misProyectos[pos].tipo}
        Fecha Inicio: ${misProyectos[pos].FechaInicio}
        Fecha Fin: ${misProyectos[pos].FechaFin}
        Responsable: ${misProyectos[pos].responsable}
        Presupuesto: ${misProyectos[pos].presupuesto}
        Tipo persona: ${misProyectos[pos].tipo_persona}
    `;
    if(misProyectos[pos].tipo_persona=="estudiante"){
        texto += '   Semestre: '+ misProyectos[pos].dato_persona;
    } else {
        texto += '   Tipo profesor: '+ misProyectos[pos].dato_persona;
    }

    alert(texto);
}