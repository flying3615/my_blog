import React from "react";
import {Box, Typography } from "@material-ui/core";
import Layout from "../container/Layout"
import BlogSearcher from '../components/BlogSearcher'

export default function Index() {

  return (
      <Layout>
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Home Page
            </Typography>
            <BlogSearcher />
          </Box>
      </Layout>
  );
}
