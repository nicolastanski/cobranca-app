import React, { useState, useRef } from 'react';
import * as Yup from 'yup';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CustomModal from '../../../components/CustomModal';
import CreateCustomer from '../CreateCustomer';

const drawerWidth = 240;

const rows: RowsProp = [
  { id: 1, col1: '22.123.325/0001-07', col2: 'Business 1', col3: '' },
  { id: 2, col1: '22.123.325/0001-07', col2: 'Awesome Company', col3: '' },
];

const columns: ColDef[] = [
  { field: 'col1', headerName: 'CPNJ/CPF', width: 200 },
  { field: 'col2', headerName: 'Razão Social', width: 200 },
  { field: 'col3', headerName: 'Ações' },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ListCustomers: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleModal = (): void => {
    setOpenModal(!openModal);
    console.log('Handle Modal: ', openModal);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function toggleModal(): void {
    setOpenModal(!openModal);
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="h1" variant="h5">
                Clientes
              </Typography>
              <Button variant="contained" color="primary" onClick={handleModal}>
                Novo Cliente
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              <DataGrid rows={rows} columns={columns} />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4} />

        <CustomModal
          isOpen={openModal}
          setIsOpen={toggleModal}
          title="Cadastro Clientes"
        >
          <CreateCustomer />
        </CustomModal>
      </Container>
    </>
  );
};

export default ListCustomers;
