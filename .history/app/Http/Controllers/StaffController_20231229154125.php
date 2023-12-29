<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class StaffController extends Controller
{
    //

    public function show()
    {
        $staffMembers = User::where('role', 'admin')->get();

        return Inertia::render('Staff/Staff', [
            'staffMembers' => $staffMembers,
        ]);
    }
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone_number' => 'required|integer',
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', 
            'password' => 'required|string|min:8',
        ]);

        $imagePath = $request->file('profile_image')->store('public/profile_image');

        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'role' => 'admin',
            'phone_number' => $request->input('phone_number'),
            'profile_image' => $imagePath,
            'password' => Hash::make($request->input('password')) ,
            'notification_unread'=>0
        ]);

        return Redirect::route('staff.show');

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone_number' => 'required|integer',
            'profile_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
            'password' => 'nullable|string|min:8',
        ]);

        $staffMember = User::findOrFail($id);

        $staffMember->name = $request->input('name');
        $staffMember->email = $request->input('email');
        $staffMember->phone_number = $request->input('phone_number');

        if ($request->has('password')) {
            $staffMember->password = $request->input('password');
        }

        if ($request->hasFile('profile_image')) {
            if ($staffMember->profile_image !== null) {
                \Storage::delete($staffMember->profile_image);
            }

            $imagePath = $request->file('profile_image')->store('public/profile_image');
            $staffMember->profile_image = $imagePath;
        }

        $staffMember->save();

        return Redirect::route('staff.show');
    }

    public function destroy($id)
    {
        $staffMember = User::findOrFail($id);

        if ($staffMember->profile_image !== null) {
            \Storage::delete($staffMember->profile_image);
        }

        $staffMember->delete();

        return Redirect::route('staff.show');
    }
}
