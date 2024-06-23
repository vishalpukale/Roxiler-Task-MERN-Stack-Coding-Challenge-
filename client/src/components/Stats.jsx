import { Statistic, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Stats({ month, monthText }) {
    let [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    };

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        };
    }, [month]);

    return (
        <>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Stats for {monthText}</h2>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '48px',
                }}>
                <div style={{ minWidth: '720px', padding: '16px', borderRadius: '12px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <Totals stats={data?.statsData} loading={loading} />
                    {data && <BarChart data={data?.barChartData} />}
                </div>
                {data && <PieChart data={data?.pieChartData} />}
            </div>
        </>
    );
}

function Totals({ stats, loading }) {
    return (
        <div className='stats'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '900px',
                padding: '16px 0px',
                borderTop: '1px solid #dadada',
                borderBottom: '1px solid #dadada',
                marginBottom: '24px'
            }}>
            <Statistic
                valueStyle={{ fontSize: '32px', color: '#3f8600' }}
                title="Total Sale"
                value={stats?.totalSale}
                loading={loading}
                prefix="₹"
            />
            <Statistic
                valueStyle={{ fontSize: '32px', color: '#cf1322' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px', color: '#d48806' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    );
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range',
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count',
                },
                ticks: {
                    stepSize: 4,
                },
            },
        },
        aspectRatio: 1.6,
        plugins: {
            title: {
                display: true,
                text: 'No of products per price range',
            },
        },
    };

    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: [
                    'rgba(0, 105, 100, 0.7)',
                ],
            },
        ],
    };

    return (
        <Bar
            data={chartData}
            options={options}
            style={{ margin: '24px 0px', maxWidth: '900px', maxHeight: '500px', borderRadius: '12px', padding: '16px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        />
    );
}

function PieChart({ data }) {
    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'ID of Products',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
            },
        ],
    };

    return (
        <Doughnut
            data={chartData}
            style={{ margin: '24px 0px', maxHeight: '400px', maxWidth: '400px', borderRadius: '12px', padding: '16px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        />
    );
}
