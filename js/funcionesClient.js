function traerInformacionCliente(){
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaCliente){
            console.log(respuestaCliente);
            pintarRespuesta(respuestaCliente.items)
        }

    });
}

function pintarRespuesta(items){

    let myTable ="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        // myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='obtenerItemEspecifico("+items[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCliente").append(myTable);
}

function guardarInformacionCliente(){
    let myData={
        id:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuestaCliente){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#age").val("");
            traerInformacionCliente();
            alert("se ha guardado el dato")
        }
    });
}

function editarInformacionCliente(){
    let myData={
        id:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaCliente){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#age").val("");
            traerInformacionCliente();
            alert("se ha Actualizado")
        }
    });
}
function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaCliente){
            $("#resultadoCliente").empty();
            traerInformacionCliente();
            alert("Se ha Eliminado.")
        }
    });
}

function obtenerItemEspecifico(idItem){
    $.ajax({
        dataType: 'json',
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#idCliente").val(item.id);
          $("#nameCliente").val(item.name);
          $("#email").val(item.email);
          $("#age").val(item.age);  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }