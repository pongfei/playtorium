<template>
    <div>
      <h1>Menu Items</h1>
      <ul>
        <li v-for="item in menuItems" :key="item.id">
            <input type="checkbox" v-model="selectedItems" :value="item" />
          {{ item.name }} - {{ item.price }} THB
        </li>
      </ul>
      <button @click="goToDiscountPage">Go to Discount Page</button>
    </div>
  </template>
  
  <script>
  export default {

    //Hardcode the items
    data() {
      return {
        menuItems: [
          { id: 1, name: 'Shirt', price: 350 },
          { id: 2, name: 'Hoodie', price: 700 },
          { id: 3, name: 'Watch', price: 850 },
          { id: 4, name: 'Bag', price: 640 },
          { id: 5, name: 'Belt', price: 230 },
        ],
        selectedItems: [],
      };
    },
    methods:{
        goToDiscountPage() {
            if(this.selectedItems == 0){
                alert('Please select at least one item before proceeding to the discount page.');
            }
            else{
                this.$router.push({ name: 'Shopping', query: { items: JSON.stringify(this.selectedItems) } });
            }
        }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
    color: black;
  }
  </style>