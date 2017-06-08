<template>
<div class="">

<md-bottom-bar >
        <md-bottom-bar-item v-tooltip:left="{ html: 'Menú' }" v-if="$store.state.user" md-icon="menu"  @click.native.stop="drawer = !drawer"></md-bottom-bar-item>
        <md-bottom-bar-item v-tooltip:left="{ html: 'Home' }" :href="'/'"md-icon="home" md-active></md-bottom-bar-item>
        <md-bottom-bar-item v-tooltip:left="{ html: 'Promociones' }" :href="'/promociones'" md-icon="favorite" ></md-bottom-bar-item>
        <md-bottom-bar-item v-tooltip:right="{ html: 'Encuestas' }" :href="'/encuestas'" md-icon="near_me"></md-bottom-bar-item>

        <!-- <v-text-field  label="Search..." hide-details single-line></v-text-field> -->
      </md-bottom-bar>

      <v-navigation-drawer  temporary v-model="drawer" :mini-variant="mini" dark>
        <v-list class="pa-0">
          <v-list-item v-if="mini">
            <v-list-tile @click.native.stop="mini = !mini">
              <v-list-tile-action>
                <v-icon light>chevron_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img v-if="$store.state.user" :src="url+'getProfileImage/'+this.$store.state.user.urlUser+ '/'+this.$store.state.user.avatar" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-if="$store.state.user">{{$store.state.user.name}} {{$store.state.user.apellidos}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon light @click.native.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider light></v-divider>
          <v-list-item   >
            <v-list-tile v-if="$store.state.user" :href="'/'+$store.state.user.urlUser" >
              <v-list-tile-action>
                <v-icon light>person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Perfil</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>

          <v-list-item >
            <v-list-tile  @click.native="cerrarSession()">
              <v-list-tile-action>
                <v-icon light>power_settings_new</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Cerrar sesión</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


    </div>


</template>

<script>
import {UrlPictures} from './../env.js'

  export default {
    data () {
      return {
        drawer: null,
        mini: false,
        user:[],
        url:UrlPictures,
      }
  },
  watch:{

  },
  created(){
    // if (this.$auth.isAuthenticated()==true) {
    //   alert("tratando de ir por los datos");
    //   this.$http.get('api/user',function(res){
    //   }).then(res=>{
    //   console.log(res);
    //   this.auth=true;
    //   if (res.body.user.sucursal) {
    //     this.user=res.body.user;
    //   }else{
    //     this.user=res.body.user;
    //   }
    // })
    // }
    this.$store.watch(
        function (state) {
          console.log(state.user);
          return state.user
        },
        function () {
          console.log('hello i got triggered by a change in state.something')
        }
      )
  },
  computed:{
    users(){
      return this.$store.state.user;
    },

  },
  methods:{
    cerrarSession(){
      // alert("hola");
      this.$auth.destroyToken();
      // this.name="";
      // this.auth=false;
      this.$store.commit('DELETE_USER',null);
      this.$store.commit('DESTROY_TOKEN',null);

      this.$router.push("/login");
    },
    prueba(){
      // alert("hola");
      var us={name:'hola',age:12};
      this.$cookie.set('test', us.name, 1);
      // var newUser= jQuery.parseJSON(user.name);
      console.log(this.$cookie.get('test'));
      this.$store.commit('SET_AUTH',true);
      this.$store.state.auth=true;
    }
}
}
</script>

<style>

textarea {
    resize: none;
}
.post-image{
  max-width: 100%;

  background-size: 300px;
  /*height: 300px;*/
}
.post-image-container{
  /*height: 300px;*/
}
.post-image:hover{
  opacity:  .7;
}
.white-icon{
  color: white;
  width: 10px;
  height: 10px;
}
.certification-container{
  /*height: 10px;
  width: 10px;*/
}
.icon-checkmark {
  width: 10px;
  height: 10px;
}
.blue-circle{
  /*height: 100%;
  width: 100%;*/
  border-radius: 50%;
  padding: 5px;
  /*padding-top: 5px;*/

  background-color: #4080ff;
}
.profile-image-empresa{
  height: 150px;
  width: 150px;
}
.btn-transparent {
  border-style: none;
  /*padding: 5px;*/
  background: rgba(0,0,0,0.08);
  cursor: pointer;
}
.btn-transparent:hover{
  /*background-color: red;*/
}
.dropdown-menu-notification {
  position: absolute;
  overflow: scroll;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 267px;
  max-height: 400px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  overflow-y: scroll;

}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 900px;
  margin: 0px auto;*/
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;

  margin-bottom: 10px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 250px;
  overflow-y: scroll;
}

