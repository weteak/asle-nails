<?php

namespace App\Services;

use App\Models\Appointments;
use App\Models\AsleCard;
use App\Models\Services;
use App\Models\User;
use App\Services\NotificationService;
use Carbon\Carbon;

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
                'staff_id' => 31,
                'appointment_date' => $date,
                'appointment_time' => $time,
                'status' => 'ta',
                'points_used' => $use_points
            ]);
        }

        throw new \Exception('Appointment slot is not available');
    }


    public function getAvailableHours() {
        // Count the number of staff members
        $staffCount = User::whereHas('roles', function($query) {
            $query->where('name', 'admin'); // assuming role is stored in 'name' column
        })->count();

        // Define the working hours
        $startHour = 8; 
        $endHour = 20; 

        $availableHours = [];

        for ($hour = $startHour; $hour < $endHour; $hour++) {
            $appointmentsCount = Appointments::whereBetween('appointment_time', [
                Carbon::today()->setHour($hour),
                Carbon::today()->setHour($hour + 1)
            ])->count();

            if ($appointmentsCount < $staffCount) {
                $availableHours[] = $hour;
            }
        }

        return $availableHours;
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
