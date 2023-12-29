<?php

namespace App\Services;

use App\Models\Appointments;
use App\Models\AsleCard;
use App\Models\Services;
use App\Services\NotificationService;

class AppointmentService
{

    /**
     * The notification service instance.
     *
     * @var NotificationService
     */
    protected $notificationService;

    /**
     * Create a new service instance.
     *
     * @param NotificationService $notificationService Dependency injection of NotificationService.
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

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

    public function usePoints($appointment, $serviceId)
    {
        $service = Services::find($serviceId);
        $points = $service->points_value;

        
        $this->setNotifications($appointment, $service->service_name, $points);

        if ($appointment && $appointment->points_used) {
            $user = AsleCard::where('user_id', $appointment->user_id)->first();
            $user->points = $user->points - $points;
            $user->save();
            $this->notificationService->trigger('appointmentsUsedPoints');

        }

        $this->notificationService->trigger('appointments');

    }


    private function setNotifications($appointment, $serviceName, $points)
    {
        $this->notificationService->setUserId($appointment->user_id);
        $this->notificationService->setService($serviceName);
        $this->notificationService->setPoints($points);
        $this->notificationService->setDate($appointment->appointment_date);
        $this->notificationService->setTime($appointment->appointment_time);
    }
}
