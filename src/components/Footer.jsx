
import React from 'react';
import { Link } from "gatsby"
import { Typography } from "@material-ui/core";
import styled from "styled-components"
import Favorite from '@material-ui/icons/Favorite';

const StyledHr = styled.hr`
    border:none;
    height: 1px;
    margin-bottom:5px;
    background-color:rgba(0,0,0,0.15);
`

const MadeWithLove = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`Made with `}<Favorite style={{ color: 'red' }} />{` by the `}
            <Link color="inherit" to="https://material-ui.com/">
                {`Yufei`}
            </Link>
        </Typography>
    );
}

const Footer  = () => (
    <footer>
        <StyledHr />
        <MadeWithLove />
    </footer>
)

export default Footer

