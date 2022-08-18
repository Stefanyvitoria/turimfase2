$(document).ready(
    $.get( "Database.php/ler", function( json ) {

        var textedJson = JSON.stringify(json, null, 4);
        document.getElementById("json-area").value=textedJson;
        document.getElementById("json-area").readOnly = true; 
    })
);


// $('textarea').on(function () {
//     console.log("Hello World!");
//   });

// function Notificacao() {
//     window.alert("ok");
// }               