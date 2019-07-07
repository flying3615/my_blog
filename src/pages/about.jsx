import React from "react";
import { Container, Box, Typography } from "@material-ui/core";
import Layout from "../container/Layout"

export default function About() {
  return (
    <Layout>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Page
        </Typography>
      </Box>
    </Layout>
  );
}
