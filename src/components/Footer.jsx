
import React from 'react';
import { Link } from "gatsby"
import { Typography } from "@material-ui/core";
import Favorite from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
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
    <React.Fragment>
        <Divider variant="middle" />
        <MadeWithLove />
    </React.Fragment>
)

export default Footer

