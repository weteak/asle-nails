<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller for handling user registration.
 */
class RegisteredUserController extends Controller
{
    /**
     * The registration service instance.
     *
     * @var RegistrationService
     */
    protected $registrationService;

    /**
     * Create a new controller instance.
     *
     * @param RegistrationService $registrationService Dependency injection of RegistrationService.
     */
    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    /**
     * Show the registration form.
     *
     * @param Request $request The current request instance.
     * @return Response The Inertia response for the registration view.
     */
    public function create(Request $request): Response
    {
        $inviteCode = $this->registrationService->getInviteCode($request->query('invite'));
        return Inertia::render('Auth/Register', ['invite_code' => $inviteCode]);
    }

    /**
     * Handle a registration request for the application.
     *
     * @param Request $request The current request instance.
     * @return RedirectResponse A redirect response after successful registration.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $this->registrationService->registerUser($request->all());
        event(new Registered($user));
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }
}
