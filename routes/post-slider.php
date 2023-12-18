<?php

use Morningtrain\WP\Facades\Rest;
use MA\App\Controllers\PostSliderController;


Rest::namespace('ma/v1')->group(function (){
    Rest::post('post-slider', PostSliderController::class)->name('post-slider')->expose();
})->public();
