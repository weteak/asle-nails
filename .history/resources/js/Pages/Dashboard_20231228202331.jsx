import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { returnImage, imagePathFormat } from '@/Utils/helpers';

export default function Dashboard({ auth, appointments }) {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="dashboard-container">
                <div className="appointments-container">
                    <div className="appointments-list">
                        {appointments.length > 0 &&
                            appointments.map((val, key) => (
                                <div key={`val-${key}`} className="appointment-item">
                                    <img className="service-image" src={returnImage(imagePathFormat(val.service.image))} alt={val.service.service_name} />
                                    <div className="service-details">
                                        <span className="service-name">{val.service.service_name}</span>
                                        <span className="service-duration">{val.service.duration} min</span>
                                    </div>
                                    <div className="appointment-info">
                                        <span className="appointment-date">{formatDate(val.appointment_date)}</span>
                                        <span className="appointment-time">{val.appointment_time}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
}