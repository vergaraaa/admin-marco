<template>
    <div class="container mt-5">
        <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-3"></i>
            <strong> {{error}}</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="row">
            <div class="col-md-4 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.email">
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
                            </div>
                            <div class="d-grid col-6 mx-auto">
                                <button type="submit" class="btn btn-primary"> Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return {
            form: {
                email: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        async handleLogin(){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.form)
            };
            const response = await fetch("https://api-marco.herokuapp.com/api/users/login", requestOptions);
            const data = await response.json();
            console.log(data);
            if(data.token){
                localStorage.setItem("token", data.token);
                this.$router.push({ name: 'Home' });
                this.$router.go();
            }
            else{
                this.error = data.message;
                this.form.password = '';
                this.$router.push({ name: 'Login' });
            }
        }
    }
}
</script>

<style>

</style>