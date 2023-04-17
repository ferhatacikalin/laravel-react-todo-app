<?php

namespace App\Http\Controllers;

use App\Jobs\SendTaskCreatedNotification;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use App\Events\TaskCompleted;

class TaskController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Check if tasks are in cache
        $tasks = Cache::get('tasks:' . $user->id);
        if (!$tasks) {
            $tasks = $user->tasks;

            // Cache tasks for 1 hour
            Cache::put('tasks:' . $user->id, $tasks, 60 * 60);
        }

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $task = new Task($request->all());
        $task->user_id = $user->id;
        $task->save();

        // Invalidate cached tasks
        Cache::forget('tasks:' . $user->id);

        dispatch(new SendTaskCreatedNotification($task));

        return response()->json($task, 201);
    }

    public function show($id)
    {
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $task_completed_condition = ($request->json('status') == 'completed') && $task->status != 'completed';
        $task->update($request->all());
        $task->save();
        $completionTime = null;

        if($task_completed_condition) {
            $completionTime = $task->updated_at->diffInSeconds($task->created_at);
        }
        TaskCompleted::dispatchIf($task_completed_condition, $task, $completionTime);
        // Invalidate cached tasks
        Cache::forget('tasks:' . $user->id);

        return response()->json($task);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $task->delete();

        // Invalidate cached tasks
        Cache::forget('tasks:' . $user->id);

        return response()->json(['message' => 'Task deleted']);
    }
}