.modal-default-button {
  float: right;
}
.container-inside{
  margin-top: 52px;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.videoP{
  /*width: 1280;*/
  height: 300px;
}
.Imagen-Portada{
  width: 100%;
  margin-left: 0px;
  height: 300px;
  position: absolute;
}

.panel{
  background: rgba(255, 255, 255, 0.29);
}
.panel-perfil{
  margin-top: 140px;
  color: #FFF;
  background: rgba(255,255,255,0);
  background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.44) 100%);
  background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(0,0,0,0.44)));
  background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.44) 100%);
  background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.44) 100%);
  background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,0,0,0.44) 100%);
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.44) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 );
}

.father{
  /*background:#fff;*/
}
.btn-dropdown{
  margin-top: 6px;
  background: rgba(255, 255, 255, 0);
}
.btn-navbar{
  background: #fff;
  height: 32px;
  margin-top:7px;
}
.modulo-pregunta{
  padding: 10px;
  margin-bottom: 15px;
  background: rgba(11, 24, 177, 0.07);
  border-radius: 5px;
}
.navbar {
  margin-top: 0px;
  position: fixed;
  width: 100%;
  z-index: 1000;
  /*padding: 10px;*/
}

.text-line {
    width: 100%;
    background-color: transparent;
    color: #eeeeee;
    outline: none;
    outline-style: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid #eeeeee 1px;
    padding: 5px 10px;
}
.col-centered{
    float: none;
    margin: 0 auto;
}
/* enable absolute positioning */
.inner-addon {
    position: relative;
}

/* style icon */
.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .glyphicon  { left:  0px;}
.right-addon .glyphicon { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }
.btn-primary{
  /*width: 100%;*/
  background: #F8991D;
  border-radius:1px;
  border-color:#F8991D;
}
.pageNotFound{
  margin-top: 100px;
  width: 65%;
  padding-left: 40px;
}
.img-publicar{
  /*position: absolute;*/
  margin: 5px;
}
.text-container{
  border: none;
  resize: none;
  position:absolute;
  margin: 5px;
  display: contents;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: auto;
}
.publicacion-header{
  margin-top: 10px;
  /*height: 240px;*/
  /*position: relative;*/
}
.space{
  margin-bottom: 10px;
  margin-top: 10px;
}
.productCarrousel{
  margin-left: 100px;
  height: 100%;
}
.container-producto{
  width: 150px;
  height: 150px;
  display: inline-block;
  background: #002;
}
.navbar-img{
  width: 43px;
  height: 50px;
  margin-left: 45px;
}
.glyphicon{
  color: #000;
}
.left{
  text-align: left;
  /*margin-left: 1em;*/
}
.feature{
  padding-right: 20px;
  padding-left: 10px;
}
.thumnail-Emp{
  width: 50px;
  height: 50px;
}
.finalizar{
  margin-top: 10px;
  padding-bottom: 10px;
}
.stepwizard-step p {
    margin-top: 10px;
}

.login-container{
  position: absolute;
  height: 100%;
  padding: 30px;
  margin-left: 74.33%;
  margin-bottom: 0px;
  background: #333;
  z-index: 100;
}
.carousel-login{
  position: absolute;
  height: 100%;
}
.portada-Empresa{
  /*margin-bottom: 100px;*/
}
.perfil-Empresa{
  margin-bottom: 60px;
}
.datosEmpresa{
  margin-bottom: 45px;
}
.stepwizard-row {
    display: table-row;
}

.stepwizard {
    display: table;
    width: 100%;
    position: relative;
}

.stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
}
.background-grey{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #333;
}
.stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;

}

.stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
}
.form-control-input-tag{
  display: block;
  width: 100%;

  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.form-control-input-tag:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.form-registro-spaceing{
  /*margin-top: 20px;*/
  /*z-index: 1000px;*/
}
.forms{
  margin-top: 20px;
}
.row {
    /*margin-top: 40px;*/
}
.nav-Icon{
  color: #9d9d9d;
}
.thumnailImage{
  height: 50px;
  width: 50px;
}
.thumnailImage-Publicar{
  height: 100px;
  width: 100px;
}
.img-promo{
  width: 95%;
  margin-left: 20px;
  height: 300px;
}
.img-promo:hover{
  opacity: .7;
  cursor: pointer;
}
table tr.separator { height: 10px; }
/*jeje*/
header.navbar+nav.navbar{
/* margin-top: 20px;same margin-bottom .navbar */
}
.navbar.navbar-default.navbar-fixed-top{
margin-top: 50px;
}
.sidebar.navbar-fixed-top{
 margin-top: 100px;
}

@media (min-width: 768px) and (max-width: 998px){
    .navbar.navbar-default.navbar-fixed-top{
    margin-top: 100px;
    }
    .sidebar.navbar-fixed-top{
     margin-top: 150px;
    }
 }

/* Custom navbar default: global*/

.navbar.navbar-default{
 background-color: #f8f8f8;
 border-color: #e7e7e7;
 margin: 0;
 border-radius: 0;
}
.navbar.navbar-default .navbar-brand {
 color: #666;
 text-shadow: none;
 min-width: 150px;
 }
.navbar.navbar-default .navbar-nav > li > a {
 color: #666;
 text-shadow: none;
 }
 .navbar.navbar-default .navbar-nav > li > a {
 color: #666;
 text-shadow: none;
 }
 .navbar.navbar-default .navbar-nav > li > a:hover{
 color: #acc47f;
 }
 .navbar.navbar-default .navbar-nav > .active > a{
 color: #fff;
 background-color: #acc47f;
 }
 .navbar.navbar-default .navbar-nav > .active > a:hover{
 color: #608224;
 background-color: #acc47f;
 }
 .navbar.navbar-default .caret {
 border-top-color: #ccc;
 border-bottom-color: #ccc;
 }
 .navbar.navbar-default .caret:hover {
 border-top-color: #333;
 border-bottom-color: #333;
 }


/* Custom sidebar menu */

/*Remove rounded coners*/
.cursor{
  cursor: pointer;
}
nav.sidebar.navbar {
 border-radius: 0px;
}

nav.sidebar, .main{
 -webkit-transition: margin 200ms ease-out;
   -moz-transition: margin 200ms ease-out;
   -o-transition: margin 200ms ease-out;
   transition: margin 200ms ease-out;
}

/* Add gap to nav and right windows.*/
.main{
 padding: 10px 10px 0 10px;
}

/* .....NavBar: Icon only with coloring/layout.....*/

/*small/medium side display*/
@media (min-width: 768px) {

 /*Allow main to be next to Nav*/
 .main{
   position: absolute;
   width: calc(100% - 40px); /*keeps 100% minus nav size*/
   margin-left: 40px;
   float: right;
 }

 /*lets nav bar to be showed on mouseover*/
 nav.sidebar:hover + .main{
   margin-left: 200px;
 }

 /*Center Brand*/
 nav.sidebar.navbar.sidebar>.container .navbar-brand, .navbar>.container-fluid .navbar-brand {
   margin-left: 0px;
 }
 /*Center Brand*/
 nav.sidebar .navbar-brand, nav.sidebar .navbar-header{
   text-align: center;
   width: 100%;
   margin-left: 0px;
 }
 .mynoti{
   /*position: fixed;*/

   position: absolute;
   margin-left: -8px;
   margin-top: -6px;
   width:15px;
   height:15px;
   color: #fff;
   cursor: pointer;
   font-size: 12px;
   text-align: center;
   -webkit-box-sizing:border-box;
   border-radius: 50%;
   background-color:red ;
 }
.noti{

  color: #fff;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  /*-webkit-box-sizing:border-box;*/

}
 /*Center Icons*/
 nav.sidebar a{
   padding-right: 13px;
         min-width: 100px;
 }

 /*custom sidebar nav*/
     nav.sidebar ul.nav.navbar-nav{
         margin: 0;
     }
     nav.sidebar.navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
         color: white;
     }

 /*adds border top to first nav box */
 nav.sidebar .navbar-nav > li:first-child{
   border-top: 1px #e5e5e5 solid;
 }

 /*adds border to bottom nav boxes*/
 nav.sidebar .navbar-nav > li{
   border-bottom: 1px #e5e5e5 solid;
 }
 /*adds background on hover*/
 nav.sidebar .navbar-nav > li:hover{
     color: #fff;
         background-color: #43600E;
 }
 /*removes border last element*/
 nav.sidebar .navbar-nav > li.last{
   border-bottom: none;
 }

 /* Colors/style dropdown box*/
 nav.sidebar .navbar-nav .open .dropdown-menu {
   position: static;
   float: none;
   width: auto;
   margin-top: 0;
   background-color: transparent;
   border: 0;
   -webkit-box-shadow: none;
   box-shadow: none;
 }

 /*allows nav box to use 100% width*/
 nav.sidebar .navbar-collapse, nav.sidebar .container-fluid{
   padding: 0 0px 0 0px;
 }

 /*colors dropdown box text */
 .navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
   color: #777;
 }

