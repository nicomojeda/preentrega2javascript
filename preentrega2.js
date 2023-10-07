//Simulador de prestamo


//OBJETO CORRESPONDIENTE A LA SOLICITUD DE PRESTAMO POR PARTE DE UN CLIENTE
class cliente {

    constructor(usuario, contrasenia){
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.prestamo;
        this.cuotas;
        this.dinero_con_intereses;
        this.cuota_precio;
    }

    //METODOS OBJETO

    setPrestamo(prestamo){

        this.prestamo = prestamo;
    }

    setCuota(cuota){
        this.cuotas=cuota;
    }

    getPrestamo(){
        console.log("Su dinero solicitado es: ",this.prestamo);
    }

    
    
    getCuotas(){
       return this.cuotas;
    }

    getDineroConIntereses(){
        return this.dinero_con_intereses;
    }


  /*  cuotaValida(cuotas){
        //let flagCuotas = false;

        //while(flagCuotas == false){

            if(cuotas == 1 || cuotas == 3 || cuotas == 6 || cuotas == 12 || cuotas == 18 || cuotas == 24){
                this.cuotas = cuotas;
                flagCuotas = true;
            }
            else{
                //cuotas =prompt("Ingrese una cantidad de cuotas valida: ")
                Toastify({text: "Ingrese una cantidad de cuotas valida", duration: "5000", backgroundColor: "red"}).showToast();  
            }
        //}

    }*/

    dinero_intereses(){
        if(this.cuotas == 1){
            this.dinero_con_intereses = this.prestamo*1.20;
        }
        else if(this.cuotas == 3){
            this.dinero_con_intereses = this.prestamo*1.30;
        }
        else if(this.cuotas == 6){
            this.dinero_con_intereses = this.prestamo*1.40;
        }
        else if(this.cuotas == 12){
            this.dinero_con_intereses = this.prestamo*1.50;
        }
        else if(this.cuotas == 18){
           this.dinero_con_intereses = this.prestamo*1.70;
        }
        else if(this.cuotas == 24){
            this.dinero_con_intereses = this.prestamo*2;
        }
    }
    
    valor_cuota(){
        this.cuota_precio = Math.round(this.prestamo/this.cuotas);
        return this.cuota_precio;
    }
    


}



//INICIO DE PAGINA

function recorreStorage(arregloGuardado){
    for (let i=0; i<localStorage.length; i++){
        let clave = localStorage.key(i);
        arregloGuardado.push(JSON.parse(localStorage.getItem(clave)));
    }
}




let usuarios = [];
recorreStorage(usuarios);

let btnregistrate = document.getElementById("btn_registrar");
btnregistrate.addEventListener( "click" , registrar );

let main = document.getElementById("pagPrincipal");


let btnLogIn = document.getElementById("btn_logIn");
btnLogIn.addEventListener( "click" , loguearse );

let formularioRegistro = document.getElementById("formulario");
formularioRegistro.addEventListener("submit", function(e){e.preventDefault();})



//FUNCION DE REGISTRO
function registrar() {

    let nombreUsuario = document.getElementById("userName").value;
    let contrasenia = document.getElementById("password").value;

    //USO DE FIND
    let buscarUsuario = usuarios.find( (users) => users.usuario == nombreUsuario);

    if ( buscarUsuario != undefined){
        Toastify({text: "¡El usuario ingresado ya fue registrado previamente!", duration: "5000"}).showToast();   
    }
    else{ 
            let nuevoCliente = new cliente(nombreUsuario, contrasenia);

            let clienteJson = JSON.stringify( nuevoCliente );

            localStorage.setItem( Math.random() , clienteJson);

            usuarios.push(nuevoCliente);

            Toastify({text: "¡Registro exitoso!", duration: "5000",}).showToast(); 
        
        }
    }
                            
    
    
    
    //FUNCION LOGUEO
                                        
