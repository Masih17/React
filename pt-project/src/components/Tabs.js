import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomerList from './CustomerList';
import Calendar from './Calendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrainingList from './TrainingList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    toolbar: {
        minHeight: 100,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: '#363430'
    },
    title: {
        flexGrow: 1,
        paddingTop: 30,
    },
}));

const HomeTabs = (props) => {

    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Personal Trainer Schedule
                    </Typography>
                </Toolbar>
            </AppBar>

            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label='Trainings' />
                <Tab label='Customers' />
                <Tab label='Calendar' />
            </Tabs>
            {selectedTab === 0 && <TrainingList />}
            {selectedTab === 1 && <CustomerList />}
            {selectedTab === 2 && <Calendar />}

        </div >

    );
};

export default HomeTabs;


