<template>
<<<<<<< HEAD
    <div class="main-container">
      <h1>PRODUTOS</h1>
      <input ref="newproduct" placeholder="Novo Produto" type="text">
      <button @click="addNewProduct">Adicionar</button>
=======
    <div>
        <div class="card">
            <div class="card-header">
                <h4>
                    PRODUTOS
                    <RouterLink to="/produto/create" class="btn btn-primary float-end"> 
                        Adicionar Produto
                    </RouterLink>
                </h4>
            </div>
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
            </div>
        </div>
>>>>>>> d435f192abe55c458996b0923a6a6757f93cdfe0
    </div>
  </template>
  
  <script>
<<<<<<< HEAD
  

  </script>
  
=======
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
    @import 'bootstrap';
  </style>
>>>>>>> d435f192abe55c458996b0923a6a6757f93cdfe0
