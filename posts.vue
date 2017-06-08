  <template lang="html">
  <div class="row">

    <md-tabs md-fixed >
  <md-tab md-label="Publicar" md-icon="ondemand_video">
    <!-- <mPublicar v-if="vPublicar" :user="user" :publicar="publicar"></mPublicar> -->
    <mPublicar  :user="user" :publicar="publicar"></mPublicar>

  </md-tab>

  <md-tab md-label="Comparar precios" md-icon="music_note">
    <mEvaluar v-if="vEvaluar"></mEvaluar>
    <mComparar ></mComparar>

  </md-tab>


  <md-tab md-label="Evaluar empresa" md-icon="photo">
    <mComparar v-if="vComparar"></mComparar>
    <mEvaluar ></mEvaluar>

  </md-tab>
</md-tabs>


        <div class="panel panel-default container-inside" id="content">
            <div class="panel-body">
              <ul class="nav nav-tabs" id="panelEmpresarial">
                                      <li role="presentation" @click="fPublicar" id="perfilEmpresa"><a href="#">Publicar</a></li>
                                      <li role="presentation" @click="fComparar" id="sucursales" ><a href="#">Comparar precios</a></li>
                                      <li role="presentation" @click="fEvaluar" id="analisis" ><a href="#" >Evaluar empresa</a></li>
              </ul>
            </div>
        </div>


        <!-- <modal v-if="openModal" @close="openModal = false"  @compartir-Post="compartirPost()" :post="postToShare">
          <h3 slot="header">Compartir</h3>
        </modal> -->

          <!-- <my-post

            v-for="post in posts"
            @delete-Post="deletePo(post)"
            @like-Post="likePo(post)"
            @ver-Comentarios-Post="verComentariosPost(post)"
            @comentar-Post="comentarPo(post)"
            @open-Modal-Compartir="openModalToCompartirPost(post)"

            :post="post"
            :user="user"
            :peticionDe="'home'"
            :comentarios="post.comentarios"
            >
          </my-post> -->

          <v-post
          v-for="post in posts"
          @delete-Post="deletePo(post)"
          @like-Post="likePo(post)"
          @ver-Comentarios-Post="verComentariosPost(post)"
          @comentar-Post="comentarPo(post)"
          @open-Modal-Compartir="openModalToCompartirPost(post)"

          :post="post"
          :user="user"
          :peticionDe="'home'"
          :comentarios="post.comentarios"
          ></v-post>

        <button type="button" @click="watchMore()" class="btn btn-primary center"> Ver más</button>

  </div>

</template>

<script>
import modal from './modal.vue'
import Post from './v-post.vue'
import mPublicar from './../home/publicar.vue'
import mComparar from './../home/compararPrecios.vue'
import mEvaluar from './../home/EvaluarEmpresa.vue'
import swal from 'sweetalert'

