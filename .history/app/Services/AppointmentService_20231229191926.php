<?php

namespace App\Services;

use App\Models\Appointments;
use App\Models\AsleCard;
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

    public function createAppointment($userId, $serviceId, $date, $time,$staffId, $use_points)
    {
        if ($this->isAvailable($userId, $serviceId, $date, $time)) {
            return Appointments::create([
                'user_id' => $userId,
                'service_id' => $serviceId,
                'staff_id' => $staffId,
                'appointment_date' => $date,
                'appointment_time' => $time,
                'status' => 'ta',
                'points_used' => $use_points
            ]);
        }

        throw new \Exception('Appointment slot is not available');
    }

    public function updateAppointment($appointmentId, $serviceId, $date, $time, $staffId, $use_points)
{
    $appointment = Appointments::find($appointmentId);

    if (!$appointment) {
        throw new \Exception('Appointment not found');
    }

    if (!$this->isAvailable($appointment->user_id, $serviceId, $date, $time)) {
        throw new \Exception('Appointment slot is not available');
    }

    $appointment->service_id = $serviceId;
    $appointment->appointment_date = $date;
    $appointment->appointment_time = $time;
    $appointment->staff_id = $staffId;
    $appointment->points_used = $use_points;

    $appointment->save();

    return $appointment;
}



    


    public function usePoints($appointment, $serviceId)
    {
        if (!$appointment) {
            return;
        }

        $service = $appointment->service;
        if (!$service) {
            return;
        }

        $points = $service->points_value;
        $this->setNotifications($appointment, $service->service_name, $points);

        if ($appointment->points_used) {
            $this->deductPoints($appointment, $points);
        }

        $this->notificationService->trigger('appointments');
    }

    private function deductPoints($appointment, $points)
    {
        $user = AsleCard::firstWhere('user_id', $appointment->user_id);
        if (!$user) {
            return;
        }

        $user->points -= $points;
        $user->save();
        $this->notificationService->trigger('appointmentsUsedPoints');
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
