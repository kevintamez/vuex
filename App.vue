<template>
  <div  id="app">
    <!-- <meta id="token"  value="{{ csrf_token() }}">  -->
    <v-app>
      <input type="hidden" id="miToken" name="" :value="token">

      <navbar></navbar>
      <!-- <main> -->
        <!-- <v-container fluid> -->
          <router-view></router-view>
        <!-- </v-container> -->
      <!-- </main> -->
      <!-- <v-footer></v-footer> -->
    </v-app>
  </div>

</template>

<script>
  import Navbar from './components/v-navbar.vue'

  export default {
    components: {
      'navbar': Navbar
    },
    data (){
      return {
        token:this.$auth.generateToken(),
        user:null,
        auth:false,
      }
    },
    computed:{
      getData: function(){
        //alert("Computed");
        
      //   this.$http.get('api/user',function(res){
      //   }).then(res=>{
      //   console.log(res);
      //   this.user=res.body.user;
      //   this.auth=true;
      // })
        this.$http.post('api/getDataInlogin',data).then(response=>{
          console.log(response.body);
          var u = response.body.user;
          this.$store.state.isAutenticated=true;
          this.$store.commit('ADD_DATA',u);
        })
      }
    },
  }
</script>

<style>
.panel-body{
    padding:10px
}
</style>
