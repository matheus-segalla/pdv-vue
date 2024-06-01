<template>
    <div class="main-container">
      <h1>PRODUTOS</h1>
      <input ref="newproduct" placeholder="Novo Produto" type="text">
      <button @click="addNewProduct">Adicionar</button>
    <div>
        <div class="card">
            
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>U.M.</th>
                            <th>PREÇO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>s
        </div>
    </div>
</div>
  </template>
  
  <script>
    import axios from 'axios';
    import { RouterLink } from 'vue-router';

  export default {
    name: 'produtos',
    data(){
        return {
          produtos: []
        }
    },
    mounted(){
        this.getProduct();
        // console.log('i am here')
    },

    methods: {
        getProduct(){

            axios.get('').then(res =>{
                console.timeLog(res)
            });
        }
    }
  }
  
  </script>
  
  <style>
   
  </style>
