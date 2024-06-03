<template>
   <div class="container mt-5">
    <h1>Adicionar Produto</h1>
    <form
    @submit.prevent="addProduct" class="mb-4">
    <div class="row g-3 align-items-center">
        <div class="col-md-6">
            <input v-model="productName" class="form-control" placeholder="Nome do Produto"/>
        </div>
        <div class="col-md-4">
            <input v-model="productPrice" class="form-control" placeholder="Preço do Produto"/>
        </div>
        <div class="col-md-2">
            <button type="submit" class="btn btn-primary w-100">Adicionar Produto</button>
        </div>
    </div>
    
    </form>
<h2>Lista de Produtos</h2>
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">Produto</th>
            <th scope="col">Preço UN</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>R${{ product.price }}</td>
    </tr>
    </tbody>
</table>
   </div>
  </template>
  
  <script>
    import { inject, onMounted, ref } from 'vue';
    import { addDoc, collection, onSnapshot } from 'firebase/firestore';

    export default {
        name: 'AdicionarProdutos',
        data(){
            return {
                productName: '',
                productPrice: ''
            };
        },
        setup(){
            const db = inject('db');
            const products = ref([]);
            const productName = ref('');
            const productPrice = ref('');
            const addProduct = async () => {
                try {
                    await
                    addDoc(collection(db, "produtos"), {
                        name: productName.value,
                        price: productPrice.value
                    });
                    productName.value = '';
                    productPrice.value = '';
                    alert("Produto adicionado com sucesso");
                } catch (e) {
                    console.error("Erro ao adicionar produto: ", e);
                    alert("Erro ao adicionar protudo.");
                }
            };

            onMounted(() => {
                const unsubscribe = onSnapshot(collection(db,"produtos"), (snapshot) =>{
                    products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));  
                });
                return () => unsubscribe();
            });
            return {
                productName,
                productPrice,
                addProduct,
                products
            };
        }
    };
  
  </script>
  
  <style>
   
  </style>
