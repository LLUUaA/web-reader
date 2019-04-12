import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountBox from '@material-ui/icons/AccountBox'


const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class SwipeableTemporaryDrawer extends React.Component {

  constructor(props, state) {
    super(props);
  }

  toggleDrawer = (side, open) => () => {
    this.props.onClick(open);
  };

  handleClick(openType) {
    const key = `openCollapse${openType}`;
    this.setState({
      [key]: !this.state[key]
    })
  }

  render() {
    const { classes, openStatus = false, femaleMenu = [], maleMenu = [] } = this.props;
    console.log('props', this.props)
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary="广场" />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary="登陆" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary="书架" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon> <AccountBox /></ListItemIcon>
            <ListItemText primary="个人中心" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <SwipeableDrawer
          open={!!openStatus}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
          // onClick={this.toggleDrawer('left', false)}
          // onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }

}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
