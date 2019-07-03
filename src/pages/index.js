import React from "react";
import { Link } from "gatsby-theme-material-ui";
import {Box, Typography } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';


import Layout from "../components/layout"

export default function App() {

  return (
    <Layout>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            gatsby-theme-material-ui example
          </Typography>
          <Link to="/about" color="secondary">
          <InfoIcon />
          </Link>
        </Box>
    </Layout>
  );
}
