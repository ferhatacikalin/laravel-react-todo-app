<?php

namespace App\Listeners;

use App\Events\TaskCompleted;
use App\Models\CompletedTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogTaskCompleted implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TaskCompleted $event): void
    {
        $completedTask = new CompletedTask();
        $completedTask->title = $event->task->title;
        $completedTask->completion_time = $event->completionTime;
        $completedTask->user_id = $event->task->user_id;
        $completedTask->task_id = $event->task->id;
        $completedTask->save();
    }
}
