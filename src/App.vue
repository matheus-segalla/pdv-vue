<template>
  <Navbar :logo="logo_src" :alt="app_name"/>
  <router-view/>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, onSnapshot, collection, doc, dleteDoc, setDoc, addDoc, orderBy, query} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt67DCLAHtPgkR16aLyxcYAIoqSMXBbCs",
  authDomain: "benevis-pdv.firebaseapp.com",
  projectId: "benevis-pdv",
  storageBucket: "benevis-pdv.appspot.com",
  messagingSenderId: "516414116841",
  appId: "1:516414116841:web:440a688b421f8492387178",
  measurementId: "G-PKVNHX30BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  provide(){
    return {
      db
    }
  },
  
  data(){
    return{
      logo_src: "/img/logo.png",
      app_name: "Faça seu pedido"
    }
  },
 
}
</script>
<style>
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}

</style>
