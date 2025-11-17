<?php

namespace App\Helpers;

use App\Events\LicenseNotifyEvent;
use App\Models\Bike;
use Exception;
use Illuminate\Support\Facades\Request;
use Twilio\Rest\Client;

class CheckLicense
{
    /**
     * Check bike licenses and return expired ones.
     */
    static function checkBikeLicenses(): array
    {
        $bikes = Bike::with('license')->get();
        $expired = [];
        $today = date('Y-m-d');

        foreach ($bikes as $key => $bike) {

            if ($bike->license) {
                if ($bike->license->license_end_date < $today) {
                    $expired[$bike->bike_no]['license'] = $bike->bike_no . ' Bike License has expired ' . $bike->license->license_end_date;
                }

                if ($bike->license->insurance_end_date < $today) {
                    $expired[$bike->bike_no]['insurance'] = $bike->bike_no . ' Bike Insurance has expired ' . $bike->license->insurance_end_date;
                }
            }
        }
        event(new LicenseNotifyEvent('hello world'));

        return array_values($expired);
    }

    static function whatsappNotification()
    {
        $twilioSid = env('TWILIO_SID');
        $twilioToken = env('TWILIO_AUTH_TOKEN');
        $twilioWhatsAppNumber = env('TWILIO_WHATSAPP_NUMBER');
        $recipientNumber = '';
        $message = 'This is a test message from Laravel using Twilio WhatsApp API.';

        try {
            $twilio = new Client($twilioSid, $twilioToken);
            $twilio->messages->create(
                $recipientNumber,
                [
                    "from" => "whatsapp:" . $twilioWhatsAppNumber,
                    "body" => $message,
                ]
            );
            return back()->with(['success' => 'WhatsApp message sent successfully!']);
        } catch (Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }
    }
}
