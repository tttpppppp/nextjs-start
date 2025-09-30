"use client";

import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">T</span>
            </div>
            <Typography variant="h5" className="font-bold text-gray-800">
              Welcome Back
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              Please sign in to continue
            </Typography>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="mb-3">
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition bg-indigo-600 hover:bg-indigo-700"
            >
              Login
            </Button>
          </form>

          {/* Or */}
          <Divider className="my-6">OR</Divider>

          {/* Social login */}
          <div className="flex flex-col gap-3">
            <Button
              variant="outlined"
              fullWidth
              className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
            >
              Continue with GitHub
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
