import React from "react";
import AdminNav from "../Components/Admin/Nav/AdminNav";

const AdminLayout = props => {
    const { children } = props;
    return (
        <div className="admin_container">
            <div className="admin_left_nav">
                <AdminNav />
            </div>
            <div className="admin_right">{children}</div>
        </div>
    );
};

export default AdminLayout;
