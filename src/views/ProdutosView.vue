<template>
   <div>
    <h1>Adicionar Produto</h1>
    <form
    @submit.prevent="addProduct">
    <input v-model="productName" placeholder="Nome do Produto"/>
    <input v-model="productPrice" placeholder="Preço do Produto"/>

    <button type="submit">Adicionar Produto</button> 
</form>
<h2>Lista de Produtos</h2>
<ul>
    <li v-for="product in products" :key="product.id">
    {{ product.name }} - R$ {{ product.price }}
    </li>
</ul>
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
