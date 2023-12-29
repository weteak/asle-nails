<?php

namespace App\Http\Controllers;

use App\Models\Services;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class ServicesController extends Controller
{
    //
    public function show()
    {
        $services = Services::all();

        return Inertia::render('Service/Services', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_name' => 'required|string',
            'price' => 'required|integer',
            'duration' => 'required|integer',
            'points_value' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $imagePath = $request->file('image')->store('public/services');

        Services::create([
            'service_name' => $request->input('service_name'),
            'price' => $request->input('price'),
            'duration'=>$request->input('duration'),
            'points_value'=>$request->input('points_value'),
            'image' => $imagePath
        ]);
        return $this->redirectToServices();
    }

    public function update(Request $request, $id)
    {
       

        $request->validate([
            'service_name' => 'required|string',
            'price' => 'required|integer',
            'duration' => 'required|integer',
            'points_value' => 'required|integer',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $services = Services::findOrFail($id);

        $services->service_name = $request->input('service_name');
        $services->price = $request->input('price');
        $services->duration = $request->input('duration');
        $services->points_value = $request->input('points_value');



        if ($request->hasFile('image')) {
            if ($services->image !== null) {
                \Storage::delete($services->image);
            }

            $imagePath = $request->file('image')->store('public/services');
            $services->image = $imagePath;
        }

        $services->save();

        return $this->redirectToServices();
    }

    public function destroy($id)
    {
        $services = Services::findOrFail($id);

        if ($services->image !== null) {
            \Storage::delete($services->image);
        }

        $services->delete();

        return $this->redirectToServices();
    }


    private function redirectToServices()
    {
        return Redirect::route('services.show');

    }
}
