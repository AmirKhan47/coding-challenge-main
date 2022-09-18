<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Route::get('/getSuggestions', [App\Http\Controllers\ConnectionController::class, 'getSuggestions'])->name('getSuggestions');
//Route::post('/sendRequest', [App\Http\Controllers\ConnectionController::class, 'sendRequest'])->name('sendRequest');
//
//Route::get('/getSentRequests', [App\Http\Controllers\ConnectionController::class, 'getSentRequests'])->name('getSentRequests');
//Route::post('/withdrawRequest', [App\Http\Controllers\ConnectionController::class, 'withdrawRequest'])->name('withdrawRequest');
//
//Route::get('/getReceivedRequests', [App\Http\Controllers\ConnectionController::class, 'getReceivedRequests'])->name('getReceivedRequests');
//Route::post('/acceptRequest', [App\Http\Controllers\ConnectionController::class, 'acceptRequest'])->name('acceptRequest');
//Route::post('/rejectRequest', [App\Http\Controllers\ConnectionController::class, 'rejectRequest'])->name('rejectRequest');
//
//Route::get('/getConnections', [App\Http\Controllers\ConnectionController::class, 'getConnections'])->name('getConnections');
//Route::post('/deleteConnection', [App\Http\Controllers\ConnectionController::class, 'deleteConnection'])->name('deleteConnection');
//
//Route::get('/getConnectionsInCommon/{userId}', [App\Http\Controllers\ConnectionController::class, 'getConnectionsInCommon'])->name('getConnectionsInCommon');
