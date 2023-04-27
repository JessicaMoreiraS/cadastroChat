//POST USUARIO
function cadastrarUsuario(){
    event.preventDefault();

    fetch("usuarios", {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: $("#nome").val(), 
            email: $("#email").val(), 
            senha: $("#senha").val(),
            status: "",
            telefone: "",
            foto: '<img src="../imagens/semFotoPerfil.jpg" class="configFotoPerfil"/>'
        })
    })
    .then(response => response.json())
    //adicionar apagar campos
}

//GET USUARIO
function buscarUsuario(){
    event.preventDefault();
    fetch('usuarios',{
        method: 'GET'
    })
    .then(response => response.json())
    .then(dados => {
        const usuarioEncontrado = dados.find(usuarios => usuarios.email == $("#email").val());
        if(usuarioEncontrado){
            if(usuarioEncontrado.senha == $("#senha").val()){
                localStorage.setItem("idArmazenado", usuarioEncontrado.id);
                window.location = '/chat.html'
            }else{
                Swal.fire("Senha incorreta!")
            }
        }else{
            Swal.fire("Pessoa não encontradas!")
        }
    })
}


function usuarioOff(){
    localStorage.setItem("idArmazenado", "ninguem")
}

//GET USUARIO (CHAT)
function carregarUsuarioChat(){        
    var idArquivado = localStorage.getItem("idArmazenado");

    fetch(`suarios/${idArquivado}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(dados => {
            
        $("#nome").val(dados.nome)
        $("#areaImgPerfil").html(dados.foto)
    })
}

//GET USUARIO (CONFIGPERFIL)
function carregarPerfil(){
    const idArquivado = localStorage.getItem("idArmazenado");

    fetch(`usuarios/${idArquivado}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(dados => {
        $("#areImgPerfil").append(dados.foto)
        $("#nome").val(dados.nome)
        $("#status").val(dados.status)
        $("#email").val(dados.email)
        $("#senha").val(dados.senha)
        $("#telefone").val(dados.telefone)
    })
}


function verificaCamposAtualizaUsuario(){
    if($('#nome').val() != "" && $('#email').val() != "" && $('#senha').val() != ""){
        return true
    }else{
        Swal.fire('Atenção, preencha os campos obrigatorios de Nome, Senha e Email')
        return false
    }
}


//PUT USUARIO (CONFIGPERFIL)
function atualizarDdadosUser(){
    event.preventDefault();

    if(verificaCamposAtualizaUsuario()){
        var imgSrc;
        const idArquivado = localStorage.getItem("idArmazenado");
        
        fetch(`usuarios/${idArquivado}`,{
            method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            
           
            if($("#upImgPerfil").val() == ""){
                imgSrc = dados.foto
            }else{
                imgSrc = "<img src='"+$("#upImgPerfil").val()+"' class=\"configFotoPerfil\"/>"
            }
               
            
            fetch(`usuarios/${idArquivado}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                nome: $("#nome").val(),
                email: $("#email").val(), 
                senha: $("#senha").val(),
                status: $("#status").val(),
                telefone: $("#telefone").val(),
                foto: imgSrc 
            })
        })
        .then(response => response.json())
        setTimeout('location.reload()', 300);
        }) 
    };
}

//GET USUARIO PUT RESETA FOTO DE PERFIL DO USUARIO (CONFIGPERFIL)
function removerFotoPerfil(){
    const idArquivado = localStorage.getItem("idArmazenado");
    event.preventDefault()
    fetch(`usuarios/${idArquivado}`,{
            method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {    
            fetch(`usuarios/${idArquivado}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                nome: dados.nome,
                email: dados.email, 
                senha: dados.senha,
                status: dados.status,
                telefone: dados.telefone,
                foto: '<img src="../imagens/semFotoPerfil.jpg" class="configFotoPerfil"/>'
            })
        })
        .then(response => response.json())
        setTimeout('location.reload()', 300);
    }) 
}

function cardUserConected() {
    console.log('olá');
}