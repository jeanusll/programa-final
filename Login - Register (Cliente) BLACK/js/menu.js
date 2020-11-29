//bucle infinito de las cartas
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
});

//alerta arriba a la derecha
const bien = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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
        location.href("menu.html");
    }
    cerrarSesion() {
        this.estado = false;
        location.href("login-registro.html");
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
        this.historial.push(_agreh);
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
            var historialRecibe = ["Depósito", "Banca por Internet", "+" + monto, fecha, hora, "De: " + this.getNombre(), "Para: " + clienteBuscado.getNombre()];
            clienteBuscado.agregarHistorial(historialRecibe);
            var historialEnvia = ["Transferencia", "Banca por Internet", "-" + monto, fecha, hora, "De: " + this.getNombre(), "Para: " + clienteBuscado.getNombre()];
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
    verDatos() {
        document.getElementById("nameProfile").innerHTML = " " + this.getNombre();
        document.getElementById("userProfile").innerHTML = " " + this.getUsuario();
        document.getElementById("dniProfile").innerHTML = " " + this.getDni();
        document.getElementById("birthProfile").innerHTML = " " + this.getNac();
        document.getElementById("numTelfProfile").innerHTML = " " + this.getNumTelf();
        document.getElementById("numCuenProfile").innerHTML = " " + this.getNumCuen();
        document.getElementById("singupProfile").innerHTML = " " + this.getIngresos() + " veces";
    }

    verHistorial() {

        var tabla = '<thead>' +
            '<tr>' +
            '<th>N°</th>' +
            '<th>Tipo</th>' +
            '<th>Modo</th>' +
            '<th>Monto</th>' +
            '<th>Fecha</th>' +
            '<th>Hora</th>' +
            '<th>Remitente</th>' +
            '<th>Admitente</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (i = 0; i < this.historial.length; i++) {
            tabla += '<tr>';
            tabla += '<td>' + i + '</td>';
            tabla += '<td>' + this.historial[i][0] + '</td>';
            tabla += '<td>' + this.historial[i][1] + '</td>';
            tabla += '<td>' + this.historial[i][2] + '</td>';
            tabla += '<td>' + this.historial[i][3] + '</td>';
            tabla += '<td>' + this.historial[i][4] + '</td>';
            tabla += '<td>' + this.historial[i][5] + '</td>';
            tabla += '<td>' + this.historial[i][6] + '</td>';
            tabla += '</tr>';
        }
        tabla += '</tbody>';

        document.getElementById("content-table").innerHTML = tabla;
    }


}

clien1 = new Cliente("Jean", "jeanpaullmm1@gmail.com", "asdfgh", 71049095, "2002-12-25", 958261152, null, 10000, 2, true);
clien2 = new Cliente("Frank", "prueba", "prueba", 71049095, "2002-12-25", 958261152, 56416541, 10000, 2, false);
var arrClientes = [
    clien1, clien2
];


for (i = 0; i < arrClientes.length; i++) {
    if (arrClientes[i]["estado"]) {
        var clienteActual = arrClientes[i];
        break;
    }
}



if (clienteActual["ingresos"] == 1) {
    clienteActual.condiciones();
}

//mostrar Datos
function buscarCuenta(busCuenta) {
    for (i = 0; i < arrClientes.length; i++) {
        if (arrClientes[i]["numCuen"] == busCuenta) {
            return arrClientes[i];
        }
    }
}

/*

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Domenic</td>
                            <td>88,110</td>
                            <td>dcode</td>
                        </tr>
                        <tr class="active-row">
                            <td>2</td>
                            <td>Sally</td>
                            <td>72,400</td>
                            <td>Students</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Nick</td>
                            <td>52,300</td>
                            <td>dcode</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Nick</td>
                            <td>52,300</td>
                            <td>dcode</td>
                        </tr>
                    </tbody>
                </table>
*/