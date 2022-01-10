<template>
    <!-- SI YA CARGÓ LA EXPO O ESTÁS CREANDO UNA NUEVA -->
    <template v-if="expo.name || !id">
        <div class="row">
            <form @submit.prevent="handleUpload" enctype="multipart/form-data"> 
                <div class="row">
                    <!-- ROW FOR IMAGES -->
                    <div class="row">
                        <div class="col-md-4">
                            <!-- IMAGEN DE PORTADA FROM NEW EXPO -->
                            <img v-if="coverImage || !isNewExpo" :src="coverImage" class="d-block w-100 mb-3" style="height: 15rem;">

                            <!-- INPUT FROM EXPO -->
                            <input v-if="isNewExpo" type="file" accept="image/*" class="form-control mb-3" name="file" id="file" @change="onFileChange" required :disabled="!isEditing">
                            <input v-else type="file" accept="image/*" class="form-control mb-3" name="file" id="file" @change="onFileChange" :disabled="!isEditing">
                            <p class="form-text mb-3">Esta será la imagen que aparecerá como portada de la exposición.</p>
                        </div>
                        <div class="col-md-4">
                            <!-- CARROUSEL IMAGES -->
                        <template v-if="images.length">
                            <div class="row mb-3">
                                <div id="carouselImages" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <!-- IF IMAGES FROM NEW EXPO -->
                                        <template v-if="images.length">
                                            <div v-for="(image, index) in images" :key="index"  class="carousel-item" :class="index === 0 ? 'active': ''">
                                                <img :src="image" class="d-block w-100" style="height:15rem;">
                                            </div>
                                        </template>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </template>

                        <!-- INPUT IMAGES -->
                        <input v-if="isNewExpo" type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" multiple required :disabled="!isEditing">
                        <input v-else type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" multiple :disabled="!isEditing">
                        <p class="form-text mb-3">Otras imágenes de la exposición.</p>
                        </div>
                        <div class="col-md-4">
                            <!-- CARROUSEL SPONSORS -->
                            <template v-if="sponsors.length">
                                <div class="row mb-3">
                                    <div id="carouselSponsors" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            <!-- IF IMAGES FROM NEW EXPO -->
                                            <template v-if="sponsors.length">
                                                <div v-for="(image, index) in sponsors" :key="index"  class="carousel-item" :class="index === 0 ? 'active': ''">
                                                    <img :src="image" class="d-block w-100" style="height:8rem;">
                                                </div>
                                            </template>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselSponsors" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselSponsors" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </template>
                            
                            <!-- INPUT SPONSORS -->
                            <input type="file" accept="image/*" class="form-control mb-3" name="sponsors" id="sponsors" @change="onFileChange" multiple :disabled="!isEditing">
                            <p class="form-text mb-3">Imágenes de los patrocinadores si aplica.</p>
                        </div>
                    </div>
                    
                    <!-- ROW FOR STATE -->
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="btn-group w-25 mb-3" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" 
                                    v-model="expo.state" :checked="expo.state === 'past'" value="past" :disabled="!isEditing">
                                <label class="btn btn-outline-secondary" for="btnradio1">Pasada</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" 
                                    v-model="expo.state" :checked="expo.state === 'current' || isNewExpo" value="current" :disabled="!isEditing">
                                <label class="btn btn-outline-secondary" for="btnradio2">Actual</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" 
                                    v-model="expo.state" :checked="expo.state === 'upcoming'" value="upcoming" :disabled="!isEditing">
                                <label class="btn btn-outline-secondary" for="btnradio3">Próxima</label>
                            </div>
                        </div>
                    </div>

                    <!-- ROW FOR DATA -->
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="name" class="form-label">Nombre de la exposición:</label>
                                <input type="text" class="form-control" id="name" v-model="expo.name" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="author" class="form-label">Autor:</label>
                                <input type="text" class="form-control" id="author" v-model="expo.author" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="startDate" class="form-label">Fecha de inicio:</label>
                                <input type="text" class="form-control" id="startDate" v-model="expo.startDate" :disabled="!isEditing" required placeholder="Ex. 20 de Octubre de 2020">
                            </div>
                            <div class="mb-3">
                                <label for="endDate" class="form-label">Fecha de conclusión:</label>
                                <input type="text" class="form-control" id="endDate" v-model="expo.endDate" :disabled="!isEditing" required placeholder="Ex. 20 de Octubre de 2020">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="authorCapsuleURL" class="form-label">URL de la cápsula del autor:</label>
                                <input type="text" class="form-control" id="authorCapsuleURL" v-model="expo.authorCapsuleURL" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="virtualTourURL" class="form-label">URL del tour virtual:</label>
                                <input type="text" class="form-control" id="virtualTourURL" v-model="expo.virtualTourURL" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="curatorship" class="form-label">Curadores:</label>
                                <input type="text" class="form-control" id="curatorship" v-model="expo.curatorship" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="audio" class="form-label">Audio:</label>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <input v-if="isNewExpo" type="file" class="form-control" name="audio" id="audio" accept="audio/*" @change="onFileChange" :disabled="!isEditing" required>
                                        <input v-else type="file" class="form-control" name="audio" id="audio" accept="audio/*" @change="onFileChange" :disabled="!isEditing">
                                    </div>
                                    <div class="col-md-6">
                                        <audio class="form-control" :src="audio" controls></audio>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="museography" class="form-label">Museografía:</label>
                                <input type="text" class="form-control" id="museography" v-model="expo.museography" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Ubicación:</label>
                                <input type="text" class="form-control" id="location" v-model="expo.location" :disabled="!isEditing" required>
                            </div>
                            <div class="mb-3">
                                <label for="totalPieces" class="form-label">Total de piezas:</label>
                                <input type="text" class="form-control" id="totalPieces" v-model="expo.totalPieces" :disabled="!isEditing" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="technique" class="form-label">Técnica:</label>
                                <input type="text" class="form-control" id="technique" v-model="expo.technique" :disabled="!isEditing" required>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                <label for="description" class="form-label">Descripción:</label>
                                <textarea class="form-control" id="description" rows="5" v-model="expo.description" :disabled="!isEditing" required></textarea>
                            </div>  
                        </div>
                    </div>

                    <div class="row">
                        <div class="row mb-5">
                            <div class="col-md-12">
                                <!-- BOTONES -->
                                <!-- SI ES NUEVA EXPO -->
                                <template v-if="!id">
                                    <div class="d-grid col-4 mx-auto">
                                        <button class="btn btn-success" type="submit">Guardar</button>
                                    </div>
                                </template>
                                <!-- SI YA EXISTE LA EXPO -->
                                <template v-else-if="expo.name">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button v-if="isEditing" type="submit" class="btn btn-success px-5">
                                            Guardar 
                                        </button>
                                        <button v-else type="button" class="btn btn-primary px-5" @click="handleClickToggle">
                                            Editar
                                        </button>
                                        <!-- BUTTON TRIGGER MODAL -->
                                        <button v-if="isEditing" type="button" class="btn btn-danger px-5" @click="handleClickToggle">
                                            Cancelar
                                        </button>
                                        <button v-else type="button" class="btn btn-danger px-5" data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete">
                                            Eliminar
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            
        <!-- MODAL -->
        <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalCenterTitle">¿Estás seguro de que quieres eliminar {{expo.name}} de {{expo.author}}?</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta acción será permanente y no podrá revertirse.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteExpo">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <!-- SI NO HA CARGADO LA EXPO -->
    <template v-else>
        <div class="row">
            <div class="d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </template>
