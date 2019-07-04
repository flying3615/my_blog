import React from "react";
import { Link } from "gatsby-theme-material-ui";
import { Container, Box, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import Layout from "../container/Layout"


export default function App() {
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
