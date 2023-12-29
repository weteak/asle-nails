<?php

namespace App\Services;

use App\Models\Appointments;
use App\Models\AsleCard;

class AppointmentService
{
    public function isAvailable($userId, $serviceId, $date, $time)
    {
        return !Appointments::where('user_id', $userId)
            ->where('service_id', $serviceId)
            ->where('appointment_date', $date)
            ->where('appointment_time', $time)
            ->exists();
    }

    public function createAppointment($userId, $serviceId, $date, $time, $use_points)
    {
        if ($this->isAvailable($userId, $serviceId, $date, $time)) {
            return Appointments::create([
                'user_id' => $userId,
                'service_id' => $serviceId,
                'appointment_date' => $date,
                'appointment_time' => $time,
                'points_used' => $use_points
            ]);
        }

        throw new \Exception('Appointment slot is not available');
    }

    public function usePoints($userId, $serviceId, $appointments)
    {
        $user = AsleCard::where('user_id', $userId)->first();

        $user->points
    }
}