function loguearse(){

    let nombreUsuario = document.getElementById("userName").value;
    let contrasenia = document.getElementById("password").value;
    let buscarUsuario = usuarios.find( (users) => users.usuario == nombreUsuario);

    //Uso de find
    let buscarContrasenia = usuarios.find( (users) => users.contrasenia == contrasenia);

    //OPCION USUARIO EXISTE
    if(buscarUsuario == undefined || buscarContrasenia == undefined){

        //uso de librerias
        Toastify({text: "Usuario o contraseña inexistente", duration: "5000"}).showToast();

    }
    else{
            document.body.innerHTML = `<header><h1>Usted esta dentro del simulador de prestamo</h2></header>
            <main class="conteiner row justify-content-md-center">            
            <section class="seccionPrincipal row column-3">
                <h2 class="class="row column-3">¡ Bievenido ${nombreUsuario} !</h2>
                <form action="" id="formulario2">
                    </li>
                    <li>
                        <label for="" class="row column-3 ds">Dinero solicitado</label>
                        <input type="text" id="dineroSolicitado" class="row column-3 ds">
                    </li>
                    <li>
                        <select class="form-select row column-3" aria-label="Default select example" id="cuotasSolicitadas">
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        </select>
                    </li>
                    <li>
                        <button id = "btn_solicitudDinero" >Solicitar</button>
                    </li>
                </form>
            </section>
            </main>`;

            let formularioSolicitud = document.getElementById("formulario2");
            formularioSolicitud.addEventListener("submit", function(e){e.preventDefault();})

            
            let btnSolicitarDinero = document.getElementById("btn_solicitudDinero");
            btnSolicitarDinero.addEventListener( "click" , solicitud );

//SOLICITA PRESTAMO
            function solicitud (){


                let clienteEsporadico = new cliente(nombreUsuario, contrasenia);


                let cuotaNueva = document.getElementById("cuotasSolicitadas").value;
                let prestamoNuevo = document.getElementById("dineroSolicitado").value;

                clienteEsporadico.setPrestamo(prestamoNuevo);
                clienteEsporadico.setCuota(cuotaNueva);
                clienteEsporadico.dinero_intereses();
                let valorFinalCuota = clienteEsporadico.valor_cuota();
                let valorFinalDevolucion = clienteEsporadico.getDineroConIntereses();

                document.body.innerHTML = `<header><h1>Solicitud de prestamo realizada</h1></header>
                                            <main>
                                                <section>
                                                    <h2>Su prestamo solicitado fue:</h2>
                                                        <li>Dinero solicitado: $${prestamoNuevo}</li>
                                                        <li>Cantidad de cuotas seleccionadas: ${clienteEsporadico.getCuotas()}</li>
                                                        <li>El dinero que deverá devolver es: $${valorFinalDevolucion}</li>
                                                        <li>El valor de la cuota es: $${valorFinalCuota}</li>
                                                        <li><a href="index.html">Volver al inicio</a>
                                                    <div><h3>La simulación de prestamo ha finalizado</h3>
                                                </section>
                                            </main>`;




            }



        }

}

//FOOTER FETCH

let dolarOficialCompra = document.getElementById("dolarOficialCompra");
let dolarOficialVenta = document.getElementById("dolarOficialVenta");
let dolarBlueCompra = document.getElementById("dolarBlueCompra");
let dolarBlueVenta = document.getElementById("dolarBlueVenta");

fetch("https://api.bluelytics.com.ar/v2/latest")
    .then( response => response.json())
    .then( data => dolarOficialCompra.innerHTML =`<h3>DOLAR OFICIAL COMPRA</h3>
                                                <img src="./img/dolar-cambio.png" alt="bolsa dinero">
                                                <h4>$ ${data.oficial.value_buy}</h4>`)

fetch("https://api.bluelytics.com.ar/v2/latest")
        .then( response => response.json())
        .then( data2 => dolarOficialVenta.innerHTML =`<h3>DOLAR OFICIAL VENTA</h3>
                                                    <img src="./img/dolar-cambio.png" alt="bolsa dinero">
                                                    <h4>$ ${data2.oficial.value_sell}</h4>`)

fetch("https://api.bluelytics.com.ar/v2/latest")
        .then( response => response.json())
        .then( data3 => dolarBlueCompra.innerHTML =`<h3>DOLAR BLUE COMPRA</h3>
                                                    <img src="./img/dolar-cambio.png" alt="bolsa dinero">
                                                    <h4>$ ${data3.blue.value_buy}</h4>`)

fetch("https://api.bluelytics.com.ar/v2/latest")
        .then( response => response.json())
        .then( data4 => dolarBlueVenta.innerHTML =`<h3>DOLAR BLUE VENTA</h3>
                                                    <img src="./img/dolar-cambio.png" alt="bolsa dinero">
                                                    <h4>$ ${data4.blue.value_sell}</h4>`)





 

