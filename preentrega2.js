//Simulador de prestamo


//OBJETO CORRESPONDIENTE A LA SOLICITUD DE PRESTAMO POR PARTE DE UN CLIENTE
class cliente_prestamo {

    constructor(nombre, apellido, dni, prestamo, cuotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.prestamo = prestamo;
        this.cuotas = cuotas
        this.dinero_con_intereses;
        this.cuota_precio;
    }

    //METODOS OBJETO

    getDatosCliente(){
        this.getNombre();
        this.getApellido();
        this.getDNI();
        this.getPrestamo();
        this.getCuotas();
        this.getDineroConIntereses();
        this.getCuotasPrecioFinal();
    }

    getNombre(){
        console.log("Nombre: ",this.nombre)
    }

    getApellido(){
        console.log("Apellido: ",this.apellido)
    }

    getApellido(){
        console.log("Apellido: ",this.apellido)
    }

    getDNI(){
        console.log("DNI: ",this.dni)
    }

    getPrestamo(){
        console.log("Su dinero solicitado es: ",this.prestamo)
    }

    
    
    getCuotas(){
        console.log("Su cantidad de cuotas seleccionada es: ",this.cuotas)
    }

    getDineroConIntereses(){
        console.log("Este es el dinero que deberá devolver: $",this.dinero_con_intereses)
    }

    getCuotasPrecioFinal(){
        console.log("El valor de su cuota es: ", this.cuota_precio)
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
    }
    


}

//Arreglo de clientes

let listaClientes = [];
let listaNombres = [];


function agradecimiento(nombre_cliente){
    console.log("¡ Gracias por elegirnos",nombre_cliente,"!");
}

function agradecimiento_clientes(arreglo, agradecimiento){
     agradecimiento(arreglo[arreglo.length-1]);
}




//MAIN
let solicitud_prestamo = prompt("¿Desea solicitar un prestamo? SI/NO");


    while( solicitud_prestamo.toUpperCase() == "SI"){
        let nombre = prompt("Ingrese su nombre:");
        let apellido = prompt("Ingrese su apellido:");
        let dni = prompt("Ingrese su DNI:");
        let dinero_solicitado = prompt("Ingrese la cantidad de dinero que necesita:");
        let cuotas = parseInt (prompt("Ingrese cantidad de cuotas a cancelar:"));

        let cliente = new cliente_prestamo(nombre, apellido, dni, dinero_solicitado, cuotas);
        cliente.cuotaValida(cuotas);
        cliente.dinero_intereses();
        cliente.valor_cuota();


        cliente.getDatosCliente();

        //Inclusion en arreglo

        listaClientes.push(cliente);
        listaNombres.push(nombre);

        agradecimiento_clientes(listaNombres, agradecimiento);


        solicitud_prestamo = prompt("¿Desea solicitar otro prestamo? SI/NO");
        }

console.log("La simulación del prestamo ha finalizado")



