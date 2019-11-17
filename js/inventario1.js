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
            //Guardando datos en el local Storage
            if(localStorage.getItem('Lista') === null ){
                localStorage.setItem('Lista',this.responseText);
            }else{
                console.log('Los datos ya fueron cargados');
                
            }

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
    
    if(CadenaComprados.length % 2 != 0)
        alert('La cantidad de productos no concuerda...')
    else{
        let i =1
        let array = []
        var objeto = {} 
        CadenaComprados.forEach(element => {
            
            if(i % 2 == 0){
                objeto.Cantidad = element;                
                array.push(objeto);
                objeto = {} 
            }else{
                objeto.Producto = element;                
            }

            
            i++;
        });
        $("#carrito-compras").empty();
        let totalCompra = 0;
        array.forEach(element => {
            JSON.parse(localStorage.getItem('Lista')).forEach(elementLista => {
                if(element.Producto == elementLista.Codigo){
                    
                    $("#carrito-compras").append(`
                        <p>
                            ${elementLista.Producto} --- ${element.Cantidad} x $${(elementLista.Precio).toFixed(2)} = $${(element.Cantidad*elementLista.Precio).toFixed(2)}
                        </p>
                    `)
                    totalCompra+= (element.Cantidad*elementLista.Precio)
                }
            });
        });
        $("#total").empty();
        if(totalCompra>=10){
            totalCompra=totalCompra*0.97
        }
        $("#total").append(`
            Total de factura: $${(totalCompra).toFixed(2)}
        `)
        localStorage.setItem("Compra",JSON.stringify(array))
    }

}