"use client";

import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";

type FormData = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    const createUser = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await createUser.json();
    if (res != null) {
      console.log(res);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: 400,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Đăng ký
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email là bắt buộc" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Mật khẩu là bắt buộc" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
}
