# Calcutta Node — Technical Setup Guide

## Quick Start

### Prerequisites

- **Node.js (LTS version)** - check with `node -v`
- **MongoDB Atlas free account** (M0 cluster)
- **GitHub** account for version control

### Step 1: Environment Variables

Create a `.env` file in the project root with your credentials (NEVER commit this file):

```bash
MONGO_URI=mongodb+srv://calcuttanode_db_user:#Danish786#@cluster0.xsjjasl.mongodb.net/?appName=Cluster0
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
RAZORPAY_KEY_ID=rzp_test_T9pFMASMqkYj4m
RAZORPAY_KEY_SECRET=W3zIfasDqXsdsfDwyzHR5J3f
NOWPAYMENTS_API_KEY=your-nowpayments-api-key
CLOUDINARY_CLOUD_NAME=vktz89tm
CLOUDINARY_API_KEY=572758142757747
CLOUDINARY_API_SECRET=Y8MixebPdGlfKsLwziZcHUAKtVo
EMAIL_USER=calcuttanode@gmail.com
EMAIL_PASS=#Allahplansthebest786#
```

### Step 2: Run the Project

```bash
# Install all dependencies (first time only)
cd server && npm install
cd ..
cd client && npm install

# Start both frontend and backend
# In two separate terminal windows:
cd server && npm run dev  # Backend on port 5000
cd client && npm run dev  # Frontend on port 5173
```

### Project URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### Additional Notes

- Deployed production versions available at calcuttanode.com when live
- MongoDB Atlas free tier (M0) provides 512MB storage
- Refer to MANUAL.md for editing guidelines and file structure
