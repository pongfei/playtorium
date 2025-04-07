<template>
    <div>
      <h1>Shopping Cart</h1>
  
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ item.price }} THB
        </li>
      </ul>
  
      <h2>Discount Campaigns</h2>
      
      <button @click="applyFixedAmountDiscount">Apply Fixed Amount Discount</button>
      <button @click="applyPercentageDiscount">Apply Percentage Discount</button>
      <button @click="applyOnTopDiscount">Apply On Top Discount</button>
      <button @click="applySeasonalDiscount">Apply Seasonal Discount</button>
  
      <h2>Final Price: {{ finalPrice }} THB</h2>
      <button @click="resetDiscounts">Reset Discounts</button>

  
      <router-link to="/menu">Go to Menu Page</router-link>
    </div>
  </template>
  
  <script>
  
  export default {
  data() {
    return {
      cartItems: [],
      finalPrice: 0,
      appliedDiscounts: [],
      discountCampaigns: [
        { type: 'Fixed Amount', value: 50, applied: false },
        { type: 'Percentage', value: 10, applied: false },
        { type: 'On Top', category: 'Clothing', value: 15, applied: false },
        { type: 'Seasonal', value: { threshold: 300, discount: 40 }, applied: false }
      ]
    };
  },


  created: function () {
    const selectedItems = this.$route.query.items ? JSON.parse(this.$route.query.items) : [];
    this.cartItems = selectedItems;
    this.calculateTotal();
  },

  methods: {
    calculateTotal: function () {
      let total = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        total += this.cartItems[i].price;
      }

      this.finalPrice = total;
      this.originalPrice = total;
    },

    resetDiscounts: function () {
      for (let i = 0; i < this.discountCampaigns.length; i++) {
        this.discountCampaigns[i].applied = false;
      }
      this.appliedDiscounts = [];
      this.finalPrice = this.originalPrice;
    },

    applyFixedAmountDiscount: function () {
      if (!this.appliedDiscounts.includes('Coupon')) {
      
        const fixedAmountCampaign = this.discountCampaigns.find(function (campaign) {
          return campaign.type === 'Fixed Amount';
        });

        const percentageCampaign = this.discountCampaigns.find(function (campaign) {
          return campaign.type === 'Percentage';
        });

        if (fixedAmountCampaign && !fixedAmountCampaign.applied) {
          this.finalPrice -= fixedAmountCampaign.value;
          fixedAmountCampaign.applied = true;
          this.appliedDiscounts.push('Coupon'); 
        } else if (percentageCampaign && !percentageCampaign.applied) {
          this.finalPrice -= (this.finalPrice * (percentageCampaign.value / 100));
          percentageCampaign.applied = true;
          this.appliedDiscounts.push('Coupon');
        }
      } else {
        alert('You can only apply one coupon discount (Fixed Amount or Percentage).');
      }
    },

    applyOnTopDiscount: function () {
      if (!this.appliedDiscounts.includes('On Top')) {
        const onTopDiscount = this.discountCampaigns.find(function (campaign) {
          return campaign.type === 'On Top' && campaign.category === 'Clothing';
        });

        if (onTopDiscount && !onTopDiscount.applied) {
          this.finalPrice -= (this.finalPrice * (onTopDiscount.value / 100));
          onTopDiscount.applied = true;
          this.appliedDiscounts.push('On Top');
        }
      } else {
        alert('On Top discount has already been applied.');
      }
    },

    applySeasonalDiscount: function () {
      if (!this.appliedDiscounts.includes('Seasonal')) {
        const seasonalDiscount = this.discountCampaigns.find(function (campaign) {
          return campaign.type === 'Seasonal';
        });

        if (seasonalDiscount && !seasonalDiscount.applied) {
          // manually calculate total
          let total = 0;
          for (let i = 0; i < this.cartItems.length; i++) {
            total += this.cartItems[i].price;
          }

          let discount = 0;
          if (total > seasonalDiscount.value.threshold) {
            discount = Math.floor(total / seasonalDiscount.value.threshold) * seasonalDiscount.value.discount;
          }

          this.finalPrice -= discount;
          seasonalDiscount.applied = true;
          this.appliedDiscounts.push('Seasonal');
        }
      } else {
        alert('Seasonal discount has already been applied.');
      }
    }
  }
};
</script>
  
  <style scoped>

  h1 {
    color: #333;
  }

  h2{
    color: black;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
    color: black;
  }
  button {
    margin: 5px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  router-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px;
    background-color: #2196F3;
    color: white;
    text-decoration: none;
  }
  router-link:hover {
    background-color: #1E88E5;
  }
  </style>