/*O quanto o menu irá esconder á esquerda*/
 /*gives sidebar width/height*/
 nav.sidebar{
   width: 200px;
   height: 100%;
   margin-left: -270px;
   float: left;
   z-index: 8000;
   margin-bottom: 0px;
 }

 /*give sidebar 100% width;*/
 nav.sidebar li {
   width: 100%;
 }

 /* Move nav to full on mouse over*/
 nav.sidebar:hover{
   margin-left: 0px;
 }
 /*for hiden things when navbar hidden*/
 .forAnimate{
   opacity: 0;
 }
}

/* .....NavBar: Fully showing nav bar..... */

@media (min-width: 1330px) {

     /*Allow main to be next to Nav
 .main{
   width: calc(100% - 200px); keeps 100% minus nav size
   margin-left: 200px;
 }

 Show all nav
 nav.sidebar{
   margin-left: 0px;
   float: left;
 }
 Show hidden items on nav
 nav.sidebar .forAnimate{
   opacity: 1;
 }*/
}

nav.sidebar .navbar-nav .open .dropdown-menu>li>a:hover, nav.sidebar .navbar-nav .open .dropdown-menu>li>a:focus {
 color: #CCC;
 background-color: transparent;
}
.input-error{
  border-radius: 4px;
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  background-color: rgba(226,0,0,0.25);
}
nav:hover .forAnimate{
 opacity: 1;
}


/*---- FIM SLIDE MENU*/

.nav-side-menu {
overflow: auto;
font-family: verdana;
font-size: 12px;
font-weight: 200;
background-color: #222222;
position: fixed;
top: 70px;
width: 300px;
height: 100%;
color: #e1ffff;
}
.nav-side-menu .brand {
background-color: #222222;
line-height: 50px;
display: block;
text-align: center;
font-size: 14px;
}
.nav-side-menu .toggle-btn {
display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
list-style: none;
padding: 0px;
margin: 0px;
line-height: 35px;
cursor: pointer;
/*
 .collapsed{
    .arrow:before{
              font-family: FontAwesome;
              content: "\f053";
              display: inline-block;
              padding-left:10px;
              padding-right: 10px;
              vertical-align: middle;
              float:right;
         }
  }
*/
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
font-family: FontAwesome;
content: "\f078";
display: inline-block;
padding-left: 10px;
padding-right: 10px;
vertical-align: middle;
float: right;
}
.nav-side-menu ul .active,
.nav-side-menu li .active {
border-left: 3px solid #d19b3d;
background-color: #4f5b69;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
background-color: #181c20;
border: none;
line-height: 28px;
border-bottom: 1px solid #23282e;
margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
font-family: FontAwesome;
content: "\f105";
display: inline-block;
padding-left: 10px;
padding-right: 10px;
vertical-align: middle;
}
.nav-side-menu li {
padding-left: 0px;
border-left: 3px solid #2e353d;
border-bottom: 1px solid #23282e;
}
.nav-side-menu li a {
text-decoration: none;
color: #e1ffff;
}
.nav-side-menu li a i {
padding-left: 10px;
width: 20px;
padding-right: 20px;
}
.nav-side-menu li:hover {
border-left: 3px solid #d19b3d;
background-color: #4f5b69;
-webkit-transition: all 1s ease;
-moz-transition: all 1s ease;
-o-transition: all 1s ease;
-ms-transition: all 1s ease;
transition: all 1s ease;
}
@media (max-width: 767px) {
.nav-side-menu {
 position: relative;
 width: 100%;
 margin-bottom: 10px;
}
.nav-side-menu .toggle-btn {
 display: block;
 cursor: pointer;
 position: absolute;
 right: 10px;
 top: 10px;
 z-index: 10 !important;
 padding: 3px;
 background-color: #ffffff;
 color: #000;
 width: 40px;
 text-align: center;
}
.brand {
 text-align: left !important;
 font-size: 22px;
 padding-left: 20px;
 line-height: 50px !important;
}
}
@media (min-width: 767px) {
.nav-side-menu .menu-list .menu-content {
 display: block;
}

}
.dplayer .dplayer-controller .dplayer-icons .dplayer-icon {
  width: 30px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  opacity: .8;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block; }
  .dplayer-volume{
    height: 50px;
  }
</style>
