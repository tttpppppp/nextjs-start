"use client";
import SideBar from "@/components/layout/SideBar";
import { Grid } from "@mui/material";
import React from "react";

const DashBoardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {" "}
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "400px 1fr" },
          minHeight: "100vh",
          gap: "2",
        }}
      >
        <Grid>
          <SideBar />
        </Grid>
        <Grid>{children}</Grid>
      </Grid>
    </div>
  );
};

export default DashBoardLayout;