</template>

<script>

class Expo {
        constructor(name, author, startDate, endDate, description, virtualTourURL, state, authorCapsuleURL, images, audio, curatorship, museography, location, technique, totalPieces, sponsors) {
            this.name = name;
            this.author = author;
            this.startDate = startDate;
            this.endDate = endDate;
            this.description = description;
            this.virtualTourURL = virtualTourURL;
            this.state = state;
            this.authorCapsuleURL = authorCapsuleURL
            this.images = images;
            this.audio = audio;
            this.curatorship = curatorship;
            this.museography = museography;
            this.location = location;
            this.technique = technique;
            this.totalPieces = totalPieces;
            this.sponsors = sponsors;
        }
    }

export default {
    // FALTA CAMBIAR LOGICA DEL CARROUSEL 
    props: ["id"],
    name: 'ExpoForm',
    data() {
        return {
            expo: new Expo(),
            isNewExpo: true,
            isEditing: true,
            coverImage: "",
            images: [],
            sponsors: [],
            audio: ''
        }
    },
    created (){
        if(this.id){
            this.getExpo();
            this.isNewExpo = false;
            this.isEditing = false;
        }
    },
    methods: {
        async getExpo(){
            const response = await fetch("http://100.24.228.237:10021/api/expos/" + this.id );
            const data = await response.json();
            this.expo = new Expo(
                data.name,
                data.author,
                data.startDate,
                data.endDate,
                data.description,
                data.virtualTourURL,
                data.state,
                data.authorCapsuleURL,
                data.images,
                data.audio,
                data.curatorship,
                data.museography,
                data.location,
                data.technique,
                data.totalPieces,
                data.sponsors
            );
            this.coverImage = this.expo.images[0];
            this.images = [];
            this.audio = this.expo.audio;
            for(let i = 1; i < this.expo.images.length; i++){
                this.images.push(this.expo.images[i]);
            }
            for(let i = 1; i < this.expo.images.length; i++){
                this.sponsors.push(this.expo.sponsors[i]);
            }
            console.log(this.expo)
        },
        async deleteExpo(){
            const requestOptions = {
                method: "DELETE"
            }
            // await fetch("https://api-marco.herokuapp.com/api/expos/" + this.id, requestOptions);
            // await fetch("http://localhost:3000/api/expos/" + this.id, requestOptions);
            // await fetch("http://172.31.0.24:10021/api/expos/" + this.id, requestOptions);
            await fetch("http://100.24.228.237:10021/api/expos/" + this.id, requestOptions);
            this.$router.push({ name: "Expos" });
        },
        handleClickToggle(){
            if(this.isEditing){
                this.getExpo();
            }
            this.handleToggle();
            document.getElementById("files").value = "";
            document.getElementById("file").value = "";
            document.getElementById("audio").value = "";
            document.getElementById("sponsors").value = "";
        },
        async handleUpload() {
            const formData = new FormData();

            if(!this.isNewExpo){
                if(this.audio === this.expo.audio){
                    formData.append("audio", this.audio);
                }
                else{
                    formData.append("files", document.getElementById("audio").files[0]);
                }

                if(this.coverImage === this.expo.images[0]){
                    formData.append("coverImage", this.coverImage);
                }
                else{
                    formData.append("files", document.getElementById("file").files[0]);
                }

                const expoImages = this.expo.images;
                expoImages.shift();
                if(this.images[0] === expoImages[0]){
                    for (var i = 0; i < this.images.length; i++) {
                        formData.append('otherImages[]', this.images[i]);
                    }
                }
                else{
                    for (const i of Object.keys(document.getElementById("files").files)) {
                        formData.append("files", document.getElementById("files").files[i]);
                    }
                }
            }
            else{
                console.log(this.sponsors);
                formData.append("files", document.getElementById("file").files[0]);
                formData.append("files", document.getElementById("audio").files[0]);
                for (const i of Object.keys(document.getElementById("files").files)) {
                    formData.append("files", document.getElementById("files").files[i]);
                }
                for (const i of Object.keys(document.getElementById("sponsors").files)) {
                    formData.append("files", document.getElementById("sponsors").files[i], "sponsor:" + document.getElementById("sponsors").files[i].name);
                }
            }

            formData.append("name", this.expo.name);
            formData.append("author",this.expo.author);
            formData.append("startDate", this.expo.startDate);
            formData.append("endDate", this.expo.endDate);
            formData.append("description", this.expo.description);
            formData.append("virtualTourURL", this.expo.virtualTourURL);
            formData.append("state", this.expo.state);
            formData.append("authorCapsuleURL", this.expo.authorCapsuleURL);
            formData.append("curatorship", this.expo.curatorship);
            formData.append("museography", this.expo.museography);
            formData.append("location", this.expo.location);
            formData.append("technique", this.expo.technique);
            formData.append("totalPieces", this.expo.totalPieces);

            const requestOptions = {
                method: this.isNewExpo ? "POST" : "PUT",
                body: formData
            }
            if(this.isNewExpo){
                // const response = await fetch("https://api-marco.herokuapp.com/api/expos/", requestOptions);
                // await fetch("http://localhost:3000/api/expos/", requestOptions);
                // await fetch("http://172.31.0.24:10021/api/expos/", requestOptions);
                await fetch("http://100.24.228.237:10021/api/expos/", requestOptions);
                this.$router.push({ name: "Expos" });
            }
            else{
                // const response = await fetch("https://api-marco.herokuapp.com/api/expos/", requestOptions);
                // await fetch("http://localhost:3000/api/expos/" + this.id, requestOptions);
                await fetch("http://100.24.228.237:10021/api/expos/" + this.id, requestOptions);
                this.$router.go();
            }
            
        },
        handleToggle(){
            this.isEditing = !this.isEditing;
        },
        onFileChange(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            var reader;

            if(input.name === "file"){
                reader = new FileReader();
                this.coverImage = event.target.result;
                reader.onload = (e) => {
                    this.coverImage = e.target.result;
                }
                reader.readAsDataURL(input.files[index]);
                index++;
            }
            else if(input.name === "files"){
                this.images = [];
                while(count--) {
                    reader = new FileReader();
                    reader.onload = (e) => {
                        this.images.push(e.target.result);
                    }
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
            else if(input.name === "audio"){
                this.audio = "";
                reader = new FileReader();
                this.audio = event.target.result;
                reader.onload = (e) => {
                    this.audio = e.target.result;
                }
                reader.readAsDataURL(input.files[index]);
                index++;
            }
            else if(input.name === "sponsors"){
                this.sponsors = [];
                while(count--) {
                    reader = new FileReader();
                    reader.onload = (e) => {
                        this.sponsors.push(e.target.result);
                    }
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
        }
    }//,
    // computed:{
    //     getOtherImages(){
    //         if(this.isNewExpo){
    //             return this.images.filter((image, index) => index > 0);
    //         }
    //         else{
    //             if(this.images.length <= 1){
    //                 return this.expo.images.filter((image, index) => index > 0);
    //             }
    //             else{
    //                 return this.images.filter((image, index) => index > 0);
    //             }
    //         }
    //     }
    // }
}
</script>

<style>
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}

</style>
