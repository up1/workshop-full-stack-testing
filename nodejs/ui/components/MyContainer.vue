<template>
    <div class="container">
      <slot />
    </div>
  </template>
  
  <style scoped>
  .container {
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  @media (min-width: 544px) {
    .container {
      max-width: 576px;
    }
  }
  
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  
  @media (min-width: 992px) {
    .container {
      max-width: 940px;
    }
  }
  
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  </style>