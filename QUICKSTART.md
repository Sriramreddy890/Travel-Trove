# Quick Start Guide

Get the Travel Trove backend running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Copy the config file and update it:

```bash
# Copy the config file
cp config.env config.env

# Edit with your settings (optional - defaults work for local development)
```

## Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster
- Get your connection string
- Update `MONGODB_URI` in `config.env`

## Step 4: Setup Database

```bash
npm run setup
```

This creates:
- Admin user: `admin@traveltrove.com` / `Admin123!`
- Demo user: `demo@example.com` / `demo123`

## Step 5: Start the Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Step 6: Test the API

```bash
node test-api.js
```

## Step 7: Test the Frontend

1. Open `http://localhost:3000/login`
2. Login with demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`

## API Endpoints

- **Health Check**: `GET http://localhost:3000/api/health`
- **Register**: `POST http://localhost:3000/api/auth/register`
- **Login**: `POST http://localhost:3000/api/auth/login`
- **Get Profile**: `GET http://localhost:3000/api/auth/me`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `config.env`

### Port Already in Use
- Change the port in `config.env`
- Or kill the process using port 3000

### CORS Errors
- Update `CORS_ORIGIN` in `config.env` to match your frontend URL

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the user model and validation
- Add more features like email verification, password reset, etc.

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify MongoDB is running
3. Check your environment variables
4. Create an issue in the repository 