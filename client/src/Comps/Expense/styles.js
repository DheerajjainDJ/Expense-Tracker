import {makeStyles} from "@mui/styles"

export const useStyles = makeStyles((theme) => ({
    desktop:{
        [theme.breakpoints.down("lg")]:{
            display:"none"
        }
    },
    mobile:{
        [theme.breakpoints.up("lg")]:{
            display:"none"
        }
    }
}))