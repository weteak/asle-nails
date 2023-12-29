<?php

namespace App\Contracts;

interface RegistrationServiceInterface
{
    public function getInviteCode($inviteQuery);
    public function registerUser(array $userData);
}
