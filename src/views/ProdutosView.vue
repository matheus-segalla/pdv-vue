<template>
  <div class="container mt-5">
    <h1>Adicionar Produto</h1>
    <form @submit.prevent="addProduct" class="mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-6">
          <input v-model="productName" class="form-control" placeholder="Nome do Produto" required />
        </div>
        <div class="col-md-3">
          <input v-model="productPrice" type="number" step="0.01" class="form-control" placeholder="Preço do Produto" required />
        </div>
        <div class="col-md-3">
          <input v-model="productUnidade" class="form-control" placeholder="Unidade de Medida" required />
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary w-100">Adicionar Produto</button>
        </div>
      </div>
    </form>
    
    <h2>Buscar Produtos</h2>
    <div class="input-group mb-3">
      <input v-model="searchQuery" @input="searchProducts" class="form-control" placeholder="Buscar Produtos" />
      <span class="input-group-text">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <button @click="toggleShowAllProducts" class="btn btn-secondary mb-3">
      {{ showAllProducts ? 'Ocultar todos os produtos' : 'Mostrar todos os produtos' }}
    </button>

    <h2>Lista de Produtos</h2>
    <table v-if="filteredProducts.length" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Preço</th>
          <th scope="col">Unidade de Medida</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.unidade }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Nenhum produto encontrado.</p>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default {
  name: 'AdicionarProdutos',
  setup() {
    const db = inject('db');
    const productName = ref('');
    const productPrice = ref('');
    const productUnidade = ref('');
    const products = ref([]);
    const filteredProducts = ref([]);
    const searchQuery = ref('');
    const showAllProducts = ref(false);

    const addProduct = async () => {
      try {
        await addDoc(collection(db, "produtos"), {
          name: productName.value,
          price: parseFloat(productPrice.value),
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

    const loadAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        products.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        filterProducts();
      } catch (e) {
        console.error("Erro ao carregar produtos: ", e);
      }
    };

    const searchProducts = () => {
      if (searchQuery.value) {
        const lowerCaseQuery = searchQuery.value.toLowerCase();
        filteredProducts.value = products.value.filter(product =>
          product.name.toLowerCase().includes(lowerCaseQuery)
        );
      } else if (showAllProducts.value) {
        filteredProducts.value = products.value;
      } else {
        filteredProducts.value = [];
      }
    };

    const toggleShowAllProducts = () => {
      showAllProducts.value = !showAllProducts.value;
      if (showAllProducts.value && products.value.length === 0) {
        loadAllProducts();
      } else {
        searchProducts();
      }
    };

    return {
      productName,
      productPrice,
      productUnidade,
      searchQuery,
      filteredProducts,
      showAllProducts,
      addProduct,
      loadAllProducts,
      searchProducts,
      toggleShowAllProducts
    };
  }
};
</script>

<style scoped>
/* Estilização personalizada aqui */
</style>