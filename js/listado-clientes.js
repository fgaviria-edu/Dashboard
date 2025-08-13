let tablaClientes=document.querySelector("#table-clientes > tbody");

document.addEventListener("DOMContentLoaded",()=>{
    getDataClients();
});
let getDataClients=async()=>{
    let url="http://localhost/backend-apicrud/index.php?url=clientes";
    try {
        let respuesta=await fetch(url,{
            method: "GET",
            headers:{
                "Content-type":"application/json"
            }
        });
        if(respuesta.status==204){
            console.log("No hay datos en la bd.")
        }else{
            let dataClients=await respuesta.json();
            console.log(dataClients)
            //guardar en LocalStorage
            localStorage.setItem("dataClients",JSON.stringify(dataClients));
            dataClients.forEach((data,i) => {
                let fila=document.createElement("tr");
                fila.innerHTML=`
                    <td>${i+1}<td>
                    <td>${data.nombre}<td>
                    <td>${data.apellido}<td>
                    <td>${data.email}<td>
                    <td>${data.celular}<td>
                    <td>${data.direccion}<td>
                    <td>
                    <button class="btn btn-sm btn-warning btn-edit" data-id="${i}">
                        <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${i}">
                        <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-info btn-view" data-id="${i}">
                        <i class="fas fa-eye"></i>
                    </button>
                    </td>
                `;
                tablaClientes.appendChild(fila);
            });
        }
    } catch (error) {
        console.log(error)
    }
}