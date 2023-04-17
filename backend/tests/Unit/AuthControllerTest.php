<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function testLogin(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt($password = $this->faker->password),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'data' => [
                'user' => [
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'created_at',
                    'updated_at',
                ],
                'token',
                'token_type',
            ],
        ]);
    }

    public function testLoginWithInvalidCredentials(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'non-existing-email@example.com',
            'password' => 'invalid-password',
        ]);

        $response->assertStatus(401);
      
    }

    public function testRegister(): void
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password(8),
        ];

        $response = $this->postJson('/api/auth/register', $userData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
                'token',
                'token_type',
            ],
        ]);
    }

    public function testRegisterWithInvalidData(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'data',
            'success'
        ]);
    }


}