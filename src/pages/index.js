import React from "react";
import { Link } from "gatsby-theme-material-ui";
import {Box, Typography } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import Layout from "../container/Layout"

export default function App() {

  return (
    <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home Page
          </Typography>
        </Box>
    </Layout>
  );
}
