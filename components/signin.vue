<template>
    <!-- Sign In Start -->
<div class="container-fluid">
    <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6">
            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <a href="/" class="">
                        <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>E-VOUCHER</h3>
                    </a>
                    <h3>Sign In</h3>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.email" type="email" class="form-control" id="emailInput" placeholder="name@example.com">
                    <label for="emailInput">Email address</label>
                </div>
                <div class="form-floating mb-4">
                    <input v-model="dataPost.password" type="password" class="form-control" id="passwordInput" placeholder="Password">
                    <label for="passwordInput">Password</label>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <a href="">Forgot Password</a>
                </div>
                <button @click="postData(event)" type="submit" class="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                <p class="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p>
            </div>
        </div>
    </div>
</div>
<!-- Sign In End -->
</template>
<script>
import axios from 'axios';
    export default {
        data() {
            return {
                dataPost: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            postData(event) {
                event.preventDefault();
                axios.post(`/auth/login`, this.dataPost).then(response => {
                    window.location.href = '/';
                });
            }
        }
    }
    
</script>