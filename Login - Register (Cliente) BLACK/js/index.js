document.querySelector('.img-btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s-signup')
});

class Cliente {
    constructor(nombre, usuario, contraseña, dni, edad, telf, numCuen, saldo, ingresos, estado) {
            this.nombre = nombre;
            this.usuario = usuario;
            this.contraseña = contraseña;
            this.dni = dni;
            this.edad = edad;
            this.telf = telf;
            this.numCuen = numCuen;
            this.saldo = saldo;
            this.ingresos = ingresos;
            this.estado = estado;
            this.historial = [];
        }
        //terminos y condiciones
    condiciones() {
        (async() => {
            const ok = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                // terminos y 
            const { value: accept } = await Swal.fire({
                title: 'Primero acepta nuestro terminos y condiciones por favor',
                input: 'checkbox',
                inputValue: 1,
                inputPlaceholder: 'Estoy de acuerdo con los términos y condiciones',
                confirmButtonText: 'Continuar',
                allowOutsideClick: false,
                inputValidator: (result) => {
                    return !result && 'Nesesitas aceptar nuestras condiciones para acceder'
                }
            })
            if (accept) {
                ok.fire({
                    icon: 'success',
                    title: 'Gracias por aceptar nuestros términos y condiciones'
                })
            }
        })()
        clien1["ingresos"] += 1;
    }

    iniciarSesion() {
        this.ingresos += 1;
        this.estado = true;
    }
    cerrarSesion() {
        this.estado = false;
    }
    getNombre() {
        return this.nombre;
    }
    getUsuario() {
        return this.usuario;
    }
    getDni() {
        return this.dni;
    }

    getNumTelf() {
        return this.telf;
    }
    getNac() {
        return this.edad;
    }
    getDin() {
        return this.dinero;
    }
    getNumCuen() {
        return this.numCuen;
    }
    getHistorial() {
        return this.historial;
    }
    getSaldo() {
        return this.saldo;
    }
    getIngresos() {
        return this.ingresos;
    }
    setUsuario(_usuario) {
        this.usuario = _usuario;
    }
    setTeft(_telf) {
        this.telf = telf;
    }
    setCont(_cont) {
        this.contraseña = _cont;
    }
    agregarSaldo(_agre) {
        this.saldo += _agre;
    }
    agregarHistorial(_agreh) {
        this.historial += _agreh;
    }
    transaccion() {
        /* A revisar */
        var hoy = new Date();
        var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        var cuenta = parseInt(document.getElementById("numCuenTransaccion").value);
        var monto = parseInt(document.getElementById("montoTransaccion").value);
        var contraseña = document.getElementById("contraseñaTransaccion").value;
        var monValido = false;
        if (monto <= this.getSaldo()) {
            monValido = true;
        }

        var clienteBuscado = buscarCuenta(cuenta);

        if (monValido && (contraseña == this.contraseña) && clienteBuscado) {
            this.saldo -= monto;
            clienteBuscado.agregarSaldo(monto);
            var historialRecibe = ["Depósito", "Banca por Internet", "+" + monto, fecha, hora];
            clienteBuscado.agregarHistorial(historialRecibe);
            var historialEnvia = ["Transferencia", "Banca por Internet", "-" + monto, fecha, hora];
            this.agregarHistorial(historialEnvia);

            bien.fire("La trasferencia fue realizada con éxito");

        } else {
            swal.fire("Revisa que los datos sean correctos o coloca un monto válido");
        }

    }
    verSaldo() {
        var contra = document.getElementById("contraseñaVerificacion").value;
        if (contra) {
            if (contra == this.contraseña) {
                swal.fire("Tu saldo es: " + this.saldo + " soles");
            } else {
                swal.fire("Por favor escribe bien tu contraseña");
            }
        }
    }
    actDatos() {
        var usuarioNuevo = document.getElementById("usuarioNuevo").value;
        var telefonoNuevo = parseInt(document.getElementById("telefonoNuevo").value);
        var anteriorContraseña = document.getElementById("anteriorContraseña").value;
        var nuevaContraseña = document.getElementById("nuevaContraseña").value;
        var contDig = 0;
        //Cambio de usuario
        if (usuarioNuevo) {
            this.setUsuario(usuarioNuevo);
            bien.fire({
                icon: 'success',
                title: 'Se cambiaron los datos correctamente'
            })
        }

        //cambio de telefono y comprobación
        if (telefonoNuevo) {
            while (telefonoNuevo >= 1) {
                telefonoNuevo = telefonoNuevo / 10;
                contDig++;
            }
            if (contDig != 9) {
                bien.fire("Revisa que sea un número de telefono válido");
            } else {
                this.setTeft(telefonoNuevo);
                bien.fire({
                    icon: 'success',
                    title: 'Se cambiaron los datos correctamente'
                })
            }
        }

        //cambio de contraseña
        if (anteriorContraseña && nuevaContraseña) {
            if (anteriorContraseña == this.contraseña) {
                this.setCont(nuevaContraseña);
                bien.fire({
                    icon: 'success',
                    title: 'Se cambiaron los datos correctamente'
                })
            } else {
                swal.fire("La contraseña antigua no coincide");
            }
        }
        //comprobración de campos
        if ((anteriorContraseña && !nuevaContraseña) || (!anteriorContraseña && nuevaContraseña)) {
            swal.fire("Recuerde llenar la contraseña antigua y nueva");
        }
    }
}

