<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Task extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['name', 'description', 'type', 'user_id', 'due_date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
