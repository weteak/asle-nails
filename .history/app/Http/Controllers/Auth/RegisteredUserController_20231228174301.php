protected $registrationService;

public function __construct(RegistrationServiceInterface $registrationService)
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