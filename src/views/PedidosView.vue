<template>
  <div class="container mt-5">
    <h1>Criar Pedido</h1>
    <form @submit.prevent="addOrder" class="mb-4">
      <div class="row g-3 align-items-center">
        <h3>BENEVIS MATERIAIS PARA COSNTRUÇÃO</h3>
        <div class="col-md-6">
          <select v-model="selectedClient" class="form-select" required>
            <option disabled value="">Selecione um Cliente</option>
            <option v-for="client in clients" :key="client.id" :value="client">{{ client.name }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <input v-model="orderDate" type="date" class="form-control" required />
        </div>
        <div class="col-md-6">
          <input v-model="address" class="form-control" placeholder="Endereço de Entrega" required />
        </div>
        <div class="col-md-6">
          <input v-model="phone" class="form-control" placeholder="Telefone" required />
        </div>
      </div>
    </form>

    <h2>Adicionar Produtos ao Pedido</h2>
    <div class="row g-3 align-items-center mb-4">
      <div class="col-md-4">
        <select v-model="selectedProduct" class="form-select">
          <option disabled value="">Selecione um Produto</option>
          <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <input v-model.number="productQuantity" type="number" class="form-control" placeholder="Quantidade" />
      </div>
      <div class="col-md-2">
        <button @click="addProductToOrder" class="btn btn-primary w-100">Adicionar Produto</button>
      </div>
    </div>

    <h2>Produtos do Pedido</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Quantidade</th>
          <th scope="col">Produto</th>
          <th scope="col">Preço Unitário</th>
          <th scope="col">Preço Total</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in orderProducts" :key="index">
          <td><input v-model.number="product.quantity" type="number" class="form-control" /></td>
          <td>{{ product.name }}</td>
          <td><input v-model.number="product.unitPrice" type="number" class="form-control" /></td>
          <td>{{ product.quantity * product.unitPrice }}</td>
          <td><button @click="removeProduct(index)" class="btn btn-danger">Remover</button></td>
        </tr>
      </tbody>
    </table>

    <button @click="saveOrder" class="btn btn-success mt-3">Salvar Pedido</button>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default {
  name: 'AdicionarPedidos',
  setup() {
    const db = inject('db');
    const clients = ref([]);
    const products = ref([]);
    const orderProducts = ref([]);
    
    const storeName = ref('');
    const selectedClient = ref(null);
    const orderDate = ref('');
    const address = ref('');
    const phone = ref('');
    const selectedProduct = ref(null);
    const productQuantity = ref(1);

    const addProductToOrder = () => {
      if (selectedProduct.value && productQuantity.value > 0) {
        const product = {
          ...selectedProduct.value,
          quantity: productQuantity.value,
          unitPrice: selectedProduct.value.price
        };
        orderProducts.value.push(product);
        selectedProduct.value = null;
        productQuantity.value = 1;
      }
    };

    const removeProduct = (index) => {
      orderProducts.value.splice(index, 1);
    };

    const saveOrder = async () => {
      try {
        const order = {
          storeName: storeName.value,
          client: selectedClient.value,
          orderDate: orderDate.value,
          address: address.value,
          phone: phone.value,
          products: orderProducts.value
        };
        await addDoc(collection(db, "pedidos"), order);
        alert("Pedido salvo com sucesso!");
      } catch (e) {
        console.error("Erro ao salvar pedido: ", e);
        alert("Erro ao salvar pedido.");
      }
    };

    onMounted(() => {
      const unsubscribeClients = onSnapshot(collection(db, "clientes"), (snapshot) => {
        clients.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
      const unsubscribeProducts = onSnapshot(collection(db, "produtos"), (snapshot) => {
        products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });

      return () => {
        unsubscribeClients();
        unsubscribeProducts();
      };
    });

    return {
      storeName,
      selectedClient,
      orderDate,
      address,
      phone,
      selectedProduct,
      productQuantity,
      clients,
      products,
      orderProducts,
      addProductToOrder,
      removeProduct,
      saveOrder
    };
  }
};
</script>

<style scoped>
/* Adicione estilizações personalizadas aqui, se necessário */
</style>