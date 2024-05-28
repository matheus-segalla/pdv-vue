<template>
    <div>
        <p>Componente de mensagem</p>
        <div>
            <form id="pedido-form">
                <div class="input-container">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Nome do Cliente">
                </div>
                <div class="input-container">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" v-model="endereco" placeholder="Endereço do Cliente">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PedidoForm"
    }
</script>

<style scoped>
#pedido-form{
    max-width: 400px;
    margin: 0 auto;
}

.input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid;
}

input, select {
    padding: 5px 10px;
    width: 300px;
}

</style>