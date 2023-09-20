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


    getPrestamo(){
        console.log("Su dinero solicitado es: ",this.prestamo);
    }

    
    
    getCuotas(){
       return this.cuotas;
    }

    getDineroConIntereses(){
        return this.dinero_con_intereses;
    }


    cuotaValida(cuotas){
        let flagCuotas = false;

        while(flagCuotas == false){

            if(cuotas == 1 || cuotas == 3 || cuotas == 6 || cuotas == 12 || cuotas == 18 || cuotas == 24){
                this.cuotas = cuotas;
                flagCuotas = true;
            }
            else{
                cuotas =prompt("Ingrese una cantidad de cuotas valida: ")
            }
        }

    }

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


let btnLogIn = document.getElementById("btn_logIn");
btnLogIn.addEventListener( "click" , loguearse );

let formularioRegistro = document.getElementById("formulario");
formularioRegistro.addEventListener("submit", function(e){e.preventDefault();})


function registrar() {

    let nombreUsuario = document.getElementById("userName").value;
    let contrasenia = document.getElementById("password").value;
    let contador = 0;

    for( let i = 0 ; i<usuarios.length; i++){

        if(usuarios[i].usuario == nombreUsuario){
            contador++;

        }
    }

        if (contador == 0){

            let nuevoCliente = new cliente(nombreUsuario, contrasenia);

            let clienteJson = JSON.stringify( nuevoCliente );

            localStorage.setItem( Math.random() , clienteJson);

            document.body.innerHTML = `<header><h1>¡Registro exitoso!</h2></header>
                                        <h2>¡El usuario: ${nombreUsuario} se ha registrado con exito!</h2> <a href="index.html">Volver</a>
                                        `;
        }
        else{

            document.body.innerHTML = `<header><h1>¡Error!</h1></header>
                                        <h2>¡El usuario: ${nombreUsuario} ya fue registrado!</h2> <a href="index.html">Volver</a>`;

        }

}

function loguearse(){

    let nombreUsuario = document.getElementById("userName").value;
    let contrasenia = document.getElementById("password").value;
    let contador = 0 ;

    for( let i = 0; i<usuarios.length ; i++){

        if( usuarios[i].usuario == nombreUsuario && usuarios[i].contrasenia == contrasenia){

            contador++;

        }
    }

    if(contador == 1){
            document.body.innerHTML = `<header><h1>Usted esta dentro del simulador de prestamo</h2></header>
            <main>            
            <section>
                <h2>¡Bievenido ${nombreUsuario} !</h2>
                <form action="" id="formulario2">
                    </li>
                    <li>
                        <label for="">Dinero solicitado</label>
                        <input type="text" id="dineroSolicitado">
                    </li>
                    <li>
                        <label for="">Cantidad de cuotas</label>
                        <input type="text" id="cuotasSolicitadas">
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


            function solicitud (){


                let clienteEsporadico = new cliente(nombreUsuario, contrasenia);


                let cuotaNueva = document.getElementById("cuotasSolicitadas").value;
                let prestamoNuevo = document.getElementById("dineroSolicitado").value;

                clienteEsporadico.setPrestamo(prestamoNuevo);
                clienteEsporadico.cuotaValida(cuotaNueva);
                clienteEsporadico.dinero_intereses();
                let valorFinalCuota = clienteEsporadico.valor_cuota();
                let valorFinalDevolucion = clienteEsporadico.getDineroConIntereses();

                document.body.innerHTML = `<header><h1>Solicitud de prestamo realizada</h1></header>
                                            <main>
                                                <section>
                                                    <h2>Su prestamo solicitado fue:</h2>
                                                        <li>Dinero solicitado: ${prestamoNuevo}</li>
                                                        <li>Cantidad de cuotas seleccionadas: ${clienteEsporadico.getCuotas()}</li>
                                                        <li>El dinero que deverá devolver es: ${valorFinalDevolucion}</li>
                                                        <li>El valor de la cuota es: ${valorFinalCuota}</li>
                                                        <li><a href="index.html">Volver al inicio</a>
                                                    <div><h3>La simulación de prestamo ha finalizado</h3>
                                                </section>
                                            </main>`;




            }



        }

        else{

            document.main.innerHTML = `<h2>Usted no esta registrado. Por favor registrese y vuelva a intentarlo.</h2> <a href="index.html">Volver</a>`;

        }
}



