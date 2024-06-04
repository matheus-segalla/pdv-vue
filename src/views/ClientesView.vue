<template>
  <div class="container mt-5">
    <h1>Adicionar Cliente</h1>
    <form @submit.prevent="addClient" class="mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-6">
          <input v-model="clientName" class="form-control" placeholder="Nome do Cliente" required />
        </div>
        <div class="col-md-6">
          <input v-model="clientEmail" class="form-control" placeholder="Email do Cliente" required />
        </div>
        <div class="col-md-6">
          <input v-model="clientPhone" class="form-control" placeholder="Telefone do Cliente" required />
        </div>
        <div class="col-md-6">
          <input v-model="clientStreet" class="form-control" placeholder="Rua" required />
        </div>
        <div class="col-md-4">
          <input v-model="clientCity" class="form-control" placeholder="Cidade" required />
        </div>
        <div class="col-md-2">
          <input v-model="clientState" class="form-control" placeholder="Estado" required />
        </div>
        <div class="col-md-6">
          <button type="submit" class="btn btn-primary w-100">Adicionar Cliente</button>
        </div>
      </div>
    </form>
    <h2>Lista de Clientes</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Telefone</th>
          <th scope="col">Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.street }}, {{ client.city }} - {{ client.state }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default {
  name: 'AdicionarClientes',
  setup() {
    const db = inject('db');
    const clients = ref([]);
    const clientName = ref('');
    const clientEmail = ref('');
    const clientPhone = ref('');
    const clientStreet = ref('');
    const clientCity = ref('');
    const clientState = ref('');

    const addClient = async () => {
      try {
        await addDoc(collection(db, "clientes"), {
          name: clientName.value,
          email: clientEmail.value,
          phone: clientPhone.value,
          street: clientStreet.value,
          city: clientCity.value,
          state: clientState.value
        });
        clientName.value = '';
        clientEmail.value = '';
        clientPhone.value = '';
        clientStreet.value = '';
        clientCity.value = '';
        clientState.value = '';
        alert("Cliente adicionado com sucesso!");
      } catch (e) {
        console.error("Erro ao adicionar cliente: ", e);
        alert("Erro ao adicionar cliente.");
      }
    };

    onMounted(() => {
      const unsubscribe = onSnapshot(collection(db, "clientes"), (snapshot) => {
        clients.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });

      return () => unsubscribe();
    });

    return {
      clientName,
      clientEmail,
      clientPhone,
      clientStreet,
      clientCity,
      clientState,
      addClient,
      clients
    };
  }
};
</script>

<style scoped>
/* Adicione estilizações personalizadas aqui, se necessário */
</style>