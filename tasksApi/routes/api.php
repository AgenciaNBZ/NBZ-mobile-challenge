<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Login Route
 */
Route::post('login', 'API\UserController@login');

/**
 * Logout Route
 */
Route::post('register', 'API\UserController@register');

Route::group(['middleware' => 'auth:api'], function(){
  /**
   * Get all tasks from an user
   */
  Route::get('users/{user_id}/tasks', 'API\UserController@tasks');
  /**
   * Tasks Resources
   */
  Route::resource('tasks','TaskController');
});
