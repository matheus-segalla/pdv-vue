<template>
    <div class="container mt-5">
      <h1>Adicionar Produto</h1>
      <form @submit.prevent="addProduct" class="mb-4">
        <div class="row g-3 align-items-center">
          <div class="col-md-6">
            <input v-model="productName" class="form-control" placeholder="Nome do Produto" />
          </div>
          <div class="col-md-3">
            <input v-model="productPrice" class="form-control" placeholder="Preço do Produto" />
          </div>
          <div class="col-md-3">
            <input v-model="productUnidade" class="form-control" placeholder="Unidade de medida" />
          </div>
          <div class="col-md-2">
            <button type="submit" class="btn btn-primary w-100">Adicionar Produto</button>
          </div>
        </div>
      </form>
      <h2>Lista de Produtos</h2>
      <div class="mb-3">
        <input v-model="searchQuery" class="form-control" placeholder="Buscar Produto" />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">UM</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>R$ {{ product.price }}</td>
            <td>{{ product.unidade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { inject, onMounted, ref, computed } from 'vue';
  import { addDoc, collection, onSnapshot } from 'firebase/firestore';
  
  export default {
    name: 'AdicionarProdutos',
    setup() {
      const db = inject('db');
      const products = ref([]);
      const productName = ref('');
      const productPrice = ref('');
      const productUnidade = ref('');
      const searchQuery = ref('');
  
      const addProduct = async () => {
        try {
          await addDoc(collection(db, "produtos"), {
            name: productName.value,
            price: productPrice.value,
            unidade: productUnidade.value
          });
          productName.value = '';
          productPrice.value = '';
          productUnidade.value = '';
          alert("Produto adicionado com sucesso!");
        } catch (e) {
          console.error("Erro ao adicionar produto: ", e);
          alert("Erro ao adicionar produto.");
        }
      };
  
      onMounted(() => {
        const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
          products.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => a.name.localeCompare(b.name));
        });
  
        // Limpa o listener quando o componente é destruído
        return () => unsubscribe();
      });
  
      const filteredProducts = computed(() => {
        if (!searchQuery.value) {
          return products.value;
        }
        return products.value.filter(product =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return {
        productName,
        productPrice,
        productUnidade,
        addProduct,
        searchQuery,
        filteredProducts
      };
    }
  };
  </script>
  
  <style>
   
  </style>
