<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\LoyaltyCardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\StaffController;
use App\Models\Appointments;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('admin/asle-cards/card-gain/{token}', [LoyaltyCardController::class, 'returnPointsView'])->name('cards.token');


Route::group(['prefix' => 'admin', 'middleware' => 'superAdmin'], function () {

    //staff
    Route::get('/staff', [StaffController::class, 'show'])->name('staff.show');
    Route::post('/staff-store', [StaffController::class, 'store'])->name('staff.store');
    Route::post('/staff-update/{userId}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('/staff-destroy/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

    //services
    Route::get('/services', [ServicesController::class, 'show'])->name('services.show');
    Route::post('/services-store', [ServicesController::class, 'store'])->name('services.store');
    Route::post('/services-update/{serviceId}', [ServicesController::class, 'update'])->name('services.update');
    Route::delete('/services-destroy/{id}', [ServicesController::class, 'destroy'])->name('services.destroy');

    //alse-card
    Route::get('/asle-cards', [LoyaltyCardController::class, 'show'])->name('cards.show');
    Route::post('/card-subscribe/{userId}', [LoyaltyCardController::class, 'subscribe'])->name('cards.subscribe');
    Route::post('/card-unsubscribe/{id}', [LoyaltyCardController::class, 'unSubscribe'])->name('cards.unsubscribe');
    Route::post('/card-gain/{token}/{points}', [LoyaltyCardController::class, 'gainPoints'])->name('cards.gains');



    Route::get('/dashboard', 'AdminController@dashboard')->name('admin.dashboard');
});


Route::get('/dashboard', function () {
    $appointments = Appointments::where('user_id', auth()->user()->id)
    ->with(['user', 'service'])
    ->orderBy('appointment_date', 'asc') // Add this line
    ->get();
return Inertia::render('Dashboard', ['appointments' => $appointments]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'show'])->name('notifications.show');
    Route::post('/read-all', [NotificationController::class, 'readAllNotifications'])->name('notifications.read');
    Route::post('/clear-all', [NotificationController::class, 'clearAllNotifications'])->name('notifications.clear');
    Route::get('/user-loyalty', [LoyaltyCardController::class, 'userSection'])->name('loyalty.show');
    Route::post('/transfer-credit', [LoyaltyCardController::class, 'transferCredit'])->name('loyalty.transfer');
    Route::post('/transfer-credit', [LoyaltyCardController::class, 'transferCredit'])->name('loyalty.transfer');

    Route::get('/appointments', [AppointmentsController::class, 'show'])->name('appointments.show');
    Route::post('/create-appointment', [AppointmentsController::class, 'store'])->name('appointments.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
