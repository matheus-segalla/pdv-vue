<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
      <img :src="logo" :alt="alt" i="logo"> 
    </router-link> 
    <router-link to="/pedidos">NOVO PEDIDO</router-link>
    <router-link to="/clientes">CLIENTES</router-link>
    <router-link to="/produtos">PRODUTOS</router-link>
  </div>
</template>


<script>
export default{
    name: "Navbar",
    props: ["logo", "alt"]
}
</script>


<style scoped>
#nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#nav a {
  color: #FCBA03;
  text-decoration: none;
  margin: 12px;
  transition: .5s;
}

#nav a:hover {
  color: #fff;
}

</style>