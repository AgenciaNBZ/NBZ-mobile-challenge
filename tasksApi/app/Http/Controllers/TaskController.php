<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Illuminate\Support\Facades\Auth;
Use Validator;

class TaskController extends Controller
{
    public $successStatus = 200;

    public function show($id)
    {
        $task = Task::find($id);
        if(!$task) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }
        return response()->json($task);
    }

    public function store(Request $request)
    {

      $user = Auth::user();

      $validator = Validator::make($request->all(), [
          'name' => 'required',
          'description' => 'required',
          'type' => 'required',
          'due_date' => 'required',
      ]);

      if ($validator->fails()) {
          return response()->json(['error'=>$validator->errors()], 401);
      }

      $user = Task::create($request->all());

      return response()->json(['success'=>$request->all()], $this->successStatus);
    }

    public function update(Request $request, $id)
    {
      $user = Auth::user();
      $task = Task::find($id);

      $validator = Validator::make($request->all(), [
          'name' => 'required',
          'description' => 'required',
          'type' => 'required',
          'due_date' => 'required',
      ]);

      if ($validator->fails()) {
          return response()->json(['error'=>$validator->errors()], 401);
      }

      if ($task->update($request->all()))
          return response()->json(['success'=>$request->all()], $this->successStatus);
    }

    public function destroy(Request $request, $id)
    {
      $user = Auth::user();
      $task = Task::find($id);
      if ($task->delete())
          return response()->json(['success'=>$task], $this->successStatus);
    }
}
