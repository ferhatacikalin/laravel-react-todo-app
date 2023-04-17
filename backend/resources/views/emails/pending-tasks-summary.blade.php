<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pending Task Summary</title>
</head>
<body>
<h1>Pending Task Summary</h1>
<p>Hello {{ $user->name }},</p>
<p>Here's a summary of your pending tasks:</p>
<ul>
    @foreach($tasks as $task)
        <li>{{ $task->title }} - Due {{ $task->due_date }}</li>
    @endforeach
</ul>
<p>Thank you for using our application!</p>
</body>
</html>
