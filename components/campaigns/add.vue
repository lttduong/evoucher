<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="user-tbl">
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">Add Campaign</h6>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="dataPost.name" type="text" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <select v-model="dataPost.type" class="form-select form-select-sm mb-3" id="type" required>
                    <option>Open this select type</option>
                    <option value="short-term">Short term</option>
                    <option value="long-term">Long term</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select v-model="dataPost.status" class="form-select form-select-sm mb-3" id="status" required>
                    <option>Open this select status</option>
                    <option value="active">Active</option>
                    <option value="in_active">In-Active</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="startDate" class="form-label">Start date</label>
                <input v-model="dataPost.startDate" type="datetime-local" class="form-control" id="startDate" required>
            </div>
            <div class="mb-3">
                <label for="endDate" class="form-label">End date</label>
                <input v-model="dataPost.endDate" type="datetime-local" class="form-control" id="endDate" required>
            </div>
            <div class="mb-3">
                <label for="partnerId" class="form-label">Partner</label>
                <select v-model="dataPost.partnerId" class="form-select form-select-sm mb-3" id="partnerId" required>
                    <option selected>Open this select menu</option>
                    <option v-for="partner in data.partners" :value="partner.id">{{ partner.companyName }}</option>
                </select>
            </div>
            
            <button @click="postData(event)" class="btn btn-primary">{{ data.campaign ? 'Update' : 'Add' }}</button>
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
                    name: '',
                    type: '',
                    status: '',
                    startDate: '',
                    endDate: '',
                    partnerId: ''
                }
            }
        },
        mounted() {
            console.log(this.data);
            this.dataPost.name = this.data.campaign.name ? this.data.campaign.name : this.dataPost.name;
            this.dataPost.type = this.data.campaign.type ? this.data.campaign.type : this.dataPost.type;
            this.dataPost.status = this.data.campaign.status ? this.data.campaign.status : this.dataPost.status;
            this.dataPost.startDate = this.data.campaign.startDate ? this.data.campaign.startDate.slice(0, -5) : this.dataPost.startDate;
            this.dataPost.endDate = this.data.campaign.endDate ? this.data.campaign.endDate.slice(0, -5) : this.dataPost.endDate;
            this.dataPost.partnerId = this.data.campaign.partnerId ? this.data.campaign.partnerId : this.dataPost.partnerId;
        },
        methods: {
            
            postData(event) {
                event.preventDefault();
                if(this.data.campaign) {
                    axios.post(`/campaigns/update/${this.data.campaign.id}`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/campaigns';
                    }); 
                } else {
                    axios.post(`/campaigns/add`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/campaigns';
                    });
                }
            }
        }
    }
    
</script>