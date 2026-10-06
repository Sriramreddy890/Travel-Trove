const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

async function setupDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');

        // Check if admin user exists
        const adminExists = await User.findOne({ email: 'admin@traveltrove.com' });
        
        if (!adminExists) {
            console.log('Creating admin user...');
            const adminUser = new User({
                name: 'Admin User',
                email: 'admin@traveltrove.com',
                password: 'Admin123!',
                role: 'admin',
                isActive: true
            });
            
            await adminUser.save();
            console.log('Admin user created successfully');
            console.log('Email: admin@traveltrove.com');
            console.log('Password: Admin123!');
        } else {
            console.log('Admin user already exists');
        }

        // Check if demo user exists
        const demoExists = await User.findOne({ email: 'demo@example.com' });
        
        if (!demoExists) {
            console.log('Creating demo user...');
            const demoUser = new User({
                name: 'Demo User',
                email: 'demo@example.com',
                password: 'demo123',
                role: 'user',
                isActive: true
            });
            
            await demoUser.save();
            console.log('Demo user created successfully');
            console.log('Email: demo@example.com');
            console.log('Password: demo123');
        } else {
            console.log('Demo user already exists');
        }

        console.log('\nSetup completed successfully!');
        console.log('\nYou can now:');
        console.log('1. Start the server: npm run dev');
        console.log('2. Access the API at: http://localhost:3000');
        console.log('3. Test the login page at: http://localhost:3000/login');
        
    } catch (error) {
        console.error('Setup failed:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed');
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase; 