import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  cardAvatar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper
  }
}));
