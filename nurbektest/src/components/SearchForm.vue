<template>
    <div>
      <form @submit.prevent="search">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Number:</label>
          <input v-model="number" type="text" @input="validateNumber" placeholder="Enter number" />
          <span v-if="numberError" class="error">{{ numberError }}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div v-if="results.length">
        <h3>Results:</h3>
        <ul>
          <li v-for="result in results" :key="result.email">
            {{ result.email }} - {{ formatNumber(result.number) }}
          </li>
        </ul>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const number = ref('');
  const results = ref([]);
  let controller = new AbortController(); 
  
  const search = async () => {
  errorMessage.value = '';

if (!email.value) {
  errorMessage.value = 'Email is required.';
  return;
}

controller.abort();

controller = new AbortController();

try {
  const response = await axios.post('http://localhost:3000/search',
    { email: email.value, number: number.value },
    { signal: controller.signal }
  );

  
  if (response.data.length === 0) {
    errorMessage.value = 'No matching results found.';
  } else {
    results.value = response.data;
  }
} catch (error) {
  if (error.name !== 'CanceledError') {
    console.error(error);
  }
}
  };
  
  const formatNumber = (number) => {
    
    return number.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
  };
  const numberError = ref('');

  const validateNumber = () => {
  const regex = /^\d*$/; 
  if (!regex.test(number.value)) {
    numberError.value = 'Please enter only numbers.';
    number.value = number.value.replace(/[^\d]/g, ''); 
  } else {
    numberError.value = '';
  }
};

const errorMessage = ref('');

  </script>
  
