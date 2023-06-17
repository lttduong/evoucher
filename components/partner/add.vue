<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="partner-tbl">
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">Add Partner</h6>
        <form>
            <div class="mb-3 row">
                <div class="col-12 col-xl-6">
                    <label for="firstNameInput" class="form-label">First name</label>
                    <input type="firstName" class="form-control" id="firstNameInput" required {{#if data }} value="{{data.firstName}}" {{/if}}>
                </div>
                <div class="col-12 col-xl-6">
                    <label for="lastNameInput" class="form-label">Last name</label>
                    <input type="lastName" class="form-control" id="lastNameInput" required {{#if data }} value="{{data.lastName}}" {{/if}}>
                </div>
            </div>
            <div class="mb-3">
                <label for="userNameInput" class="form-label">User name</label>
                <input type="userName" class="form-control" id="userNameInput" {{#if data }} value="{{data.userName}}" {{/if}}>
            </div>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email address</label>
                <input type="email" class="form-control" id="emailInput" {{#if data }} value="{{data.mail}}" {{/if}}>
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="password" class="form-control" id="passwordInput" {{#if data }} value="{{data.password}}" {{/if}}>
            </div>
            <div class="mb-3">
                <label for="roleSelect" class="form-label">Role</label>
                <select class="form-select form-select-sm mb-3" id="roleSelect">
                    <option>Open this select menu</option>
                    <option value="admin" {{#ifCond data.role '==' 'admin' }} selected {{/ifCond}}>Admin</option>
                    <option value="partner" {{#ifCond data.role '==' 'partner' }} selected {{/ifCond}}>Partner</option>
                    <option value="supperMan" {{#ifCond data.role '==' 'supperMan' }} selected {{/ifCond}}>Supper Man</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    </div>
</div>
<!-- Table End -->
</template>