export default {
    data(){
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          posts: [],
          postToShare:null,
          postsPropios: ['nombreEmpresa'],
          datosPublicacion : null,
          evaluar_panel: false,
          user:null,
          auth:false,

          openModal:false,
          vPublicar:true,
          vComparar:false,
          vEvaluar:false,
      }
    },
    components: {
      'my-post': Post,
      'mPublicar':mPublicar,
      'mComparar':mComparar,
      'mEvaluar':mEvaluar ,
      'modal':modal,
    },
    mounted(){
      //like-coment
    },
    created () {
      var data = {
        dato: "hola"
      }
      alert("va por los posts");
      this.$http.get("api/posts",data)
      .then(response=>{
        console.log(response.body);
          this.posts=response.body.posts;
          // this.postsPropios=response.body.postsPropios;
      })

    //   this.$http.get('api/user',function(res){
    //   }).then(res=>{
    //   console.log(res);
    //   this.user=res.body.user;
    //   this.auth=true;
    // })
    },
    watch :{
      'posts': function(){
        return this.posts;
      }
    },
    methods :{
      publicar (toPost){
        // recive el parametro texto del hijo para hacer el request.
        this.datosPublicacion="";
        if (toPost.recurso)
        {
              var data={
                texto: toPost.texto,
                idEmpresa:null,
                idSucursal:null,
                idUser:this.user.id,
                idUserFor:this.user.id,
                idActividad:1,
                recurso:toPost.recurso.idRecurso,
                tipoRecurso:toPost.recurso.tipoRecurso
              }
              // alert("es recurso");
        } else
        {
                var data={
                  publiacion: toPost,
                  idEmpresa:null,
                  idSucursal:null,
                  idUser:this.user.id,
                  idUserFor:this.user.id,
                  idActividad:1,
                }
        }


        this.$http.post("api/publicar", data )
        .then(response=>{
          console.log(response.body);

          var p = {
            id:response.body.miPublicacion.id,
            idUser:response.body.miPublicacion.idUser,
            text:response.body.miPublicacion.text,
            idPost:response.body.miPublicacion.idPost,
            created_at:response.body.miPublicacion.created_at,
            idActividad:response.body.miPublicacion.idActividad,
            recurso:response.body.recurso,
            user:{
              urlUser:this.user.urlUser,
              avatar:this.user.avatar,
              name:this.user.name
            }
          }
          // console.log(p);
          var arrayTemp=[];
          arrayTemp.push(p);
          for(var i =0; i<this.posts.length; i++){
            arrayTemp.push(this.posts[i]);
          }
          this.posts=arrayTemp;
          console.log(arrayTemp);
        })
      },
      onScroll(e, position){
        console.log(e);
        this.position=position;
      },
      fEvaluar(){
        this.vEvaluar=true;
        this.vPublicar=false;
        this.vComparar=false;
      },
      fComparar(){
        this.vEvaluar=false;
        this.vPublicar=false;
        this.vComparar=true;
      },
      fPublicar(){
        this.vEvaluar=false;
        this.vPublicar=true;
        this.vComparar=false;
      },
      evaluar(){
        this.evaluar_panel=!this.evaluar_panel;
      },
      watchMore(){
        var data = {
          dato: "watchMore"
        }
        this.$http.get("api/posts",data)
        .then(response=>{

            for (var i = 0; i < response.body.posts.length; i++) {
              this.posts.push(response.body.posts[i])
            }
        })
      },
      likePo(post){
        var data = {
            idPost:post.idPost
          }
          this.$http.post('api/likePost',data)
          .then(response=>{
            console.log(response.body);
            let mensaje=response.body.mensaje;
            if (mensaje=='like') {
              let index=this.posts.indexOf(post);
              this.posts[index].like=['liked'];
              // this.posts[index].liked=true;
              this.posts[index].likes=+1;
            }else if(mensaje=='dislike'){
              let index=this.posts.indexOf(post);
              this.posts[index].like=[];
              this.posts[index].likes=response.body.likes;
            }
          });
      },
      openModalToCompartirPost(post){

        if (post.post_compartido) {
            this.postToShare=post.post_compartido;
        }else{
          this.postToShare=post;
        }
        this.openModal=true;
      },
      compartirPost(){

        var data={
          idCompartido:this.postToShare.idPost,
          texto:this.postToShare.newText,
        }
          this.$http.post('api/compartirPost',data)
        .then(response=>{
          console.log(response.body);
          this.openModal=false;
          this.postToShare.newText="";
        });
      },
      //Metodo implementado de preferencia en el "post.vue" ya que no reacciona al cambiar sus datos
      verComentariosPost(post){
        var data={
          idPost:post.idPost
        }
          this.$http.post('api/getComentariosById',data)
        .then(response=>{
          console.log(response.body);
          var comentarios=response.body.comentarios;
          let index=this.posts.indexOf(post);
          this.posts[index].comentarios=comentarios;

        });
      },
      comentarPo(post){
        var data={
          idPost:post.idPost,
          comentario:post.comentario,
        }
          this.$http.post('api/comentarPost',data)
        .then(response=>{
          console.log(response.body);
          let index=this.posts.indexOf(post);
          this.posts[index].comentario="";
        });


      },

      deletePo(post){
        // alert("hola");
        swal({
              title: "Estás seguro?",
              text: "Ya no podrás recuperar el elemento!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Si",
              cancelButtonText: "No, cancelar",
              closeOnConfirm: false,
              closeOnCancel: true
            },
            function(isConfirm){
              // if (isConfirm) {
                var data = {
                  idPost:post.idPost
                }
                this.$http.post('api/deletePost',data)
                .then(response=>{
                  console.log(response.body);
                  let index=this.posts.indexOf(post);
                  this.posts.splice(index,1);
                  swal("Borrado!", "Tu publicación ha sido borrada.", "success");
                });
              // }
              // else if (!isConfirm) {
              //   swal("Cancelled", "Your imaginary file is safe :)", "error");
              //
              // }

            }.bind(this)
          );
        }
    }

}
</script>

<style lang="css">
</style>
