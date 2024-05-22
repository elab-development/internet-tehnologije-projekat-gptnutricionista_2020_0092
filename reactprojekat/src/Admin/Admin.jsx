import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUsers, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/admin', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the admin data!', error);
        });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Prepare data for the line chart
    const chartData = {
        labels: data.monthly_new_users.map(item => `${item.year}-${item.month}`),
        datasets: [
            {
                label: 'New Users per Month',
                data: data.monthly_new_users.map(item => item.count),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-container">
                <div className="stat-item">
                    <FaUsers className="stat-icon" />
                    <h2>Total Users: {data.total_users}</h2>
                </div>
                <div className="stat-item">
                    <FaUserPlus className="stat-icon" />
                    <h2>New Users in Last 30 Days: {data.new_users_last_30_days}</h2>
                </div>
                <div className="stat-item">
                    <FaUserCheck className="stat-icon" />
                    <h2>New Users in Last 7 Days: {data.new_users_last_7_days}</h2>
                </div>
            </div>
            <div className="chart-container">
                <h2>Monthly New Users</h2>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default Admin;
