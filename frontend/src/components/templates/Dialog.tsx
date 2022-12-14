import { FC, useReducer } from 'react';
import { Dialog as MUIDialog, DialogTitle, Divider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@apollo/client';
import { ReportCategory } from 'cutopia-types';

import styles from '../../styles/components/templates/Dialog.module.scss';
import ListItem from '../molecules/ListItem';
import { useView, useUser } from '../../store';
import { clearStore } from '../../helpers/store';
import { REPORT_ISSUES_MESSAGES, REPORT_MODES } from '../../constants/messages';
import Section from '../molecules/Section';
import TextField from '../atoms/TextField';
import LoadingButton from '../atoms/LoadingButton';
import { REPORT } from '../../constants/mutations';
import handleCompleted from '../../helpers/handleCompleted';
import ChipsRow from '../molecules/ChipsRow';
import { reverseMapping } from '../../helpers';
import DialogContentTemplate from './DialogContentTemplate';

const UserSettingsDialogContent: FC = observer(() => {
  const user = useUser();
  const view = useView();
  return (
    <>
      <DialogTitle id="form-dialog-title">Settings</DialogTitle>
      <ListItem
        noBorder
        className={styles.logOutRow}
        onClick={() => {
          user.logout();
          clearStore();
        }}
        title="Reset"
      />
      <Divider />
      <ListItem
        noBorder
        className={styles.logOutRow}
        onClick={() => {
          user.logout();
          view.setDialog(null);
          view.setSnackBar('Successfully logged out!');
        }}
        title="Log Out"
      />
    </>
  );
});

type ReportIssuesDialogContentProps = {
  reportCategory: ReportCategory;
  id?: string;
};

const ReportIssuesDialogContent: FC<ReportIssuesDialogContentProps> = observer(
  ({ reportCategory, id }) => {
    const currentModeMessages = REPORT_MODES[reportCategory];
    const currentModeMessagesLookup = reverseMapping(currentModeMessages);
    const view = useView();
    const user = useUser();
    const [issueData, dispatchIssueData] = useReducer(
      (state, action) => ({ ...state, ...action }),
      {
        types: [],
        description: '',
        identifier: id,
      }
    );

    const [report, { loading: reportLoading }] = useMutation(REPORT, {
      onCompleted: handleCompleted(() => view.setDialog(null), {
        view,
        message: 'Thank you for your feedback!',
      }),
      onError: view.handleError,
    });
    const submit = async e => {
      e.preventDefault();
      const { types, ...payload } = issueData;
      await report({
        variables: {
          cat: reportCategory,
          types: types.map(category => +currentModeMessagesLookup[category]),
          ...payload,
        },
      });
    };
    return (
      <DialogContentTemplate
        title="Report Issues"
        caption={`${REPORT_ISSUES_MESSAGES[reportCategory]}${
          id ? ` ${id}` : ''
        }`}
      >
        <form className="grid-auto-row" onSubmit={submit}>
          <Section title="Category">
            <ChipsRow
              className={styles.issueChipsRow}
              items={Object.values(currentModeMessages)}
              select={issueData.types || []}
              setSelect={(item, selected) => [
                dispatchIssueData({
                  types: selected
                    ? issueData.types.filter(
                        selectedItem => selectedItem !== item
                      )
                    : [...issueData.types, item],
                }),
              ]}
              multiple
            />
          </Section>
          <Section title="Description">
            <TextField
              className={styles.dialogDescription}
              placeholder={
                user.loggedIn
                  ? 'Please describe the issue...'
                  : 'Please describe the issue with your email...'
              }
              value={issueData.description}
              Tag="textarea"
              onChangeText={text => dispatchIssueData({ description: text })}
            />
          </Section>
          <div className="shareBtnRow center-row">
            <LoadingButton
              loading={reportLoading}
              className="share loading-btn"
              type="submit"
              disabled={!issueData.types?.length || !issueData.description}
            >
              Report
            </LoadingButton>
          </div>
        </form>
      </DialogContentTemplate>
    );
  }
);

const DialogContentMap = {
  userSettings: UserSettingsDialogContent,
  reportIssues: ReportIssuesDialogContent,
};

const Dialog: FC = () => {
  const view = useView();
  const ContentFC = DialogContentMap[view.dialog?.key];
  return (
    <MUIDialog
      className={styles.globalModalContainer}
      open={Boolean(view.dialog)}
      onClose={(e, reason) => {
        view.dialog?.props?.onClose(e, reason);
        view.setDialog(null);
      }}
    >
      {Boolean(ContentFC) && (
        <ContentFC {...(view.dialog?.contentProps as any)} />
      )}
    </MUIDialog>
  );
};

export default observer(Dialog);
