<template>
  <div class="notfound">
   <h1 id='sm'>:(</h1>
   <h2 id="err">404 Erorr</h2>
    <h2 id="text">Страница не найдена</h2>
  </div>
</template>

<script>
export default {
    name: "PageNotFound",
}
</script>
<style scoped>
 .notfound{
    padding-left: 20%;
 }
 #sm{
   font-size: 1000%;
   background: -webkit-linear-gradient(#647ce6, #1f266d);
   -webkit-background-clip: text;
   background-clip: text;
  -webkit-text-fill-color: transparent;
 } 
 #err{
   font-size: 500%;
   background: -webkit-linear-gradient(#647ce6, #171e6b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
 } 
 #text{
     font-size: 200%;
     background: -webkit-linear-gradient(#26326b, #171e6b);
     -webkit-background-clip: text;
     background-clip: text;
    -webkit-text-fill-color: transparent;
 }
</style>