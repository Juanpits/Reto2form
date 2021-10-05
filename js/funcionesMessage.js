function traerInformacionMessage(){
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMessage){
            console.log(respuestaMessage);
            pintarRespuestaMessage(respuestaMessage.items)
        }

    });
}

function pintarRespuestaMessage(items){

    let myTable ="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button onclick='borrarElementoMessage("+items[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='obtenerItemEspecificoMessage("+items[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").append(myTable);
}

function guardarInformacionMessage(){
    let myData={
        id:$("#idMessage").val(),
        messagetext:$("#messageText").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuestaMessage){
            $("#resultadoMessage").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            traerInformacionMessage();
            alert("se ha guardado el dato")
        }
    });
}

function editarInformacionMessage(){
    let myData={
        id:$("#idMessage").val(),
        messagetext:$("#messageText").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaMessage){
            $("#resultadoMessage").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            traerInformacionMessage();
            alert("se ha Actualizado")
        }
    });
}
function borrarElementoMessage(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaMessage){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado.")
        }
    });
}

function obtenerItemEspecificoMessage(idItem){
    $.ajax({
        dataType: 'json',
        url:"https://g04005d2d06d35d-db202109232116.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/"+idItem,
        type:'GET',
        success:function(response) {
          console.log(response);
          var item=response.items[0];
  
          $("#idMessage").val(item.id);
          $("#messageText").val(item.messagetext);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }