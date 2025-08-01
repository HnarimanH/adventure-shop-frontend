import React from "react";
import AdminDashboard from "../forms/adminDashboard";
import UserDashboard from "../forms/userDashboard";
function Dashboard(){
    
    return(
        <>
        {localStorage.getItem('is_superuser') === "true" ? <AdminDashboard /> : <UserDashboard/>}
        </>
    );
}




export default Dashboard;