clien1 = new Cliente("Jean", "jeanpaullmm1@gmail.com", "asdfgh", 71049095, "2002-12-25", 958261152, 216521, 10000, 2, true);
clien2 = new Cliente("Frank", "prueba", "prueba", 71049095, "2002-12-25", 958261152, 56416541, 10000, 2, false);
var arrClientes = [
    clien1, clien2
];

function registroCliente() {
    var contDigDNI = 0;
    var contDigTELF = 0;
    var nombre = document.getElementById("nombreRegistro").value;
    var email = document.getElementById("emailRegistro").value;
    var contraseña = document.getElementById("contraseñaRegistro").value;
    var dni = parseInt(document.getElementById("dni").value);
    var edad = document.getElementById("fechaNacimiento").value;
    var telefono = parseInt(document.getElementById("telefono").value);
    var saldo = 0;

    while (dni >= 1) {
        dni = dni / 10;
        contDigDNI++;
    }
    while (telefono >= 1) {
        telefono = telefono / 10;
        contDigTELF++;
    }

    if (contDigDNI == 8 && nombre != "" && contraseña != "" && email != "" && contDigTELF == 9) {
        clien = new Cliente(nombre, email, contraseña, dni, edad, telefono, null, saldo, 0);
        arrClientes.push(clien);
        alert("Bievenido " + clien.getNombre() + ", puede recojer su tarjeta dentro de 3 días hábiles");

    } else {
        alert("Algún dato es incorrecto, intentelo nuevamente");
    }
}

var contErrores = 1;

function inicioSesion() {
    var encontrado = false;
    var usuario = document.getElementById("emailInicio").value;
    var contraseña = document.getElementById("contraseñaInicio").value;
    for (i = 0; i < arrClientes.length; i++) {
        if (arrClientes[i]["usuario"] == usuario && arrClientes[i]["contraseña"] == contraseña) {

            alert("Bienvenido " + arrClientes[i]["nombre"]);
            arrClientes[i]["ingresos"] += 1;
            arrClientes[i]["estado"] = true;
            encontrado = true;
            location.href = "menu.html";
            break;
        }

        if (contErrores == 3) {
            let timerInterval
            Swal.fire({
                title: 'Has fallado demasiadas veces',
                html: 'La pagina se cerrara en <b></b> milisegundos.',
                footer: 'Piensa mejor tus datos con este temón hasta la proxima esperamos verte pronto, no nos guarde rencor, es por su bien',
                timer: 5000,
                timerProgressBar: true,
                willOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                                b.textContent = Swal.getTimerLeft()
                            }
                        }
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                    window.location.replace('https://www.youtube.com/watch?v=vnII48b0r7U');
                }
            })
        }
    }

    if (encontrado == false) {
        alert("Intentalo nuevamente pero, recuerda no fallar en demasiadas ocaciones");
        contErrores++;
    }
}

for (i = 0; i < arrClientes.length; i++) {
    if (arrClientes[i]["estado"]) {
        var clienteActual = arrClientes[i];
        break;
    }
}

function olvideCont() {
    (async() => {

        const { value: email } = await Swal.fire({
            title: 'Por favor escribe tu email',
            input: 'email',
            inputPlaceholder: 'Escribe tu email'
        })

        if (email) {
            Swal.fire(`Hemos enviado un email a: ${email} con las instrucciones correspondientes`)
        }

    })()
}