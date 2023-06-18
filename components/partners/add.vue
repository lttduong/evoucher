<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="user-tbl">
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">Add User</h6>
        <form>
            <div class="mb-3">
                <label for="company" class="form-label">Company Name</label>
                <input v-model="dataPost.companyName" type="text" class="form-control" id="company" required>
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">Website</label>
                <input v-model="dataPost.website" type="text" class="form-control" id="website" required>
            </div>
            <div class="mb-3">
                <label for="roleSelect" class="form-label">User</label>
                <select v-model="dataPost.userId" class="form-select form-select-sm mb-3" id="roleSelect" required>
                    <option>Open this select menu</option>
                    <option v-for="user in data.users" :value="user.id">{{user.firstName}} {{ user.lastName }} ({{ user.email }})</option>
                </select>
            </div>
            
            <button @click="postData(event)" class="btn btn-primary">{{ this.data.partner ? 'Update' : 'Add' }}</button>
        </form>
    </div>
</div>
<!-- Table End -->
</template>
<script>
import axios from 'axios';
    export default {
        props: ['data'],
        data() {
            return {
                dataPost: {
                    companyName: '',
                    website: '',
                    userId: '',
                }
            }
        },
        mounted() {
            console.log(this.data);
            this.dataPost.companyName = this.data.partner.companyName ? this.data.partner.companyName : this.dataPost.companyName;
            this.dataPost.website = this.data.partner.website ? this.data.partner.website : this.dataPost.website;
            this.dataPost.userId = this.data.partner.userId ? this.data.partner.userId : this.dataPost.userId;
        },
        methods: {
            
            postData(event) {
                event.preventDefault();
                if(this.data.partner) {
                    axios.post(`/partners/update/${this.data.partner.id}`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/partners';
                    }); 
                } else {
                    axios.post(`/partners/add`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/partners';
                    });
                }
                
            }
        }
    }
    
</script>