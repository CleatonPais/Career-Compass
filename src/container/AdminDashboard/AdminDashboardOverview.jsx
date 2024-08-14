import React, { useEffect, useState } from 'react';
import { getAdminDashboard } from "../../Api/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faBuildingColumns, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const AdminDashboardOverview = ({ primaryColor, primaryFontColor, secondaryFontColor }) => {
    const [counts, setCounts] = useState({ candidates: 0, jobs: 0, employers: 0 });
    const token = sessionStorage.getItem("user");

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await getAdminDashboard(token);
                setCounts({
                    candidates: response.candidatesCount,
                    jobs: response.jobsCount,
                    employers: response.employersCount,
                });
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, [token]);

    return (
        <div className="container my-5 p-md-5 text-center" style={{ background: 'white', borderRadius: '20px', border: '1px solid #ccc' }}>
            <h1 style={{ color: primaryColor }}>Overview</h1>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', minHeight:"200px" }}>
                        <h1 style={{ color: 'black' }}>{counts.candidates}</h1>
                        <FontAwesomeIcon className='mt-3' icon={faPerson} style={{ marginRight: "8px" , fontSize:"25px" }} />
                        <p className='mt-4' style={{ color: 'black' }}>Candidates</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', minHeight:"200px" }}>
                        <h1 style={{ color: 'black' }}>{counts.jobs}</h1>
                        <FontAwesomeIcon className='mt-3' icon={faBriefcase} style={{ marginRight: "8px" , fontSize:"25px" }} />
                        <p className='mt-4' style={{ color: 'black' }}>Jobs</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px', minHeight:"200px" }}>
                        <h1 style={{ color: 'black' }}>{counts.employers}</h1>
                        <FontAwesomeIcon className='mt-3' icon={faBuildingColumns} style={{ marginRight: "8px" , fontSize:"25px" }} />
                        <p className='mt-4' style={{ color: 'black' }}>Employers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOverview;
