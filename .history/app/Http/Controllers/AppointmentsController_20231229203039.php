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
    // Service class for handling appointment logic
    protected $appointmentService;

    // Dependency injection of AppointmentService
    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    // Display all available services and staff for appointments
    public function show()
    {
        // Fetch all services
        $services = Services::all();

        // Fetch only admin users as staff
        $staff = User::where('role', 'admin')->get();

        // Load additional user data
        $userData = auth()->user()->load('asleCard');

        // Render the appointments view with necessary data
        return Inertia::render('Appointments/Appointments', [
            'services' => $services,
            'userData' => $userData,
            'staff' => $staff
        ]);
    }

    // Show details for a single appointment
    public function singleAppointment($id)
    {
        // Fetch appointment with related data
        $appointment = Appointments::with(['user', 'service', 'staff'])->find($id);
        $userData = auth()->user()->load('asleCard');


        // Ensure the appointment exists and belongs to the current user
        if (!$appointment || $appointment->user_id != auth()->id()) {
            return redirect()->back()->with('error', 'Page not found');
        }

        // Render the single appointment view
        return Inertia::render('Appointments/SingleAppointment', ['appointment' => $appointment, 'user' => $userData]);
    }


    // Store a new appointment
    public function store(Request $request)
    {
        // Validate request data
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
        ]);

        dd($a)

        // Retrieve user ID from authentication
        $userId = auth()->user()->id;

        try {
            // Create a new appointment
            $appointment = $this->appointmentService->createAppointment(
                $userId, $request->service_id, $request->appointment_date,
                $request->appointment_time, $request->staff_id, $request->use_points
            );

            // Deduct points if applicable
            $this->appointmentService->usePoints($appointment, $request->service_id);

            return redirect()->back()->with('success', 'Appointment created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request)
    {


        $request->validate([
            'service_id' => 'required|exists:services,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
        ]);

        dd($request->all());
        try {
            $this->appointmentService->updateAppointment(
                $request->appointment_id, $request->service_id, $request->appointment_date,
                $request->appointment_time, $request->use_points
            );
        
            return redirect()->back()->with('success', 'Appointment updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    // Get available hours for scheduling an appointment
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
            // Count appointments in the given hour
            $appointmentsCount = Appointments::whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->count();

            // Check if the staff is busy in the given hour
            $isStaffBusy = Appointments::where('staff_id', $staff_id)
                ->whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->exists();

            // Check if the user has an appointment in the given hour
            $isUserBusy = Appointments::where('user_id', $user_id)
                ->whereDate('appointment_date', $appointment_date)
                ->whereTime('appointment_time', '>=', $appointment_date->copy()->setHour($hour))
                ->whereTime('appointment_time', '<', $appointment_date->copy()->setHour($hour + 1))
                ->exists();

            // Calculate available slots
            $availableSlots = $staffCount - $appointmentsCount;

            // Add to available hours if the slot is free
            if (!$isStaffBusy && !$isUserBusy) {
                $availableHours[$hour] = $availableSlots;
            }
        }

        // Return available hours
        return $availableHours;
    }
}
