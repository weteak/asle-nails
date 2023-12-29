<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use App\Models\Services;
use App\Models\User;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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
        $staff = User::where('role', 'admin')->get();
        $userData = auth()->user()->load('asleCard');
        return Inertia::render('Appointments/Appointments',
            ['services' => $services,
                'userData' => $userData,
                'staff' => $staff
            ]);
    }

    public function singleAppointment($id){
     $
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
            $this->appointmentService->usePoints($appointment, $request->service_id);
            return redirect()->back()->with('success', 'Appointment created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function getAvailableHours(Request $request)
    {
        $staff_id = $request->staff_id;
        $user_id = $request->user_id;
        $appointment_date = new Carbon($request->appointment_date);
        $appointment_date->addDay();

        $staffCount = User::where('role', 'admin')->count();
        $startHour = 8;
        $endHour = 20;

        $availableHours = [];

        for ($hour = $startHour; $hour < $endHour; $hour++) {
            $appointmentsCount = Appointments::whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->count();

            $isStaffBusy = Appointments::where('staff_id', $staff_id)
                ->whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->exists();

            // Check if the user already has an appointment in this hour
            $isUserBusy = Appointments::where('user_id', $user_id)
                ->whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->exists();

            $availableSlots = $staffCount - $appointmentsCount;

            if 
            (!$isStaffBusy && !$isUserBusy) {
                $availableHours[$hour] = $availableSlots;
            }
        }

        return $availableHours;
    }



}
