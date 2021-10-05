function traerInformacion(){
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items)
        }

    });
}

function pintarRespuesta(items){

    let myTable ="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].address+"</td>";
        myTable+="<td>"+items[i].exension+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='borrarElementoFarm("+items[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='obtenerItemEspecificoFarm("+items[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        address:$("#address").val(),
        exension:$("#exension").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#address").val("");
            $("#exension").val("");
            $("#category_id").val("");
            $("#name").val("");
            traerInformacion();
            alert("se ha guardado el dato")
        }
    });
}

function editarInformacion(){
    let myData={
        id:$("#id").val(),
        address:$("#address").val(),
        exension:$("#exension").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#address").val("");
            $("#exension").val("");
            $("#category_id").val("");
            $("#name").val("");
            traerInformacion();
            alert("se ha Actualizado")
        }
    });
}
function borrarElementoFarm(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha Eliminado.")
        }
    });
}

function obtenerItemEspecificoFarm(idItem){
    $.ajax({
        dataType: 'json',
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#id").val(item.id);
          $("#address").val(item.address);
          $("#exension").val(item.exension);
          $("#category_id").val(item.category_id);
          $("#name").val(item.name);
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }