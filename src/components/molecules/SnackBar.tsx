import { useContext, useEffect, useState } from 'react';
import { Button, Portal, Grow } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';

import './SnackBar.scss';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { NotificationContext } from '../../store';

const SnackBar = () => {
  const notification = useContext(NotificationContext);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    setButtonClicked(false);
  }, [notification.snackbar.id]);

  return (
    <Portal>
      <Grow in={Boolean(notification.snackbar.message)}>
        <div
          className={clsx(
            'snackbar-container',
            !notification.snackbar.isAlert && 'snackbar-toast'
          )}
        >
          {notification.snackbar.isAlert ? (
            <Alert severity="error">{notification.snackbar.message}</Alert>
          ) : (
            <>
              <span className="snack-text">
                {notification.snackbar.message}
              </span>
              {Boolean(notification.snackbar.label) && (
                <Button
                  color="secondary"
                  className="btn-container"
                  onClick={() => {
                    notification.snackbar.onClick();
                    setButtonClicked(true);
                  }}
                  disabled={buttonClicked}
                >
                  {buttonClicked ? (
                    <Check color="secondary" className="snackbar-check-icon" />
                  ) : (
                    notification.snackbar.label
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      </Grow>
    </Portal>
  );
};

export default observer(SnackBar);
