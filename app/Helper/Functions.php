<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

function convertBasePhp($str, $fromBase, $toBase) {
    $DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz-";

    $add = function($x, $y, $base) {
        $z = [];
        $n = max(count($x), count($y));
        $carry = 0;
        $i = 0;
        while ($i < $n || $carry) {
            $xi = $i < count($x) ? $x[$i] : 0;
            $yi = $i < count($y) ? $y[$i] : 0;
            $zi = $carry + $xi + $yi;
            array_push($z, $zi % $base);
            $carry = floor($zi / $base);
            $i++;
        }
        return $z;
    };

    $multiplyByNumber = function($num, $x, $base) use ($add) {
        if ($num < 0) return null;
        if ($num === 0) return [];

        $result = [];
        $power = $x;
        while (true) {
            if ($num & 1) $result = $add($result, $power, $base);
            $num = $num >> 1;
            if ($num === 0) break;
            $power = $add($power, $power, $base);
        }

        return $result;
    };

    $parseToDigitsArray = function($str, $base) use ($DIGITS) {
        $digits = str_split($str);
        $arr = [];
        for ($i = count($digits) - 1; $i >= 0; $i--) {
            $n = strpos($DIGITS, $digits[$i]);
            if ($n === false) return null;
            array_push($arr, $n);
        }
        return $arr;
    };

    $digits = $parseToDigitsArray($str, $fromBase);
    if ($digits === null) return null;

    $outArray = [];
    $power = [1];
    for ($i = 0; $i < count($digits); $i++) {
        if ($digits[$i]) $outArray = $add($outArray, $multiplyByNumber($digits[$i], $power, $toBase), $toBase);
        $power = $multiplyByNumber($fromBase, $power, $toBase);
    }

    $out = '';
    for ($i = count($outArray) - 1; $i >= 0; $i--)
        $out .= $DIGITS[$outArray[$i]];

    return $out;
}
function getAuthUserResource()
{
    // cho sidebar
    $user = \App\Models\User::where('id', Auth::id())->with('userDetail.userAvatarFile')->first();
    return new UserResource($user);
}
function formatFileNameInStorage($originalName){
    return time() . '_' .$originalName;
}
