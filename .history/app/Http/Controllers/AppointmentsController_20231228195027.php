<?php

namespace App\Http\Controllers;

use App\Models\AsleCard;
use App\Models\Services;
use App\Models\User;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AppointmentsController extends Controller
{
    //
    protected $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }


    public function show()
    {
        $services = Services::all();
        $userData = auth()->user()->load('asleCard');
        return Inertia::render('Appointments/Appointments', ['services' => $services, 'userData' => $userData]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
        ]);

        $userId = auth()->user()->id;

        try {
            $appointment = $this->appointmentService->createAppointment($userId, $request->service_id, $request->appointment_date, $request->appointment_time, $request->use_points);
            if ($appointment && $appointment->points_used) {
              //  $this->appointmentService->usePoints($appointment->user_id, $request->service_id);
            }
            return redirect()->back()->with('success', 'Appointment created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

}
