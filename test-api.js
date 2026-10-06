const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
    console.log('Testing Travel Trove API...\n');

    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData.message);

        // Test registration
        console.log('\n2. Testing user registration...');
        const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Test123!'
            })
        });
        const registerData = await registerResponse.json();
        
        if (registerResponse.ok) {
            console.log('✅ Registration successful');
            const token = registerData.data.token;
            
            // Test login
            console.log('\n3. Testing user login...');
            const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'Test123!'
                })
            });
            const loginData = await loginResponse.json();
            
            if (loginResponse.ok) {
                console.log('✅ Login successful');
                
                // Test get current user
                console.log('\n4. Testing get current user...');
                const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const meData = await meResponse.json();
                
                if (meResponse.ok) {
                    console.log('✅ Get current user successful');
                    console.log('   User:', meData.data.user.name);
                } else {
                    console.log('❌ Get current user failed:', meData.message);
                }
                
                // Test logout
                console.log('\n5. Testing logout...');
                const logoutResponse = await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const logoutData = await logoutResponse.json();
                
                if (logoutResponse.ok) {
                    console.log('✅ Logout successful');
                } else {
                    console.log('❌ Logout failed:', logoutData.message);
                }
                
            } else {
                console.log('❌ Login failed:', loginData.message);
            }
            
        } else {
            console.log('❌ Registration failed:', registerData.message);
        }

        // Test invalid login
        console.log('\n6. Testing invalid login...');
        const invalidLoginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'invalid@example.com',
                password: 'wrongpassword'
            })
        });
        const invalidLoginData = await invalidLoginResponse.json();
        
        if (!invalidLoginResponse.ok) {
            console.log('✅ Invalid login correctly rejected');
        } else {
            console.log('❌ Invalid login should have been rejected');
        }

        console.log('\n🎉 API testing completed!');
        console.log('\nTo test the frontend:');
        console.log('1. Start the server: npm run dev');
        console.log('2. Open: http://localhost:3000/login');
        console.log('3. Use demo credentials: demo@example.com / demo123');

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        console.log('\nMake sure the server is running: npm run dev');
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testAPI();
}

module.exports = testAPI; 