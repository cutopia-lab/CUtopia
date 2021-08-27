import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import './PlannerPage.scss';
import Draggable from 'react-draggable';
import { Fab } from '@material-ui/core';
import { CalendarToday, Search } from '@material-ui/icons';
import { useRouteMatch } from 'react-router-dom';
import { useTitle } from 'react-use';
import { SearchPanel } from '../components/forum';
import Page from '../components/atoms/Page';
import PlannerTimetable from '../components/planner/PlannerTimetable';
import PlannerCart from '../components/planner/PlannerCart';

import { MIN_DESKTOP_WIDTH } from '../constants/configs';

enum PlannerMode {
  INITIAL,
  SEARCH, // Mobile Only
  TIMETABLE, // Mobile Only
}

type PlannerMobileFabProps = {
  targetMode: PlannerMode;
  setMode: (mode: PlannerMode) => any;
};

const PLANNER_MOBILE_FAB_ITEM = {
  [PlannerMode.SEARCH]: {
    icon: <Search />,
  },
  [PlannerMode.TIMETABLE]: {
    icon: <CalendarToday />,
  },
};

const PlannerMobileFab = ({ targetMode, setMode }: PlannerMobileFabProps) => {
  const isDraggingRef = useRef(false);
  return (
    <Draggable
      bounds="parent"
      onDrag={() => {
        isDraggingRef.current = true;
      }}
      onStop={() => {
        // i.e. not dragging but onclick
        if (!isDraggingRef.current) {
          setMode(targetMode);
        }
        isDraggingRef.current = false;
      }}
    >
      <Fab
        disableRipple
        id="planner-draggable-fab-container"
        color="primary"
        aria-label="edit"
      >
        {PLANNER_MOBILE_FAB_ITEM[targetMode]?.icon}
      </Fab>
    </Draggable>
  );
};

const PlannerPage = () => {
  const isPlannerShare = useRouteMatch({
    path: '/planner/share/:shareId',
    strict: true,
    exact: true,
  });
  useTitle('Planner');
  const isMobile = window.matchMedia(
    `(max-width:${MIN_DESKTOP_WIDTH}px)`
  ).matches;

  console.log(`is Mobile ${isMobile}`);

  const [mode, setMode] = useState<PlannerMode>(
    isMobile ? PlannerMode.TIMETABLE : PlannerMode.INITIAL
  );

  const renderContent = () => {
    switch (mode) {
      case PlannerMode.INITIAL:
        return (
          <>
            <SearchPanel />
            <PlannerTimetable />
            <PlannerCart />
          </>
        );
      case PlannerMode.TIMETABLE:
        return <PlannerTimetable />;
    }
  };

  return (
    <Page className="planner-page" center padding>
      {renderContent()}
    </Page>
  );
};

export default observer(PlannerPage);
