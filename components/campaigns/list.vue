<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="partner-tbl">
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h6 class="mb-4 title">User
                    <a href="/campaigns/add" class="btn btn-square btn-outline-success m-2 btn-add">
                        <i class="fa fa-plus"></i>
                    </a>
                </h6>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Start date</th>
                                <th scope="col">End date</th>
                                <th scope="col">Partner</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="campaign in data.campaigns">
                                <th scope="row">{{ campaign.id }}</th>
                                <td>{{ campaign.name }}</td>
                                <td>{{ campaign.type == 'short-term' ? 'Short Time' : 'Long Time' }}</td>
                                <td>{{ campaign.status == 'active' ? 'Active' : 'In Active' }}</td>
                                <td>{{ campaign.startDate.slice(0,10) }}</td>
                                <td>{{ campaign.endDate.slice(0,10) }}</td>
                                <td>{{ campaign.partnerId }}</td>
                                <td>
                                    <div class="bg-light rounded">
                                        <div class="btn-group" role="group">
                                            <a @click="deleteUCampaign('/campaigns/delete/'+campaign.id)" class="btn btn-danger">Delete</a>
                                            <a :href="'/campaigns/edit/'+campaign.id" class="btn btn-primary">Update</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Table End -->
</template>

<script>
import axios from 'axios';
    export default {
        props: ['data'],
        methods: {
            deleteUCampaign(url) {
                axios.get(url).then(response => {
                    alert(response.data.message)
                    window.location.reload();
                });
            }
        }
    }
</script>