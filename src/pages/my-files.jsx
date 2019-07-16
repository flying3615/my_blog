import React from 'react'
import { graphql } from 'gatsby'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Layout from '../container/Layout'

const MyFiles = ({ data }) => {
  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>relativePath</TableCell>
            <TableCell>prettySize</TableCell>
            <TableCell>extension</TableCell>
            <TableCell>birthTime</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {

            data.allFile.edges.map(({ node }, index) => (
              <TableRow key={index}>
                <TableCell>{node.relativePath}</TableCell>
                <TableCell>{node.prettySize}</TableCell>
                <TableCell>{node.extension}</TableCell>
                <TableCell>{node.birthTime}</TableCell>
              </TableRow>

            ))
          }
        </TableBody>
      </Table>
    </Layout>
  )
}

export default MyFiles

export const query = graphql`
    query MyFiles {
        allFile {
            edges {
                node {
                   relativePath
                   prettySize
                   extension
                   birthTime(fromNow: true)
                }
            }
        }
    }

`
