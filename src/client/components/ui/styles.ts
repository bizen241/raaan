import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  largeButton: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: theme.typography.h6.fontSize
  }
}));
