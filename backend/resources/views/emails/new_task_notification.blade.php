<!DOCTYPE html>
<html>
<head>
    <title>New Task Created</title>
</head>
<body>
<h1>New Task Created</h1>
<p>A new task has been created with the following details:</p>
<ul>
    <li><strong>Title:</strong> {{ $task->title }}</li>
    <li><strong>Description:</strong> {{ $task->description }}</li>
    <li><strong>Status:</strong> {{ $task->status }}</li>
    <li><strong>Due Date:</strong> {{ $task->due_date }}</li>
</ul>
</body>
</html>
