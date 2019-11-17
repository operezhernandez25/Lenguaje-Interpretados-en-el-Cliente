let ArrProductos = [];
var todos_productos = "todos";
var productos_ingresados;

var CadenaComprados =[];



function traerDatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'inventario.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);

            let res = document.querySelector('#res');
            res.innerHTML = '';

            for (let item of datos) {
                res.innerHTML += `
                <tr>
                <td>${item.Codigo}</td>
                <td>${item.Producto}</td>
                <td>${item.Precio}</td>
                <td>${item.Cantidad}</td>
                </tr>
                `
            }

            ArrProductos.push(datos);
            console.log(ArrProductos);
        }
    }

}

function buscador() {
    $(document).ready(function () {
        $("#buscador").keyup(function () {
            _this = this;
            $.each($("#tablaproductos #res tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                {
                    $(this).hide();                  
                }  

                else
                {                   
                    $(this).show();
                }
            });
        });       
    });
}


function compra()
{
    productos_ingresados = document.getElementById("datos").value ;
    CadenaComprados = productos_ingresados.split(",")

    console.log(CadenaComprados);  
}