<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AsleCard;
use App\Models\Invitation;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Services\Auth\RegistrationService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    protected $registrationService;

    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    public function create(Request $request): Response
    {
        $inviteCode = $this->registrationService->getInviteCode($request->query('invite'));
        return Inertia::render('Auth/Register', ['invite_code' => $inviteCode]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $this->registrationService->registerUser($request->all());
        event(new Registered($user));
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }
}
